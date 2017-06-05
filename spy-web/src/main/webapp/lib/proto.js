//JSON扩展
JSON.extending({
    equal:function(obj,obj2){return obj===obj2 || ( typeof obj==typeof obj2  && JSON.stringify(obj)===JSON.stringify(obj2) );}
});
var weeks=['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
var weeks2=["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
//时间扩展
Date.prototype.extending({
    getDayAs:function(symbol){
        if(symbol=='星期'){
            return weeks[this.getDay()];
        }else if(symbol=='周'){
            return weeks2[this.getDay()];
        }else{
            return this.getDay();
        }
    },
    addMonth:function(i){
        var m=this.getMonth();
        var y=this.getFullYear();
        if(i>0){
            (i>11) && (y+=Math.floor(i/12));
        }else{
            (i<-11)&& (y+=Math.ceil(i/12));
        }
        m+=i%12;
        this.setMonth(m);
        this.setFullYear(y);
        return this;
    },
    format:function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "D+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "Q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        fmt=fmt||'YYYY-MM-DD hh:mm:ss';
        for(var n in {8:8,10:10})
            if(fmt.slice(0,+n).toUpperCase().replace(/\-|\.|\s|\//g,'')=='YYYYMMDD'){
                fmt=fmt.slice(0,+n).toUpperCase()+fmt.slice(+n);
            }
        if (/(Y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        return fmt;
    }
});

Date.extending({
    format:function(fmt){return new Date().format(fmt);},
    getDayAs:function(symbol){return new Date().getDayAs(symbol);},
    weeks:weeks,
    weeks2:weeks2
});
// Date.weeks[new Date().getDay()]

//String扩展
String.prototype.extending({
    isEmpty:function(){return this.replace(/\s+/gm,'').length===0;},
    format:function(){
        var vname='\\{i\\}';
        var str=this;
        var agmt;
        for(var i=arguments.length-1;i>-1;i--){
            agmt=vname.replace('i',i);
            str=str.replace(RegExp(agmt,'g'),arguments[i]);
        }
        return str;
    },
    inside:function(strs){
        var the=this.valueOf();
        if(typeof strs=='string'){
            return strs.indexOf(the)>-1;
        }else{                                                                               //字符串存在于数组某项? 不接受大小写,要忽略大小写请自己将双方toUpperCase()
            for(var i=strs.length-1;i>-1;i--){
                if( the===strs[i].valueOf() )
                    return i+1;	//返回第几项. 不从0开始,避免识别为false, 注意是最后一次出现的位置+1
            }
        }
        return false;
    },
    like:function(key){
        var bs=key.indexOf('%')==0;
        var be=key.lastIndexOf('%')==key.length-1;
        if(bs&&be)  return this.indexOf(key.slice(1,-1))!=-1;
        else if(bs) return this.lastIndexOf(key.slice(1))==this.length-key.length+1;
        else if(be) return this.indexOf(key.slice(0,-1))==0;
        else return String(this)===String(key);
    },
    trimL:function(){return this.trimLeft();},
    trimR:function(){return this.trimRight();},
    lower:function(){return this.toLowerCase();},
    upper:function(){return this.toUpperCase();}
});
Number.prototype.extending({
    prev:function(){return this-1;},
    next:function(){return this+1;}
});
//数组对象扩展
var lambda=require('./lambda');
Array.prototype.extending(lambda);

if(typeof module === "object" && typeof module.exports === "object" ){
    //module.exports=lambda;
}