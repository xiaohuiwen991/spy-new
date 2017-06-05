/**
 * Created by evans on 16/5/22.
 **/

var localParamsInit=function(_modules){
    var localParams={};
    var _set=function(module,key,val){
        return localParams['set'](module+key,val);
    };
    var _get=function(module,key,val){
        return localParams['get'](module+key,val);
    };
    // _modules={global:null, sys:null, reports:null, prjWatch:null, fstPage:null, infoMng:null, feedBack:null};
    var obj={
        set:function(key,val){
            localStorage['params@'+key]=val;
            return true;
        },
        get:function(key){
            return localStorage['params@'+key];
        }
    };
    _modules.push('global');
    //for(var n in _modules){
       // var space=n=='global'?'':n+'@';
       // obj[n]={
    for(var i= 0;i<_modules.length;i++){
        var space=_modules[i]=='global'?'':_modules[i]+'@';
        obj[dash2camel(_modules[i])]={
            get:function(space){return function (key,val) {return _get(space,key);}}(space),
            set:function(space){return function (key,val) {return _set(space,key,val);}}(space)
        };
    }
    localParams.extending(obj);
    window.extending({localParams:localParams});
}



var localData={};
localData.extending({
    set:function(key,val){
        if(val==null){
            localStorage[key]='null';
        }
        if(typeof val=='string'){
            localStorage[key]=val;
        }
        if(typeof val=='number'){
            localStorage[key]="[number]:"+val;
        }
        if(typeof val=='boolean'){
            localStorage[key]="[boolean]:"+val;
        }
        if(typeOf(val)=='date'){
            localStorage[key]="[date]:"+val.getTime();
        }
        else{
            try {
                localStorage[key] = JSON.stringify(val);
            }catch(e){
                localStorage[key] = String(val);
            }
        }
        return true;
    },
    get:function(key){
        var obj;
        var val=localStorage[key];
        if(typeof val!='string'){
            return val;
        }
        else if(val==='null'){
            return null;
        }
        else if(val.indexOf('[number]:')==0){
            return +(val.slice(9));
        }
        else if(val.indexOf('[boolean]:')==0){
            return val.slice(10)==='true';
        }
        else if(val.indexOf('[date]:')==0){
            return new Date(+(val.slice(7)));
        }else{
            try{
                obj=JSON.parse(val);
            }catch(e){
                obj=String(val);
            }
            return obj;
        }
    }
});

module.exports=({
    localData:localData,
    localParamsInit:localParamsInit
    //localParams:localParams
});

