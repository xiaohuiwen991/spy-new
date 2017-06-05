module.exports={
        //json与string互转
        obj2str:function(obj){return typeof obj=='object'?JSON.stringify(obj):obj;},
        str2obj:function(str){return typeof str=='string'?JSON.parse(str):str;},
        dash2camel:function(str){
            var arr=str.split('-');
            for(var i= 1;i<arr.length;i++){
                if(arr[i]){
                    arr[0]=arr[0]+arr[i][0].toUpperCase()+arr[i].slice(1);
                }
            }
            return arr[0];
        },
        camel2dash:function(str){
            for(var i=1;i<str.length;i++){
                if(str[i].match(/[A-Z]/)){
                    str=str.slice(0,i)+'-'+str[i].toLowerCase()+str.slice(i+1);
                }
            }
            return str;
        },
        //简写原生选择器，支持传入第二参数iframe的document
        byid:function(id,doc){return (doc||document).getElementById(id);},
        bytag:function(tag,doc){return (doc||document).getElementsByTagName(tag);},
        //获取位置
        getRect:function(ele){return ele.getBoundingClientRect();},
        //调试
        log:function (param){typeof console!='undefined' && console.log(param);},
        info:function(param){typeof console!='undefined' && console.info(param);},
        warn:function(param){typeof console!='undefined' && console.warn(param);},
        error:function(param){typeof console!='undefined' && console.error(param);},
        logex:function(msg,cssTxt){
                //默认fontsize 18px写前面，后写的可覆盖
                cssTxt= cssTxt ? 'font-size:18px;'+cssTxt : 'font-size:18px;color:red;';
                console.log('%c'+msg,cssTxt);
            },
        //类型判断
        typeOf:(function(){
                var dic={'[object Object]':'object','[object RegExp]':'regexp','[object Date]':'date','[object Array]':'array','[object String]':'string','[object Number]':'number','[object Boolean]':'boolean','[object Error]':'error','[object Window]':'window'};
                var stringify=Object.prototype.toString;
                return function(obj,plus){
                    if(typeof obj !='object')
                        return typeof obj;
                    else if(obj===null)
                        return 'null';
                    else if(plus)
                        return dic[stringify.apply(obj)] || stringify.call(obj).slice(8,-1).toLowerCase()|| 'object';
                    else
                        return dic[stringify.apply(obj)] || 'object';
                };
                })(),
        //queryStr解析
        queryParse:function (p){
                var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]*","g"));
                if(result==null)return false;
                var j=result.length;
                var obj={},arr=[];
                for(var i=0;i<j;i++){
                    arr=result[i].slice(1).split('=');
                    obj[arr[0]]=arr[1];
                }
                return p ? obj[p]||'' : obj;
            },
        //防止百分号标签空白输出在页面上
        getJspData:function(data){
                return data||null;
            },
        replaceDDD:function(value){return value.replace(/\<ddd\>/gmi,"'");},
        //原生弹窗的封装
        open2:function(){
                var features='';
                var config={status:0,width:top.getWidth()-40,height:top.getHeight()-70,top:20,left:20,scrollbars:1,resizable:1,fullscreen:0,channelmode:0,directories:1,help:0,menubar:0,toolbar:0,location:0};
                var obj=typeof arguments[0]=='object' ? arguments[0]:{url:arguments[0],name:arguments[1],width:arguments[2],height:arguments[3],left:arguments[4],top:arguments[5]} ;
                for (var n in obj){
                    typeof obj[n]!='undefined' && (config[n]=obj[n]);
                }
                for (var m in config){
                    if(m!='url' || m!='name')
                    features += ','+ m + '=' +config[m];
                }
                //log(url +'\n'+ name +'\n'+ features.slice(1))
                var win=window.open(config.url,config.name||'_blank',features.slice(1));
                return win;
            },
        //简单加载样式 304改为走200，缓存10天
        $style:function(src,cb){
                //src.match(/^http|^\.|^\//)!=null || (src=top.path+'/style/'+src);
                src.match(/\.css$/i)!=null || (src+='.css');
                //src+='?version='+Date.format('YYYYMMDD').slice(0,-1);
                var link=document.createElement("link");
                link.rel="stylesheet";
                link.type="text/css";
                link.media="screen";
                link.href=src+(window.config.version?'?version='+window.config.version:'');
                document.head.appendChild(link);
                cb && cb.call(link);
                return link;
            },
        $script:function (src,cb){
            var bol=false;
            var tag=document.createElement("script");
            tag.type="text/javascript";
            tag.language="javascript";
            //tag.setAttribute('async','async');
            //tag.setAttribute('defer','defer');
            src.match(/\.js$/i)!=null || (src+='.js');
            tag.src=src+(window.config.version?'?version='+window.config.version:'');
            tag.onload=tag.onreadystatechange=function(){
                if(!bol&&(!tag.readyState||tag.readyState=="loaded"||tag.readyState=="complete")){
                    bol=true;
                    tag.onload=tag.onreadystatechange=null;
                    if(cb){
                        cb.call(tag);
                    }
                }
            };
            document.head.appendChild(tag);
            return tag;
        },
        importing:function(){
            var ags=arguments;
            var ag=ags[0];
            if(typeof ag!='string'){
                typeof ag=='function' && ag();
                return false;
            }
            //识别插件
            var plugins=window.config.plugins;
            if(plugins[ag]){
                ag=(top.path||'')+'/dist/plugin/'+plugins[ag];
            }
            //对应默认文件夹
            else if(ag.indexOf('/')<0){
                if(ag.match(/.*.css$/i)){
                    ag=(top.path||'')+'/dist/css/'+ag;
                }
                if(ag.match(/.*.js$/i)){
                    ag=(top.path||'')+'/dist/js/'+ag;
                }
            }
            //识别加载方式
            window[ag.match(/.*\/css\/.+|.css$/i)?'$style':'$script'](ag,function(){
                window.importing.apply(this,[].slice.call(ags,1));
            })
        }
    };