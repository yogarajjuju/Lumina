// API Service — Real fetch calls with Firebase Auth, falling back to mock data
var API = (function() {
  var API_BASE = 'http://localhost:8090/api';
  var currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  var authToken = localStorage.getItem('authToken');
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  var wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

  function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
  function saveWish() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }

  async function getHeaders() {
    var headers = { 'Content-Type': 'application/json' };
    if (window.firebaseAuthReady && window.firebase && firebase.auth().currentUser) {
       var token = await firebase.auth().currentUser.getIdToken();
       headers['Authorization'] = 'Bearer ' + token;
    } else if (authToken) {
       headers['Authorization'] = 'Bearer ' + authToken;
    }
    return headers;
  }

  async function request(endpoint, options = {}) {
    options.headers = await getHeaders();
    try {
      var res = await fetch(API_BASE + endpoint, options);
      if (!res.ok) throw new Error(await res.text() || res.statusText);
      return res.status !== 204 ? await res.json() : null;
    } catch (err) {
      console.warn("API Request failed (" + endpoint + "), falling back to mock data.", err.message);
      return mockFallback(endpoint, options);
    }
  }

  function mockFallback(endpoint, options) {
      if (endpoint.includes('/categories')) return CATEGORIES;
      if (endpoint.includes('/deals')) return PRODUCTS.filter(function(p){return p.discount>=25;}).sort(function(a,b){return b.discount-a.discount;}).slice(0,12);
      if (endpoint.includes('/trending')) return PRODUCTS.slice().sort(function(a,b){return b.rating-a.rating;}).slice(0,12);
      if (endpoint.includes('/featured')) return PRODUCTS.filter(function(p){return p.featured;});
      if (endpoint.match(/\/products\/\d+$/)) {
          var id = endpoint.split('/').pop();
          return PRODUCTS.find(function(p){return p.id===Number(id);});
      }
      if (endpoint.includes('/products')) return PRODUCTS;
      return [];
  }

  return {
    login: async function(email, pw) {
      if (window.firebaseAuthReady) {
         var cred = await firebase.auth().signInWithEmailAndPassword(email, pw);
         currentUser = { id: cred.user.uid, name: cred.user.displayName || email, email: email };
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
         return currentUser;
      }
      if (email === 'demo@shop.com' && pw === 'password123') {
        currentUser = {id:1,name:'Demo User',email:email}; authToken = 'mock';
        localStorage.setItem('authToken',authToken); localStorage.setItem('currentUser',JSON.stringify(currentUser));
        return currentUser;
      }
      throw new Error('Invalid email or password');
    },
    loginWithOAuth: async function(providerName) {
      if (!window.firebaseAuthReady) throw new Error('Firebase not configured');
      var provider;
      if (providerName === 'google') provider = new firebase.auth.GoogleAuthProvider();
      else if (providerName === 'microsoft') provider = new firebase.auth.OAuthProvider('microsoft.com');
      else throw new Error('Unknown provider');
      
      var cred = await firebase.auth().signInWithPopup(provider);
      currentUser = { id: cred.user.uid, name: cred.user.displayName || cred.user.email, email: cred.user.email };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return currentUser;
    },
    register: async function(name, email, pw) {
      if (window.firebaseAuthReady) {
         var cred = await firebase.auth().createUserWithEmailAndPassword(email, pw);
         await cred.user.updateProfile({ displayName: name });
         currentUser = { id: cred.user.uid, name: name, email: email };
         localStorage.setItem('currentUser', JSON.stringify(currentUser));
         return currentUser;
      }
      currentUser = {id:Date.now(),name:name,email:email}; authToken = 'mock';
      localStorage.setItem('authToken',authToken); localStorage.setItem('currentUser',JSON.stringify(currentUser));
      return currentUser;
    },
    logout: async function() {
      if (window.firebaseAuthReady) await firebase.auth().signOut();
      currentUser=null; authToken=null;
      localStorage.removeItem('authToken'); localStorage.removeItem('currentUser');
    },
    getUser: function() { return currentUser; },
    isLoggedIn: function() { return !!currentUser; },

    // Sync methods for UI rendering
    getCart: function() { return cart; },
    getCartCount: function() { return cart.reduce(function(s,c){return s+c.quantity;},0); },
    getCartTotal: function() { return cart.reduce(function(s,c){return s+c.product.price*c.quantity;},0); },
    isInWishlist: function(pid) { return wishlist.includes(pid); },

    // Async Fetch methods
    getCategories: async function() { return await request('/categories'); },
    getProducts: async function() { return await request('/products'); },
    getProductById: async function(id) { return await request('/products/' + id); },
    searchProducts: async function(q) {
      var l=q.toLowerCase(), all=await request('/products');
      return all.filter(function(p){return p.name.toLowerCase().includes(l)||p.description.toLowerCase().includes(l);});
    },
    getDeals: async function() { return await request('/products/deals'); },
    getTrending: async function() { return await request('/products/trending'); },
    getFeatured: async function() { return await request('/products/featured'); },
    getProductsByCategory: async function(catId) {
      var all=await request('/products');
      return all.filter(function(p){return p.category && p.category.id===Number(catId);});
    },
    getProductReviews: async function(pid) {
      try { return await request('/products/' + pid + '/reviews'); }
      catch { return typeof REVIEWS!=='undefined'?REVIEWS.filter(function(r){return r.product.id===Number(pid);}):[]; }
    },

    // Cart actions (Optimistic)
    addToCart: async function(pid,qty) {
      qty=qty||1; var ex=cart.find(function(c){return c.product.id===pid;});
      if(ex){ex.quantity+=qty;} else { var p=await this.getProductById(pid); if(p) cart.push({id:Date.now(),product:p,quantity:qty}); }
      saveCart();
    },
    updateCartItem: function(cid,qty) {
      var i=cart.findIndex(function(c){return c.id===cid;});
      if(i!==-1){if(qty<=0)cart.splice(i,1);else cart[i].quantity=qty;} saveCart();
    },
    removeFromCart: function(cid) { cart=cart.filter(function(c){return c.id!==cid;}); saveCart(); },

    placeOrder: async function(data) {
      var o = {id:Date.now(),items:cart.slice(),totalAmount:this.getCartTotal(),status:'PLACED',orderDate:new Date().toISOString()};
      Object.assign(o,data);
      if(currentUser && window.firebaseAuthReady) {
         try{ await request('/orders', {method:'POST', body:JSON.stringify(o)}); }catch(e){}
      }
      cart=[]; saveCart();
      var orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.unshift(o); localStorage.setItem('orders', JSON.stringify(orders));
      return o;
    },
    getOrders: async function() {
      if(currentUser && window.firebaseAuthReady) {
         try{ return await request('/orders'); }catch(e){}
      }
      return JSON.parse(localStorage.getItem('orders') || '[]');
    },
    addToWishlist: function(pid) { if(!wishlist.includes(pid)){wishlist.push(pid);saveWish();} },
    removeFromWishlist: function(pid) { wishlist=wishlist.filter(function(id){return id!==pid;}); saveWish(); },
    getWishlist: async function() {
      var p = [];
      for(var i=0;i<wishlist.length;i++){ p.push(await this.getProductById(wishlist[i])); }
      return p.map(function(prod){return {product:prod};});
    }
  };
})();
