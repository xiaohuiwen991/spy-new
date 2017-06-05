

    (function(context){
        Object.defineProperty(Object.prototype,'extending',{
            value:function() { //name,val or obj
                var obj={};
                typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
                for(var n in obj){
                    Object.defineProperty(this, n, {
                        value: obj[n],
                        writable:false, enumerable:false, configurable:false
                    }); 
                }
            },writable:false, enumerable:false, configurable:false
        });
        Object.defineProperty(Object.prototype,'getting',{
            value:function() { //name,getter or obj
                var obj={};
                typeof arguments[0]=='object'? (obj=arguments[0]):(obj[arguments[0]]=arguments[1]);
                for(var n in obj){
                    Object.defineProperty(this, n, {
                        get:obj[n],enumerable:false, configurable:false
                    }); 
                }
            },writable:false, enumerable:false, configurable:false
        });
    })(window);

    window===top && window.extending({_mol_wins:{},_opener_wins:{}});

    window.getting({
        doc:function(){return document.documentElement;},
        width:function(){return this.innerWidth;},
        height:function(){return this.innerHeight;},
        scrollTop:function(){return document.documentElement.scrollTop||document.body.scrollTop;},
        scrollLeft:function(){return document.documentElement.scrollLeft||document.body.scrollLeft;},
        iframe:function(){
            // if(window===top)return null;
            // var frs=parent.document.getElementsByTagName('iframe');
            // for(var i=frs.length-1;i>-1;i--){
            //     if(frs[i].contentWindow==self){return frs[i];}
            // }
            // return null;
            return window.frameElement;
        },
        $opener:function(){
            var openerId=this.iframe.getAttribute('opener-id');
            return top._opener_wins[openerId];
        }
    });

    if(window!==top && location.protocol!='file:' && (window.originSrc=window.iframe.getAttribute('o-src'))&&((location.pathname+location.search)!==originSrc)){
        console.info(location.pathname+location.search)
        console.warn(originSrc)
        //location.href=originSrc;
    }

    Object.prototype.extending('fixing',function(key){
        Object.defineProperty(this, key, {
            writable:false,
            configurable:false
        });
    });

    var config=require('../data/config.json');
    window.extending({config:config});
    
    var $=require('./jquery');
    window.extending({$:$,jQuery:$});
    
    var $eui=require('./eui');
    $eui($);
    
    var $cookie=require('./jquery.cookie');
    $cookie($);
    
    var exy=require('./exy');
    window.extending(exy);
    
    require('./proto');
    
    var stp=require('./stp');
    window.extending(stp);
    
    var pub=require('./pub');
    window.extending(pub);
    
    var locals=require('./locals');
    window.extending(locals);
    top.molKeys && window.localParamsInit(top.molKeys);
    
    var paging=require('./paging.js');
    var validate=require('./validate.js');

    window.path=typeof top.path=='string'? top.path:location.href.replace(/index2?\.(html|jsp)/,'').replace(/view\/.*/,'');

    if(typeof module === "object" && typeof module.exports === "object" ){
        module.exports={
            checkDtd:function(){
                   if(document.compatMode=='BackCompat'){
                       throw new Error('BackCompat！please check DTD！');
                   }
                }
        }
    }