// Main App — wires everything together (Async version)
var App = (function(){
  var cartOpen=false;

  function renderLayout(){
    var shell=document.getElementById('shell');
    shell.innerHTML=UI.navbar()+'<main id="app"></main>'+UI.footer()+'<div id="cart-drawer-root"></div><div id="auth-root"></div>';
  }

  function refresh(){renderLayout();Router.start();}

  // Cart
  function toggleCart(){cartOpen=!cartOpen;document.getElementById('cart-drawer-root').innerHTML=cartOpen?UI.cartDrawer():'';}
  
  async function updateQty(cid,d){
    var cart=API.getCart(),item=cart.find(function(c){return c.id===cid;});
    if(!item)return;var nq=item.quantity+d;
    if(nq<=0){ await API.removeFromCart(cid); UI.showToast('Item removed'); }
    else{ await API.updateCartItem(cid,nq); }
    refresh();
  }
  
  async function removeItem(cid){ await API.removeFromCart(cid); UI.showToast('Item removed'); refresh(); }

  // Auth
  function showAuth(mode){document.getElementById('auth-root').innerHTML=UI.authModal(mode||'login');}
  function hideAuth(){document.getElementById('auth-root').innerHTML='';}
  
  async function handleAuth(e,mode){
    e.preventDefault();
    var email=document.getElementById('auth-email').value;
    var pass=document.getElementById('auth-pass').value;
    try{
      if(mode==='register'){
          var nm=document.getElementById('auth-name').value;
          await API.register(nm,email,pass);
      } else {
          await API.login(email,pass);
      }
      hideAuth(); UI.showToast('Welcome! 🎉'); refresh();
    } catch(err) { 
        UI.showToast(err.message, 'error'); 
    }
    return false;
  }
  
  async function handleOAuth(providerName){
    try{
      await API.loginWithOAuth(providerName);
      hideAuth(); UI.showToast('Welcome! 🎉'); refresh();
    } catch(err) { 
        UI.showToast(err.message, 'error'); 
    }
  }
  
  async function doLogout(){ await API.logout(); UI.showToast('Logged out'); refresh(); }

  // Product actions
  window._pQty=1;
  function chgQty(d){window._pQty=Math.max(1,window._pQty+d);var el=document.getElementById('qty-val');if(el)el.textContent=window._pQty;}
  
  async function addPC(pid){
    if(!API.isLoggedIn()){showAuth();return;}
    await API.addToCart(pid, window._pQty||1); window._pQty=1; UI.showToast('Added to cart! 🛒'); refresh();
  }
  
  async function toggleWish(pid){
    if(!API.isLoggedIn()){showAuth();return;}
    if(API.isInWishlist(pid)){ await API.removeFromWishlist(pid); UI.showToast('Removed from wishlist'); }
    else{ await API.addToWishlist(pid); UI.showToast('Added to wishlist! ❤️'); }
    refresh();
  }
  
  function goCheckout(){if(!API.isLoggedIn()){showAuth();return;}Router.navigate('/checkout');}
  
  async function submitOrder(btn){
    btn.disabled = true;
    btn.innerHTML = "Processing...";
    var paymentMethod = (document.getElementById('ship-payment')||{}).value||'COD';
    var o = await API.placeOrder({
      shippingAddress:(document.getElementById('ship-address')||{}).value||'',
      shippingCity:(document.getElementById('ship-city')||{}).value||'',
      shippingState:(document.getElementById('ship-state')||{}).value||'',
      shippingZip:(document.getElementById('ship-zip')||{}).value||'',
      paymentMethod: paymentMethod
    });
    
    // Razorpay Integration Flow
    if(paymentMethod === 'RAZORPAY' && window.Razorpay) {
        if ("rzp_test_YOUR_KEY" === "rzp_test_YOUR_KEY" || options && options.key === "rzp_test_YOUR_KEY") {
            // Bypass Razorpay crash if the user hasn't set their key yet
            UI.showToast('Payment successful (Demo Mode)! 🎉'); 
            renderLayout(); 
            Router.navigate('/order-success/'+o.id);
            return;
        }

        UI.showToast('Opening Secure Payment... 💳', 'info');
        var options = {
            "key": "rzp_test_YOUR_KEY", 
            "amount": Math.round(o.totalAmount * 100), 
            "currency": "INR",
            "name": "Lumina",
            "description": "Order #" + o.id,
            "handler": function (response){
                UI.showToast('Payment successful! 🎉'); renderLayout(); Router.navigate('/order-success/'+o.id);
            },
            "prefill": {
                "name": (API.getUser()||{}).name || '',
                "email": (API.getUser()||{}).email || '',
                "contact": "9999999999"
            },
            "theme": { "color": "#7c3aed" },
            "modal": {
                "ondismiss": function(){
                    btn.disabled = false; btn.innerHTML = "Pay Securely";
                    UI.showToast('Payment cancelled', 'error');
                }
            }
        };
        try {
            var rzp = new window.Razorpay(options);
            rzp.open();
        } catch(e) {
            UI.showToast('Payment gateway error. Check console.', 'error');
            btn.disabled = false; btn.innerHTML = "Pay Securely";
        }
    } else {
        UI.showToast('Order placed! 🎉'); renderLayout(); Router.navigate('/order-success/'+o.id);
    }
  }
  
  async function sortCat(id,val){
    var parts=val.split('-'),prods=await API.getProductsByCategory(id);
    if(parts[0]==='price') prods.sort(function(a,b){return parts[1]==='desc'?b.price-a.price:a.price-b.price;});
    else if(parts[0]==='rating') prods.sort(function(a,b){return b.rating-a.rating;});
    var el=document.getElementById('product-list');if(el)el.innerHTML=prods.map(UI.productCard).join('');
  }

  // 3D Tilt Effect Observer
  var tiltObserver = new MutationObserver(function() {
      document.querySelectorAll('.product-card:not(.tilt-added), .category-card:not(.tilt-added)').forEach(function(el) {
          el.classList.add('tilt-added');
          el.addEventListener('mousemove', function(e) {
              var rect = el.getBoundingClientRect();
              var x = e.clientX - rect.left;
              var y = e.clientY - rect.top;
              var cx = rect.width / 2;
              var cy = rect.height / 2;
              var rotX = ((y - cy) / cy) * -8;
              var rotY = ((x - cx) / cx) * 8;
              el.style.transform = 'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-4px)';
              el.style.transition = 'none';
          });
          el.addEventListener('mouseleave', function() {
              el.style.transform = '';
              el.style.transition = 'all var(--duration-normal) var(--ease-out-expo)';
          });
      });
  });
  // Execute after a short delay to ensure DOM is ready
  setTimeout(function(){ tiltObserver.observe(document.body, {childList: true, subtree: true}); }, 100);

  // Event delegation
  document.addEventListener('click', async function(e){
    var cartBtn=e.target.closest('.add-cart-btn');
    var wishBtn=e.target.closest('.wishlist-btn');
    var card=e.target.closest('.product-card');
    
    if(cartBtn){
        e.stopPropagation();
        var pid=Number(cartBtn.dataset.cart);
        if(!API.isLoggedIn()){showAuth();return;}
        await API.addToCart(pid,1); UI.showToast('Added to cart! 🛒'); refresh(); return;
    }
    if(wishBtn){e.stopPropagation();await toggleWish(Number(wishBtn.dataset.wish));return;}
    if(card){Router.navigate('/product/'+card.dataset.id);}
  });

  // Search
  document.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&e.target.id==='search-input'){var q=e.target.value.trim();if(q)Router.navigate('/search?q='+encodeURIComponent(q));}
  });

  // Scroll effect
  window.addEventListener('scroll',function(){var n=document.getElementById('main-nav');if(n)n.classList.toggle('scrolled',window.scrollY>50);});

  // Routes
  Router.route('/',Pages.home);
  Router.route('/category/:id',Pages.category);
  Router.route('/search',Pages.search);
  Router.route('/product/:id',Pages.product);
  Router.route('/cart',Pages.cart);
  Router.route('/checkout',Pages.checkout);
  Router.route('/order-success/:id',Pages.orderSuccess);
  Router.route('/orders',Pages.orders);
  Router.route('/wishlist',Pages.wishlist);
  Router.route('/deals',Pages.deals);

  // Boot
  renderLayout();
  Router.start();

  return {toggleCart:toggleCart,updateQty:updateQty,removeItem:removeItem,showAuth:showAuth,hideAuth:hideAuth,handleAuth:handleAuth,handleOAuth:handleOAuth,doLogout:doLogout,chgQty:chgQty,addPC:addPC,toggleWish:toggleWish,goCheckout:goCheckout,submitOrder:submitOrder,sortCat:sortCat};
})();
