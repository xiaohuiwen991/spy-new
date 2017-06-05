
//for null,undefined,number,xss and others
function $encode(str,allowHTML){
    var dic={'<':'&lt;','>':'&gt;','"':'&quot',"'":'‘',':':'：','{':'&#123;','}':'&#125;'};//&#39; &apos;
    // 数字0会做false,false做‘’处理(字符串'0'不会),需要显示0或不做为false条件则需要{i.toString}转为字符串形式
    //if($encode.zeroAsEmpty!==false && str===0){
    //    return '';
    //}
    if(str==null || str=='null' || str=='NULL' || str===0 || str===false ){
        return '';
    }
    str =  allowHTML ? String(str).replace(/\<\/?script[^\>]*\>/gmi,function(s){return s.replace(/\<|\>/gm,function($){return dic[$]})})
        : String(str).replace(/\<|\>/gm,function($){return dic[$]});
    //后台没做转义才开启，避免性能消耗
    return $encode.tranSymbol ? str.replace(/\"\'\{\}\:/gm,function($){return dic[$];}):str;
}
//core
function $compile(source,data,arg2,arg3) {
    var allowHTML;
    var helper;
    if(data==null || (typeof data.pop=='function' && data.length==0)){
        return '';
    }else if(typeof data=='object'){
        var kCount=0;
        for(var _n in data){
            _n!='_stp_helper_done_' && kCount++;
            if(kCount){break;}
        }
        if(!kCount){return ''};
    }
    data = typeof data.pop=='function' ? data : [data];
    if(typeof arg2=='boolean'){
        allowHTML=arg2;
    }else{
        typeof arg2=='function' && (helper=arg2);
        allowHTML=arg3;
    }
    var the=this;
    if(!source){
        throw new Error('source undefined! please checkout the template source,id or url!');
    }
    var format=function (obj,str){//,prefix) {
        var vuestr=function(key){
            var val=obj;
            var arr=key.split('.');
            for(var i=0;i<arr.length;i++){
                //如果是this则指向代入的this, 直接赋值走向下个属性
                if(i==0 && arr[i]=='this'){
                    val=the;
                    continue;
                }
                if(typeof val=='number' && arr[i]=='length'){
                    //val=val;
                }else{
                    val=typeof val[arr[i]]=='function'? val[arr[i]]():val[arr[i]];
                }
                if((val==null||val=='null' || val=='NULL') && typeof arr[i+1]!='undefined'){
                    val='';
                }
                //console.info('一次循环结束\n\n  ')
            }
            return $encode(val,allowHTML);
        };
        //prefix=prefix||'';
        //{{arr:#tp2}}
        str=str.replace(/&amp;&amp;/g,'&&').replace(/{{!?[A-z]+(\.?\w+)*\s?&{2}\s?#[\w\-]+}}|{{!?[A-z]+(\.?\w+)*\s?&{2}\s?[^#].+}}|{{[A-z]+(\.?\w+)*\s?:?\s?#[\w\-]+}}|{{\w*\s?:?\s?#[^#].+#}}/g,function(g){
            g=g.replace(/{{|}}/gm,'').replace(/^\s+|\s+$/gm,'');
            var d,t,e, j,_i,i=g.indexOf(':'),i2=g.indexOf('&&');
            if(i==-1 && i2==-1){
                return $(g).html()||(typeof console=='object' && console.error('can`t find the inlaid template: '+id))||'';
            }else{
                j=(g.indexOf(':')>0 && g.indexOf(':') < g.indexOf('#')) ? 1:2;
                d= j==1 ? g.slice(0,i).trim():g.slice(0,i2).trim();
                _i=j==1 ? i:i2;
                if(g.lastIndexOf('#')==g.length-1){
                    t= g.slice(_i+j).trim().slice(1,-1);
                    //t=g.slice(i+2,-1);
                }else{
                    t=$(g.slice(_i+j).trim()).html();
                }
                if(j===1){
                    return vuestr(d)?$compile.apply(this,[t,obj[d],function(item){
                        ('super' in item)  && (console.info(item) || console.warn("don't use keyword 'super' as key"));
                        item.super=obj;
                        return true;
                    },allowHTML]):'';
                }else if(d.indexOf('!')==0){
                    return vuestr(d.slice(1))?'':$compile.apply(this,[t,obj,null,allowHTML]);
                }else{
                    return vuestr(d)?$compile.apply(this,[t,obj,null,allowHTML]):'';
                }
            }
        });
        str=str.replace(/{[A-z]+(\.?\w+)*}/gm,function(key){
            key=key.slice(1,-1);
            return vuestr(key);
            //return the[key.replace(/{|}|(this)|\./g,'')];
        });
        return str;
    }

    var i=0,j=data.length,sb=[];
    for(;i<j;i++){
        typeof helper=='function' && !data[i]._stp_helper_done_ && helper(data[i],i) && (data[i]._stp_helper_done_=true);
        sb.push(format(data[i],source).replace(/\{\$rownum\}/g,i+1).replace(/\{\$index\}/g,$encode(i)).replace(/\{\$nth2\}/g,i%2==1?'nth-even':'nth-odd'));
    }
    return sb.join('');
}
//seal4quick
var $template=(function($){
    var cache={};
    return function (container,data,arg2,arg3){
        var $container=$(container);
        if(!$container.length){
            console.warn("can't find the ele:"+$container.selector);
            return $container;
        }
        var source=$container[0].getAttribute('tpsource')||(typeof container=='string'?container:'#'+$container[0].getAttribute('id'));
        if(cache[source]){
            return $container.html($compile.apply(this,[cache[source],data,arg2,arg3])).removeClass('hide');;
        }else if(source.indexOf('#')==0){
            cache[source]=$(source).eq(0).html();
            return $container.html($compile.apply(this,[cache[source],data,arg2,arg3])).removeClass('hide');;
        }else{
            $.get(source,function(res){
                cache[source]=res;
                $container.html($compile.apply(this,[res,data,arg2,arg3])).removeClass('hide');;
            });
            return $container;
        }
    }
})(window.jQuery);

window.$.fn.fixData=window.$.fn.thisData=function(data){
    return arguments.length==0?this.data('fix-data'):this.data('fix-data',data);
};
window.$.fn.template=function(data,arg2,arg3){
    return $template.apply(this.data('fix-data')||window,[this,data,arg2,arg3]);
};
$.fn.autoTemplate=function(rows,data,helper,allowHTML){
    if(!rows.length || !data.length){
        return false;
    }
    var thstr='<th class="stp-{0}-th-{1} {2}" sort-name={3}>{4}</th>';//'<th class="stp-{pid}-th-{key} {hide}" sort-name={sname}>{cname}</th>'
    var tdstr='<td class="stp-{0}-td-{1} {2}">{{3}}</td>';//'<td class="stp-{pid}-td-{key} {hide}">{{value}}</td>'
    if(typeof rows[0]=='string'){
        rows=rows.select('r=>{cname:r}');
    }
    var keys=Object.keys(data[0]);
    var len=keys.length;
    var thtp='<tr>';
    var tdtp='<tr>';
    for(var i=0;i<len;i++){
        thtp+=thstr.format(this[0].id||'',rows[i].ename||keys[i],rows[i].hide?'hideplus':'',rows[i].sname||'',rows[i].cname);//thstr.replace('{pid}',this[0].id||'').replace('{key}',keys[i]).replace('{cname}',rows[i].cname).replace('{sname}',rows[i].sname||'');
        tdtp+=tdstr.format(this[0].id||'',rows[i].ename||keys[i],rows[i].hide?'hideplus':'',rows[i].ename||keys[i]);//tdstr.replace('{pid}',this[0].id||'').replace('{key}',keys[i]).replace('{value}',keys[i]);
    }
    thtp+='</tr>';
    tdtp+='</tr>';
    if(this.find('tbody').length){
        this.find('thead').html(thtp);
        this.find('tbody').html($compile(tdtp,data,helper,allowHTML));
    }else{
        return this.html('<table><thead>{0}</thead><tbody>{1}</tbody></table>'.format(thtp,$compile(tdtp,data,helper,allowHTML)));
    }
}
/* DEMO
var rowsAttr=[ '序号','姓名','性别','年龄'];

var rowsData=[{rownum:1,name:'ave',sex:1,age:18},
              {rownum:2,name:'alice',sex:0,age:24},
              {rownum:2,name:'david',sex:1,age:24}];

$('body').autoTemplate(rowsAtrr,rowsData);

 */

/* DEMO2
var rowsAttr2=[{cname:'序号',hide:true},
               {cname:'姓名',sname:'name'},
               {cname:'性别',sname:'sex',ename:'sexTxt'},
               {cname:'年龄'}];

$('body').attr('id','pid');.autoTemplate(rowsAttr2,rowsData,function(item){
        item.sexTxt=item.sex==1?'男':'女';
});
*/

// 这个方法和$compile一样暴露出来，供特殊情况时手动使用。
var $makeTemplate=function (tempstr,colsData,isHead){
    var wrapArr = isHead ? ['<thead>','','</thead>']:['<tr>','','</tr>'];
    tempstr = $compile(tempstr,colsData,function(item){
        for(var n in item){
            item[n]=item[n]||'null';
        }
    });
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
    return function (container,config,data,allowHTML){
                var tempHead;
                var tempBody;
                var html = '';
                if(config.type=='map'){              
                    tempBody=$makeTemplate(commonForm,config.cols);
                    html=$compile(tempBody,data);
                }else{
                    tempHead=$makeTemplate(commonHead,config.cols,true);
                    tempBody=$makeTemplate(commonBody,config.cols);
                    html=tempHead + '<tbody>'+$compile(tempBody,data,allowHTML)+'</tbody>';
                }
                $(container).html(html);
            }
})(window.jQuery);

var stp={
    $encode:$encode,
    $compile:$compile,
    $template:$template,
    $templatePlus:$templatePlus,
    $makeTemplate:$makeTemplate
}
//window.extending(obj);
typeof module === "object" && typeof module.exports === "object"  && (module.exports=stp);