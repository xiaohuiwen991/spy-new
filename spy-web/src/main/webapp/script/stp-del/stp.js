//jQuery lite
if(typeof jQuery=='undefined'){
    var jQuery=function(id){return new jQuery.init(document.getElementById(id.slice(1)))};
    jQuery.init=function(ele){
        this[0]=ele;
        this.html=function(str){
            if(str){
				this[0].innerHTML=str;
				return this;
			}else{
				return this[0].innerHTML.replace(/^\s*|\s*$/gm,'');
			} 
        };
        this.attr=function(name){return this[0].getAttribute(name);}
    };
}

//for null,undefined,number,xss and others
function encodeTag(str,desc4null){
    //除非显示设定为false，否则数字0会做‘’处理(字符串'0'不会)
    ( (encodeTag.zeroAsEmpty!==false && str===0) || str==null ) && (str=desc4null||'');
	return encodeTag.allowHTML ? String(str).replace(/\<\/?script\>/gmi,function(s){return s.replace(/\<|\>/gm,function($){return {'<':'&lt;','>':'&gt;'}[$]})})
							   : String(str).replace(/\<|\>/gm,function($){return {'<':'&lt;','>':'&gt;'}[$]});
}
//core
function $compile(source,data,arg2,arg3) {
    var desc4null;
    var helper;
    if(typeof arg2=='string'){
        desc4null=arg2;
        typeof arg3=='function' && (helper=arg3);
    }else{
        typeof arg2=='function' && (helper=arg3);
    }
    //也可以在$template前先在data挂一个公用的钩子指向额外数据（主要是实现数组各项共用一个扩展数据）
	//var the=data['this']||this; 放弃在各项上挂载‘this’属性指向this的小技俩
    var the=this;
	if(!source){
		throw new Error('source undefined! please chekout the template id or url!');
	}
    var format=function (obj,str,prefix) {
        //二级属性用一级.做前缀即可
        prefix=prefix||'';
        //{{#tp2}}表示嵌套模版
        str=str.replace(/{{#\w+}}/g,function(g){
			var id=g.replace(/{|}/g,'');
			return jQuery(id).html()||(typeof console=='object' && console.error('can`t find the inlaid template: '+id))||'';
		});
        
			str=str.replace(/{[A-z]+(\.?\w+)*}/gm,function(key){
                var val=obj;
                var arr=key.slice(1,-1).split('.');          
                for(var i=0;i<arr.length;i++){
                    //如果是this则指向代入的this, 直接赋值走向下个属性
                    if(i==0 && arr[i]=='this'){
                        val=the;
                        continue;
                    }
                    //如果属性是方法则取返回值
                    val= typeof val[arr[i]]=='function'? val[arr[i]]() :val[arr[i]]; 
                    if(val==null){
                        //break; 取消break，无属性等于''，这样还可以利用下级属性如length
                        val='';
                    } 
                }               
                return encodeTag(val,desc4null);
			});
        return str;
    }
    data = typeof data.pop=='function' ? data : [data];
    var i=0,j=data.length,sb=[];
    for(;i<j;i++){
        helper && helper(data[i],i);
        //注意这个i是当前相对第几行，而不是所有结果的第几条。要得到后者需要算上页码和页数，或后台传rownum
        sb.push(format(data[i],source).replace('{$index}',i+1));
    }
    return sb.join('');
}
//seal4quick
var $template=(function($){
    var cache={};
    return function (container,data,arg2,arg3){
        var source=$(container)[0].getAttribute('tpsource')||container;							
        if(cache[source]){ 																	
            return $(container).html($compile.apply(this,[cache[source],data,arg2,arg3]));
        }else if(source.indexOf('#')==0){ 													
            cache[source]=$(source).html();
            return $(container).html($compile.apply(this,[cache[source],data,arg2,arg3]));
        }else{
            $.get(source,function(res){
                cache[source]=res;
                $(container).html($compile.apply(this,[res,data,arg2,arg3]));
            });
        }
    }
})(jQuery);

// 这个方法和$compile一样暴露出来，供特殊情况时手动使用。
function $makeTemplate(tempstr,colsData,isHead){
    var wrapArr = isHead ? ['<thead>','','</thead>']:['<tr>','','</tr>'];
    tempstr = $compile(tempstr,colsData,'nullkey');
    isHead ||  (tempstr = tempstr.replace(/\[/g,'{').replace(/\]/g,'}'));
    wrapArr[1] =  tempstr ;
    return wrapArr.join('');
}

// 执行有权限列配置的template注入生成
var $templatePlus=(function($){
    var singleTable='<td class="{labelClass} {name}-lable">{label}</td><td class="{valClass} {name}-val">[{name}]</td>';
    var commonBody='<td class="{valClass} {name}-val">[{name}]</td>';
    var commonHead='<th class="{labelClass} {name}-lable">{label}</th>';
    var commonForm='<div class="stp-cell {name}-cell"><div class="stp-label {labelClass} {name}-lable">{label}</div><div class="stp-val {vallClass} {name}-val">[{name}]</div></div>';
    return function (container,config,data,desc4null){
                var tempHead;
                var tempBody;
                var html = '';
                if(config.type=='map'){              
                    tempBody=$makeTemplate(commonForm,config.cols);
                    html=$compile(tempBody,data);
                }else{
                    tempHead=$makeTemplate(commonHead,config.cols,true);
                    tempBody=$makeTemplate(commonBody,config.cols);
                    html=tempHead + '<tbody>'+$compile(tempBody,data)+'</tbody>'; 
                }
                $(container).html(html);
            }
})(jQuery);