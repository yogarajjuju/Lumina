// API Service — uses mock data in localStorage
var API = (function() {
  var authToken = localStorage.getItem('authToken');
  var currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  var wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  var orders = JSON.parse(localStorage.getItem('orders') || '[]');
  function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
  function saveWish() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }
  function saveOrders() { localStorage.setItem('orders', JSON.stringify(orders)); }

  return {
    login: function(email, pw) {
      if (email === 'demo@shop.com' && pw === 'password123') {
        currentUser = {id:1,name:'Demo User',email:email}; authToken = 'mock';
        localStorage.setItem('authToken',authToken); localStorage.setItem('currentUser',JSON.stringify(currentUser));
        return currentUser;
      }
      throw new Error('Invalid email or password');
    },
    register: function(name, email, pw) {
      currentUser = {id:Date.now(),name:name,email:email}; authToken = 'mock';
      localStorage.setItem('authToken',authToken); localStorage.setItem('currentUser',JSON.stringify(currentUser));
      return currentUser;
    },
    logout: function() { currentUser=null; authToken=null; localStorage.removeItem('authToken'); localStorage.removeItem('currentUser'); },
    getUser: function() { return currentUser; },
    isLoggedIn: function() { return !!authToken; },
    getCategories: function() { return CATEGORIES; },
    getProducts: function(sortBy,dir) {
      var s = PRODUCTS.slice();
      if (sortBy==='price') s.sort(function(a,b){return dir==='desc'?b.price-a.price:a.price-b.price;});
      else if (sortBy==='rating') s.sort(function(a,b){return b.rating-a.rating;});
      return s;
    },
    getProductById: function(id) { return PRODUCTS.find(function(p){return p.id===Number(id);}); },
    searchProducts: function(q) {
      var l=q.toLowerCase();
      return PRODUCTS.filter(function(p){return p.name.toLowerCase().includes(l)||p.description.toLowerCase().includes(l)||p.brand.toLowerCase().includes(l);});
    },
    getDeals: function() { return PRODUCTS.filter(function(p){return p.discount>=25;}).sort(function(a,b){return b.discount-a.discount;}).slice(0,12); },
    getTrending: function() { return PRODUCTS.slice().sort(function(a,b){return b.rating-a.rating||b.reviewCount-a.reviewCount;}).slice(0,12); },
    getDealOfDay: function() { return PRODUCTS.filter(function(p){return p.dealOfDay;}); },
    getFeatured: function() { return PRODUCTS.filter(function(p){return p.featured;}); },
    getProductsByCategory: function(catId,sortBy,dir) {
      var r = PRODUCTS.filter(function(p){return p.category.id===Number(catId);});
      if (sortBy==='price') r.sort(function(a,b){return dir==='desc'?b.price-a.price:a.price-b.price;});
      else if (sortBy==='rating') r.sort(function(a,b){return b.rating-a.rating;});
      return r;
    },
    getProductReviews: function(pid) { return REVIEWS.filter(function(r){return r.product.id===Number(pid);}); },
    getCart: function() { return cart; },
    getCartCount: function() { return cart.reduce(function(s,c){return s+c.quantity;},0); },
    getCartTotal: function() { return cart.reduce(function(s,c){return s+c.product.price*c.quantity;},0); },
    addToCart: function(pid,qty) {
      qty=qty||1; var ex=cart.find(function(c){return c.product.id===pid;});
      if(ex){ex.quantity+=qty;} else { var p=PRODUCTS.find(function(p){return p.id===pid;}); if(p) cart.push({id:Date.now(),product:p,quantity:qty}); }
      saveCart();
    },
    updateCartItem: function(cid,qty) {
      var i=cart.findIndex(function(c){return c.id===cid;});
      if(i!==-1){if(qty<=0)cart.splice(i,1);else cart[i].quantity=qty;} saveCart();
    },
    removeFromCart: function(cid) { cart=cart.filter(function(c){return c.id!==cid;}); saveCart(); },
    placeOrder: function(data) {
      var o = {id:Date.now(),items:cart.slice(),totalAmount:this.getCartTotal(),status:'PLACED',orderDate:new Date().toISOString(),deliveryDate:new Date(Date.now()+5*864e5).toISOString()};
      Object.assign(o,data); orders.unshift(o); cart=[]; saveCart(); saveOrders(); return o;
    },
    getOrders: function() { return orders; },
    isInWishlist: function(pid) { return wishlist.includes(pid); },
    addToWishlist: function(pid) { if(!wishlist.includes(pid)){wishlist.push(pid);saveWish();} },
    removeFromWishlist: function(pid) { wishlist=wishlist.filter(function(id){return id!==pid;}); saveWish(); },
    getWishlist: function() { return wishlist.map(function(id){return{product:PRODUCTS.find(function(p){return p.id===id;})};}).filter(function(w){return w.product;}); }
  };
})();
