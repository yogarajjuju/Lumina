// UI Components — global
var UI = (function(){
  function fmt(p){return '₹'+Number(p).toLocaleString('en-IN');}
  function stars(r){var f=Math.floor(r),e=5-f;return '<span class="star-rating">'+'★'.repeat(f)+'<span class="star-empty">'+'★'.repeat(e)+'</span></span>';}

  function productCard(p){
    var w=API.isInWishlist(p.id);
    return '<div class="product-card" data-id="'+p.id+'"><div class="product-card-image-wrap">'
      +(p.discount>0?'<span class="discount-badge">'+p.discount+'% OFF</span>':'')
      +'<button class="wishlist-btn'+(w?' active':'')+'" data-wish="'+p.id+'" onclick="event.stopPropagation()">'+(w?'❤️':'🤍')+'</button>'
      +'<img class="product-card-image" src="'+p.imageUrl+'" alt="'+p.name+'" loading="lazy"></div>'
      +'<div class="product-card-body"><div class="product-card-brand">'+p.brand+'</div>'
      +'<div class="product-card-title">'+p.name+'</div><div class="product-card-price">'
      +'<span class="price-current">'+fmt(p.price)+'</span>'
      +(p.originalPrice?'<span class="price-original">'+fmt(p.originalPrice)+'</span>':'')
      +(p.discount>0?'<span class="price-discount">'+p.discount+'% off</span>':'')
      +'</div><div class="product-card-footer">'+stars(p.rating)
      +' <span style="color:var(--text-tertiary);font-size:0.8rem">('+p.reviewCount+')</span>'
      +'<button class="add-cart-btn" data-cart="'+p.id+'" onclick="event.stopPropagation()">Add to Cart</button>'
      +'</div></div></div>';
  }

  function navbar(){
    var u=API.getUser(),cnt=API.getCartCount();
    return '<nav class="navbar" id="main-nav"><div class="nav-inner">'
      +'<div class="nav-logo" onclick="location.hash=\'#/\'">✨ Lumina</div>'
      +'<div class="nav-search"><span class="search-icon">🔍</span>'
      +'<input type="text" id="search-input" placeholder="Search products, brands..." autocomplete="off"></div>'
      +'<div class="nav-actions">'
      +(u?'<div class="nav-btn" onclick="location.hash=\'#/orders\'"><span class="icon">📦</span><span>Orders</span></div>'
        +'<div class="nav-btn" onclick="location.hash=\'#/wishlist\'"><span class="icon">❤️</span><span>Wishlist</span></div>':'')
      +'<div class="nav-btn" id="cart-nav-btn" onclick="App.toggleCart()"><span class="icon">🛒</span><span>Cart</span>'
      +(cnt>0?'<span class="cart-count">'+cnt+'</span>':'')+'</div>'
      +(u?'<div class="nav-btn" onclick="App.doLogout()"><span class="icon">👤</span><span>'+u.name.split(' ')[0]+'</span></div>'
        :'<div class="nav-btn" onclick="App.showAuth()"><span class="icon">👤</span><span>Login</span></div>')
      +'</div></div></nav>';
  }

  function footer(){
    return '<footer class="footer"><div class="footer-grid">'
      +'<div class="footer-col"><h4>✨ Lumina</h4><p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6">Premium ecommerce with a stunning glass design. Built with Java Spring Boot & JavaScript.</p></div>'
      +'<div class="footer-col"><h4>Shop</h4><a href="#/category/1">Electronics</a><a href="#/category/2">Fashion</a><a href="#/category/3">Home & Kitchen</a><a href="#/category/4">Books</a></div>'
      +'<div class="footer-col"><h4>Account</h4><a href="#/orders">My Orders</a><a href="#/wishlist">Wishlist</a><a href="#/cart">Cart</a></div>'
      +'<div class="footer-col"><h4>Help</h4><a href="#">Customer Service</a><a href="#">Returns</a><a href="#">FAQ</a></div>'
      +'</div><div class="footer-bottom">© 2026 Lumina. All rights reserved. Built with ☕ Java + ✨ JavaScript</div></footer>';
  }

  function cartDrawer(){
    var items=API.getCart(),total=API.getCartTotal();
    if(!items.length) return '<div class="cart-drawer-overlay" onclick="App.toggleCart()"></div><div class="cart-drawer"><div class="cart-drawer-header"><h2>🛒 Your Cart</h2><button class="btn btn-ghost" onclick="App.toggleCart()">✕</button></div><div class="cart-drawer-items"><div class="empty-state"><div class="icon">🛒</div><h2>Cart is Empty</h2></div></div></div>';
    return '<div class="cart-drawer-overlay" onclick="App.toggleCart()"></div><div class="cart-drawer"><div class="cart-drawer-header"><h2>🛒 Cart ('+items.length+')</h2><button class="btn btn-ghost" onclick="App.toggleCart()">✕</button></div><div class="cart-drawer-items">'
      +items.map(function(c){return '<div class="cart-drawer-item"><img src="'+c.product.imageUrl+'" alt="'+c.product.name+'"><div class="cart-item-info"><h4>'+c.product.name+'</h4><div class="price">'+fmt(c.product.price)+'</div><div class="cart-item-qty"><button onclick="App.updateQty('+c.id+',-1)">−</button><span>'+c.quantity+'</span><button onclick="App.updateQty('+c.id+',1)">+</button><button onclick="App.removeItem('+c.id+')" style="margin-left:auto;color:var(--error)">🗑</button></div></div></div>';}).join('')
      +'</div><div class="cart-drawer-footer"><div class="cart-total"><span>Total</span><span>'+fmt(total)+'</span></div><button class="btn btn-primary btn-lg" style="width:100%" onclick="App.toggleCart();location.hash=\'#/cart\'">View Cart & Checkout</button></div></div>';
  }

  function authModal(mode){
    mode=mode||'login';
    return '<div class="modal-overlay" onclick="if(event.target===this)App.hideAuth()"><div class="modal-content"><button class="modal-close" onclick="App.hideAuth()">✕</button>'
      +'<h2 class="modal-title">'+(mode==='login'?'Welcome Back':'Create Account')+'</h2>'
      +'<div style="display:flex;gap:12px;margin-bottom:20px">'
      +'<button class="btn btn-secondary" style="flex:1" onclick="App.handleOAuth(\'google\')">🌐 Google</button>'
      +'<button class="btn btn-secondary" style="flex:1" onclick="App.handleOAuth(\'microsoft\')">🪟 Microsoft</button>'
      +'</div><div style="text-align:center;color:var(--text-tertiary);margin-bottom:16px;font-size:0.8rem">OR CONTINUE WITH EMAIL</div>'
      +'<form class="auth-form" id="auth-form" onsubmit="return App.handleAuth(event,\''+ mode +'\')">'
      +(mode==='register'?'<label>Full Name</label><input class="input-glass" type="text" id="auth-name" placeholder="John Doe">':'')
      +'<label>Email</label><input class="input-glass" type="email" id="auth-email" placeholder="you@example.com" required>'
      +'<label>Password</label><input class="input-glass" type="password" id="auth-pass" placeholder="••••••••" required>'
      +'<button type="submit" class="btn btn-primary btn-lg" style="width:100%;margin-top:8px">'+(mode==='login'?'Sign In':'Create Account')+'</button></form>'
      +'<div class="auth-toggle">'+(mode==='login'?'No account? <a onclick="App.showAuth(\'register\')">Sign Up</a>':'Have an account? <a onclick="App.showAuth(\'login\')">Sign In</a>')+'</div>'
      +'</div></div>';
  }

  function showToast(msg,type){
    type=type||'success';
    var c=document.getElementById('toast-container');
    if(!c){c=document.createElement('div');c.id='toast-container';c.className='toast-container';document.body.appendChild(c);}
    var icons={success:'✅',error:'❌',info:'ℹ️'};
    var t=document.createElement('div');t.className='toast toast-'+type;t.innerHTML=(icons[type]||'')+' '+msg;
    c.appendChild(t);setTimeout(function(){t.classList.add('toast-exit');setTimeout(function(){t.remove();},300);},3000);
  }

  return {fmt:fmt,stars:stars,productCard:productCard,navbar:navbar,footer:footer,cartDrawer:cartDrawer,authModal:authModal,showToast:showToast};
})();
