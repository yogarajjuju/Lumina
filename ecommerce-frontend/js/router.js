// Hash Router — global
var Router = (function(){
  var routes={}, cleanup=null;
  function route(path,handler){routes[path]=handler;}
  function navigate(path){window.location.hash='#'+path;}
  function getParams(){
    var hash=window.location.hash.slice(1)||'/';
    var parts=hash.split('?'),path=parts[0],params=new URLSearchParams(parts[1]||'');
    return {path:path,params:params};
  }
  function start(){
    function handle(){
      if(cleanup){cleanup();cleanup=null;}
      var p=getParams(),app=document.getElementById('app'),handler=routes[p.path],rp={};
      if(!handler){
        for(var pattern in routes){
          var regex=pattern.replace(/:(\w+)/g,'(?<$1>[^/]+)');
          var match=p.path.match(new RegExp('^'+regex+'$'));
          if(match){handler=routes[pattern];rp=match.groups||{};break;}
        }
      }
      if(handler){
        rp.query=p.params;
        var c=handler(app,rp);
        if(c instanceof Promise) {
           c.then(function(res){ if(typeof res==='function')cleanup=res; }).catch(console.error);
        } else if(typeof c==='function')cleanup=c;
      } else {
        app.innerHTML='<div class="page-content container"><div class="empty-state"><div class="icon">🔍</div><h2>Page Not Found</h2><button class="btn btn-primary" onclick="location.hash=\'#/\'">Go Home</button></div></div>';
      }
      window.scrollTo(0,0);
    }
    window.addEventListener('hashchange',handle);
    handle();
  }
  return {route:route,navigate:navigate,start:start};
})();
