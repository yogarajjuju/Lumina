// Page renderers — global (Async version)
var Pages = (function(){
  var F=UI.fmt, S=UI.stars, PC=UI.productCard;

  function spinner() { 
    return '<div class="page-content container"><div class="product-grid">' + 
           Array(8).fill('<div class="skeleton" style="height:350px"></div>').join('') + 
           '</div></div>'; 
  }

  async function home(app){
    app.innerHTML = spinner();
    var cats=await API.getCategories(),deals=await API.getDeals(),trend=await API.getTrending(),feat=await API.getFeatured();
    app.innerHTML='<div class="page-content">'
      +'<section class="hero"><div class="hero-bg"></div><div class="hero-content">'
      +'<h1 class="hero-title">Discover Your <span class="gradient-text">Aura</span><br>with Lumina</h1>'
      +'<p class="hero-subtitle">Premium products, stunning deals, and a shopping experience that feels like magic.</p>'
      +'<div class="hero-actions"><button class="btn btn-primary btn-lg" onclick="location.hash=\'#/category/1\'">Shop Electronics</button>'
      +'<button class="btn btn-secondary btn-lg" onclick="location.hash=\'#/deals\'">🔥 Today\'s Deals</button></div>'
      +'</div></section><div class="container">'
      +'<section class="section"><h2 class="section-title"><span class="emoji">🏷️</span> Shop by Category</h2>'
      +'<div class="category-grid">'+cats.map(function(c){return '<div class="category-card" onclick="location.hash=\'#/category/'+c.id+'\'"><div class="category-icon">'+c.icon+'</div><div class="category-name">'+c.name+'</div></div>';}).join('')+'</div></section>'
      +'<section class="section"><h2 class="section-title"><span class="emoji">🔥</span> Deals of the Day</h2><div class="product-grid">'+deals.slice(0,4).map(PC).join('')+'</div></section>'
      +'<section class="section"><h2 class="section-title"><span class="emoji">⭐</span> Featured Products</h2><div class="product-grid">'+feat.slice(0,4).map(PC).join('')+'</div></section>'
      +'<section class="section"><h2 class="section-title"><span class="emoji">📈</span> Trending Now</h2><div class="product-grid">'+trend.slice(0,8).map(PC).join('')+'</div></section>'
      +'</div></div>';
  }

  async function category(app,p){
    app.innerHTML = spinner();
    var id=p.id,cats=await API.getCategories(),prods=await API.getProductsByCategory(id);
    var cat=cats.find(function(c){return c.id===Number(id);});
    var name=cat?cat.name:'Products';
    app.innerHTML='<div class="page-content container">'
      +'<div class="breadcrumbs"><a href="#/">Home</a> › <span>'+name+'</span></div>'
      +'<h1 class="section-title">'+(cat?cat.icon:'')+' '+name+'</h1>'
      +'<div class="sort-bar"><span style="color:var(--text-secondary)">'+prods.length+' products</span>'
      +'<select id="sort-select" onchange="App.sortCat(\''+id+'\',this.value)"><option value="id-asc">Default</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating-desc">Top Rated</option></select></div>'
      +'<div class="product-grid" id="product-list">'+prods.map(PC).join('')+'</div>'
      +(prods.length===0?'<div class="empty-state"><div class="icon">📦</div><h2>No products found</h2></div>':'')
      +'</div>';
  }

  async function search(app,p){
    app.innerHTML = spinner();
    var q=p.query.get('q')||'',results=await API.searchProducts(q);
    app.innerHTML='<div class="page-content container">'
      +'<div class="breadcrumbs"><a href="#/">Home</a> › <span>Search: "'+q+'"</span></div>'
      +'<h1 class="section-title">🔍 Results for "'+q+'"</h1>'
      +'<p style="color:var(--text-secondary);margin-bottom:24px">'+results.length+' products found</p>'
      +'<div class="product-grid">'+results.map(PC).join('')+'</div>'
      +(results.length===0?'<div class="empty-state"><div class="icon">🔍</div><h2>No results</h2><p>Try a different search term</p></div>':'')
      +'</div>';
  }

  async function product(app,p){
    app.innerHTML = spinner();
    var prod=await API.getProductById(p.id),revs=await API.getProductReviews(p.id),w=API.isInWishlist(Number(p.id));
    if(!prod){app.innerHTML='<div class="page-content container"><div class="empty-state"><h2>Product not found</h2></div></div>';return;}
    app.innerHTML='<div class="page-content container product-detail">'
      +'<div class="breadcrumbs"><a href="#/">Home</a> › <a href="#/category/'+prod.category.id+'">'+prod.category.name+'</a> › <span>'+prod.name+'</span></div>'
      +'<div class="product-detail-grid"><div class="product-detail-image glass-panel"><img src="'+prod.imageUrl+'" alt="'+prod.name+'"></div>'
      +'<div class="product-detail-info"><div class="brand">'+prod.brand+'</div><h1>'+prod.name+'</h1>'
      +'<div class="rating-row">'+S(prod.rating)+' <span style="color:var(--text-secondary)">'+prod.rating+' ('+prod.reviewCount+' reviews)</span></div>'
      +'<div class="price-section"><span class="price-big">'+F(prod.price)+'</span>'
      +(prod.originalPrice?'<span class="price-old">'+F(prod.originalPrice)+'</span>':'')
      +(prod.discount>0?'<span class="discount-tag">'+prod.discount+'% OFF</span>':'')+'</div>'
      +'<p class="description">'+prod.description+'</p>'
      +'<div class="product-detail-actions">'
      +'<div class="qty-selector"><button onclick="App.chgQty(-1)">−</button><span id="qty-val">1</span><button onclick="App.chgQty(1)">+</button></div>'
      +'<button class="btn btn-primary btn-lg" onclick="App.addPC('+prod.id+')">🛒 Add to Cart</button>'
      +'<button class="btn btn-secondary btn-lg" onclick="App.toggleWish('+prod.id+')">'+(w?'❤️ Wishlisted':'🤍 Wishlist')+'</button></div>'
      +'<div class="glass-panel" style="padding:20px;margin-top:24px"><h3 style="margin-bottom:12px;font-size:1rem;font-weight:600">Why buy from Lumina?</h3><div style="display:grid;gap:12px;color:var(--text-secondary);font-size:0.9rem"><span>🚚 <strong>Free & Fast Delivery</strong> on orders over ₹500</span><span>↩️ <strong>10 Day Easy Returns</strong> - no questions asked</span><span>🛡️ <strong>1 Year Brand Warranty</strong> included on electronics</span></div></div>'
      +'</div></div>'
      +'<section class="section"><h2 class="section-title">📝 Reviews ('+revs.length+')</h2>'
      +(revs.length?revs.map(function(r){return '<div class="review-card"><div class="review-header"><div class="review-avatar">'+r.user.name[0]+'</div><div><strong>'+r.user.name+'</strong><div class="review-meta">'+S(r.rating)+' · '+(r.title||'')+'</div></div></div><p class="review-comment">'+r.comment+'</p></div>';}).join(''):'<p style="color:var(--text-secondary)">No reviews yet.</p>')
      +'</section></div>';
    window._pQty=1;
  }

  function cart(app){
    var items=API.getCart(),total=API.getCartTotal(),ship=total>500?0:49;
    if(!items.length){app.innerHTML='<div class="page-content container"><div class="empty-state"><div class="icon">🛒</div><h2>Your Cart is Empty</h2><p>Add some products!</p><button class="btn btn-primary btn-lg" onclick="location.hash=\'#/\'">Start Shopping</button></div></div>';return;}
    app.innerHTML='<div class="page-content container"><h1 class="section-title">🛒 Shopping Cart</h1><div class="checkout-grid"><div>'
      +items.map(function(c){return '<div class="cart-item-row"><img src="'+c.product.imageUrl+'" alt="'+c.product.name+'" onclick="location.hash=\'#/product/'+c.product.id+'\'" style="cursor:pointer"><div class="item-details"><h4 style="cursor:pointer" onclick="location.hash=\'#/product/'+c.product.id+'\'">'+c.product.name+'</h4><div style="color:var(--text-secondary);font-size:0.85rem">'+c.product.brand+'</div><div class="item-actions"><span style="font-size:1.1rem;font-weight:700">'+F(c.product.price*c.quantity)+'</span><div class="cart-item-qty"><button onclick="App.updateQty('+c.id+',-1)">−</button><span>'+c.quantity+'</span><button onclick="App.updateQty('+c.id+',1)">+</button><button onclick="App.removeItem('+c.id+')" style="margin-left:12px;color:var(--error)">🗑 Remove</button></div></div></div></div>';}).join('')
      +'</div><div class="order-summary"><h3>Order Summary</h3>'
      +'<div class="summary-row"><span>Subtotal ('+items.length+' items)</span><span>'+F(total)+'</span></div>'
      +'<div class="summary-row"><span>Shipping</span><span>'+(ship===0?'<span style="color:var(--success)">FREE</span>':F(ship))+'</span></div>'
      +'<div class="summary-row total"><span>Total</span><span>'+F(total+ship)+'</span></div>'
      +'<button class="btn btn-primary btn-lg" style="width:100%;margin-top:16px" id="checkout-btn" onclick="App.goCheckout()">Proceed to Checkout</button>'
      +'</div></div></div>';
  }

  function checkout(app){
    if(!API.isLoggedIn()){App.showAuth();app.innerHTML='<div class="page-content container"><div class="empty-state"><h2>Please login to checkout</h2></div></div>';return;}
    var items=API.getCart(),total=API.getCartTotal(),u=API.getUser();
    app.innerHTML='<div class="page-content container"><h1 class="section-title">💳 Checkout</h1><div class="checkout-grid"><div><div class="glass-panel" style="padding:24px">'
      +'<h3 style="margin-bottom:16px">Shipping Address</h3><form class="auth-form" id="checkout-form">'
      +'<label>Full Name</label><input class="input-glass" id="ship-name" required value="'+u.name+'">'
      +'<label>Address</label><input class="input-glass" id="ship-address" required placeholder="123 Main Street">'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div><label>City</label><input class="input-glass" id="ship-city" required placeholder="Mumbai"></div><div><label>State</label><input class="input-glass" id="ship-state" required placeholder="Maharashtra"></div></div>'
      +'<label>ZIP Code</label><input class="input-glass" id="ship-zip" required placeholder="400001">'
      +'<label>Payment</label><select class="input-glass" id="ship-payment">'
      +'<option value="RAZORPAY">UPI / NetBanking / Cards (Razorpay)</option>'
      +'<option value="COD">Cash on Delivery</option></select>'
      +'</form></div></div>'
      +'<div class="order-summary"><h3>Order Summary</h3>'
      +items.map(function(c){return '<div style="display:flex;gap:8px;margin-bottom:8px;font-size:0.9rem"><span style="flex:1">'+c.product.name+' × '+c.quantity+'</span><span>'+F(c.product.price*c.quantity)+'</span></div>';}).join('')
      +'<div class="summary-row total"><span>Total</span><span>'+F(total)+'</span></div>'
      +'<button class="btn btn-primary btn-lg" style="width:100%;margin-top:16px" onclick="App.submitOrder(this)">Pay Securely</button>'
      +'</div></div></div>';
  }

  function orderSuccess(app,p){
    app.innerHTML='<div class="page-content container"><div class="order-success"><div class="checkmark">✓</div>'
      +'<h1>Order Placed Successfully!</h1><p style="color:var(--text-secondary);margin-bottom:24px">Order #'+p.id+' confirmed. Delivery in 5 days.</p>'
      +'<div style="display:flex;gap:16px;justify-content:center"><button class="btn btn-primary btn-lg" onclick="location.hash=\'#/orders\'">View Orders</button>'
      +'<button class="btn btn-secondary btn-lg" onclick="location.hash=\'#/\'">Continue Shopping</button></div></div></div>';
  }

  async function orders(app){
    if(!API.isLoggedIn()){App.showAuth();app.innerHTML='<div class="page-content container"><div class="empty-state"><h2>Please login</h2></div></div>';return;}
    app.innerHTML = spinner();
    var ords=await API.getOrders();
    app.innerHTML='<div class="page-content container"><h1 class="section-title">📦 My Orders</h1>'
      +(ords.length?ords.map(function(o){return '<div class="order-card"><div class="order-card-header"><div><strong>Order #'+o.id+'</strong><div style="color:var(--text-secondary);font-size:0.85rem">'+new Date(o.orderDate).toLocaleDateString()+'</div></div><div><span class="badge badge-success">'+o.status+'</span><div style="font-weight:700;margin-top:4px">'+F(o.totalAmount)+'</div></div></div><div class="order-card-items">'+o.items.map(function(i){return '<img src="'+i.product.imageUrl+'" alt="'+i.product.name+'" title="'+i.product.name+'">';}).join('')+'</div></div>';}).join('')
        :'<div class="empty-state"><div class="icon">📦</div><h2>No Orders Yet</h2><button class="btn btn-primary" onclick="location.hash=\'#/\'">Start Shopping</button></div>')
      +'</div>';
  }

  async function wishlist(app){
    if(!API.isLoggedIn()){App.showAuth();app.innerHTML='<div class="page-content container"><div class="empty-state"><h2>Please login</h2></div></div>';return;}
    app.innerHTML = spinner();
    var data=await API.getWishlist();
    app.innerHTML='<div class="page-content container"><h1 class="section-title">❤️ My Wishlist</h1>'
      +(data.length?'<div class="product-grid">'+data.map(function(w){return PC(w.product);}).join('')+'</div>'
        :'<div class="empty-state"><div class="icon">❤️</div><h2>Wishlist is Empty</h2><button class="btn btn-primary" onclick="location.hash=\'#/\'">Browse Products</button></div>')
      +'</div>';
  }

  async function deals(app){
    app.innerHTML = spinner();
    var d=await API.getDeals();
    app.innerHTML='<div class="page-content container"><h1 class="section-title">🔥 Today\'s Best Deals</h1><div class="product-grid">'+d.map(PC).join('')+'</div></div>';
  }

  return {home:home,category:category,search:search,product:product,cart:cart,checkout:checkout,orderSuccess:orderSuccess,orders:orders,wishlist:wishlist,deals:deals};
})();
