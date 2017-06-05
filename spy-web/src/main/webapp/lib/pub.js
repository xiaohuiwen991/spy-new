
//左侧折叠菜单
window.$.fn.treemenu=(function(){
    function expandMenu(){
        //event.stopPropagation();
        var ul=$(this);
        if(ul.data('showed')==1){
            ul.slideUp().data('showed',0).parent().removeClass('expanded');
        }else{
            ul.slideDown().data('showed',1).parent().addClass('expanded');
        }
    }

    function reset(treeMenu){
        //treeMenu.clearQueue();
        treeMenu.stop(true,true);
        treeMenu.children('ul').stop(true,true);
        treeMenu.width(170);
        treeMenu.data('collapsed',false);
        treeMenu.children('ul').show();
        //treeMenu.queue(function(){
        //    treeMenu.width(170).find('.tree-menu-accordion').show();
        //});
        return treeMenu;
    }
    function selectItem(event,selectHandle) {
        var li=$(this);
        event.stopPropagation();
        var src,navlink,ul,defaultInto=li.attr('default-into');

        //清空尚未完成的效果
        var treeMenu=li.closest('.tree-menu-accordion').parent();
        //reset(treeMenu);

        //所有项移除,自身加上selected
        treeMenu.find('li').removeClass('selected');
        li.addClass('selected').parents('li').addClass('selected');

        //先去找默认进入
        li.find('li').each(function(){
            var $this=$(this);
            if($this.attr('page-no')==defaultInto){
                navlink=$this.addClass('selected').children('a').eq(0);
            }
        });
        //没找到默认就打开自己内部第一个a
        navlink=navlink||li.children('a').eq(0).addClass('selected');

        //一级,设置二级selected
        if(li.hasClass('grade-1')){
            ul=li.children('ul').eq(0);
            expandMenu.call(ul);
        }
        //二级,设置一级selected,
        else{
            ul=li.parent();
            ul.parent().addClass('selected');
            (ul.data('showed')!=1) && expandMenu.call(ul);
        }

        src=navlink.attr('direct')||navlink.siblings('ul').find('li').eq(0).addClass('selected').find('a').eq(0).attr('direct');

        //与导航条联动
        rootNav.find('.nav-seconds a').each(function(){
            var $this=$(this);
            var direct=this.getAttribute('direct');
            if(direct){
                $this.removeClass('current');
            }
            if(direct==src){
                $this.addClass('current');
            }
        });
        selectHandle=selectHandle||function(){};
        //log(src)
        event.target.nodeName!=='B'&& src && selectHandle(src,this);
    }

    var hider=function($this,treeMenu,time){
        if(location.protocol=='file:'){
            treeMenu.find('.tree-menu-accordion').hide();
            treeMenu.css({width:1});
            $this.html('<b class="fs18">▶</b>');
        }else{
            treeMenu.find('.tree-menu-accordion').fadeOut(time||100,function () {
                treeMenu.animate({width:1},time||200);
                //treeMenu.dequeue();
            });
            $this.html('<b class="fs18">▶</b>');
        }


    };

    var shower=function($this,treeMenu,time){
        if(location.protocol=='file:'){
            treeMenu.css({width:170});
            treeMenu.find('.tree-menu-accordion').show();
            $this.html('◄');
        }else{
            treeMenu.animate({width:170},time||200,function(){
                treeMenu.find('.tree-menu-accordion').fadeIn(time||100);
                //treeMenu.dequeue();
            });
            $this.html('◄');
        }
    };

    var doToggle=function(parse){
        var $this=$(this);
        var lastTime=$this.data('clicked-time');
        if(lastTime && (lastTime+500>new Date().getTime())){
            return false;
        }
        var treeMenu=$this.parent();
        var collapsed=treeMenu.data('collapsed');
        collapsed ? shower($this,treeMenu) : hider($this,treeMenu);
        $this.data('clicked-time',new Date().getTime());
        treeMenu.data('collapsed',!collapsed);
        return true;
    };

    window.hideSlideMenu=function(time){top.rootTreeMenu.trigger('collapse',['hide',time]);}
    window.showSlideMenu=function(time){top.rootTreeMenu.trigger('collapse',['show',time]);}

    return function(data,selectHandle){
        var ul=$('<ul class="tree-menu-accordion" tpsource="#tree-menu-tp"></ul>');
        $template(ul,data);
        return reset(
            this.empty().append($('<p class="toggle-tag">◄</p>').click(doToggle)).append(ul)
                .find('li').click(function(eve){selectItem.apply(this,[eve,selectHandle]);}).end().on('collapse',function(eve,param,time){
                //提供给默认折叠侧菜单的控制,与hider和shower不同,不采用动画
                if(param==='hide'){
                    this.find('ul').hide().end().data('collapsed',true).find('.toggle-tag').html('<b class="fs18">▶</b>').end().animate({width:1},time||60);
                }else{
                    this.find('ul').show().end().data('collapsed',false).find('.toggle-tag').html('◄').end().animate({width:170},time||60);
                }
            })
        );
    }
})();

window.$.fn.$close=function(){
    var id=this[0].id;
    if(id && id.indexOf('root-tab')==0){
        var index=top.rootTabs.tabs('getTabIndex', this);
        top.rootTabs.tabs('close', index);
    }else {
        this.window('close');
    }
    return this;
}
window.$.fn.$select=function(){
    if(this.hasClass('panel-body')){
        var index=top.rootTabs.tabs('getTabIndex', this);
        top.rootTabs.tabs('select', index);
    }else {
        //
    }
    return this;
}

//清除linkbutton点击后的虚线
window.$.noOutline=function(selector){
    $(selector||'a').on('focus',function(){this.blur();});
};

//jQuery from 序列化扩展 将jquery系列化后的值转为name:value的形式。
//$("#form2").serializeObject() => {id:"007",age:"24""}
window.$.fn.serializeObject=function(){
    var convertArray=function (arr) {
        var i=arr.length, obj = {};
        while (i--){
            if(typeof obj[arr[i].name]=='undefined')
                obj[arr[i].name] = arr[i].value;
            else
                obj[arr[i].name] += ','+arr[i].value;
        }
        return obj;
    };
    return function(){
        return convertArray(this.serializeArray());
    };
}();
$.fn.previewBox=function(orgSrcAttr,eveType,hasWrap){
    var previewWrap=$('<div class="preview-wrap"><img/><a class="icon-remove"></a></div>').appendTo('body');
    var previewImg=previewWrap.children('img');
    this.on(eveType||'click',function(){
        var $this=$(this);
        var i=$this.index();
        var prev=$(this.parentNode).prev().children('img')[0];
        var next=$(this.parentNode).next().children('img')[0];
        //console.log(prev),console.info(next);
        var keyHandle;
        var canceler=function(){
            window.hideMask();
            previewWrap.fadeOut(150);
            $('body').off('keyup',keyHandle);
        };
        window.showMask();
        //调整图片大小
        previewImg.attr('src',this.getAttribute(orgSrcAttr||'src')).on('load',function(){
            var ratio=this.naturalHeight/this.naturalWidth;
            if(this.naturalWidth>this.naturalHeight && window.height/window.width>ratio ){
                $(this).css({width:'100%',height:'auto'});
            }else{
                $(this).css({width:'auto',height:'100%'});
            }
        });
        //监听键盘事件
        $('body').on('keyup',(keyHandle=function(event){
            if(event.keyCode==37 && prev){
                previewImg.attr('src',prev.getAttribute(orgSrcAttr||'src'));
                if(prev){
                    next=$(prev.parentNode).next().children('img')[0];
                    prev=$(prev.parentNode).prev().children('img')[0];
                }
            } else if(event.keyCode==39 && next){
                previewImg.attr('src',next.getAttribute(orgSrcAttr||'src'));
                if(next) {
                    prev=$(next.parentNode).prev().children('img')[0];
                    next=$(next.parentNode).next().children('img')[0];
                }
            } else if(event.keyCode==13 || event.keyCode==27){
                canceler();
            }
        }));
        //显示并注册关闭事件
        previewWrap.show().click(canceler);
    });
};
window.getting({
    currentTab:function(){return top.rootTabs.tabs('getSelected');},
    currentTabWin:function(){return top.$('.tabs-panels>.panel:not(hide)').find('.tab-content-frame')[0].contentWindow;}
});

module.exports={
    //----------------基于jquery的拓展------------------
    showLoading:function (needMask){
        var loading=$('.loading-mask');
        (loading.length) || (loading=$('<div class="loading-mask"><div class="loading"><i class="icon-spinner"></i><p>加载中...</p></div></div>').appendTo('body'));
        return loading[needMask===false?'addClass':'removeClass']('transparent').show();
    },
    hideLoading:function(){
        return $('.loading-mask').fadeOut(150);
    },
    showMask:function (){
        var mask=$('.common-mask.preview-mask');
        (mask.length) || (mask=$('<div class="common-mask preview-mask">'));
        return mask.appendTo('body').show();
    },
    hideMask:function(){
        return $('.common-mask.preview-mask').fadeOut(150);
    },

    //吐司消息
    toast:function(str){
        var holding;
        var callback;
        var itv;
        var done;
        str=String(str);
        var bol= str.length>15;
        var len= bol ? str.length : 15;
        if(typeof arguments[1]=='number'){
            holding=arguments[1];
            typeof arguments[2]=='function' && (callback=arguments[2]);
        }else if(typeof arguments[1]=='function'){
            callback=arguments[1];
        }
        // 根据文字长度增加延时, 限制最高秒数
        holding= holding || 1600+(len-15)*30;
        var p=jQuery('<div><p>str</p></div>'.replace('str',str));
        var fadeOut=function(){
            if(!done){
                jQuery('.the-mask').remove();
                p.animate({'opacity':0},500,function(){callback && callback(p);p.remove();});
                done=true;
            }
        };
        jQuery('.toast').hide();
        jQuery('body').click(fadeOut);
        // 预制样式
        return  p.addClass('toast').appendTo('body')
            //透明度 文字居中居左判断
            .css({'text-align':bol?'left':'center'})
            // 移入暂停
            .bind('mouseenter',function(){clearTimeout(itv);})
            .bind('mouseleave',function(){itv=setTimeout(fadeOut,200);})
            // 增加icon
            .extend({
                ok:function(){return p.addClass('ok');},
                err:function(){return p.addClass('err');},
                warn:function () {return p.addClass('warn');}
            })
            // 显示
            .fadeIn(function(){
                itv=setTimeout(fadeOut,holding||900);
            });
    },
    //tab控件
    tabsInit:function (selector){
        $(selector||document.body).find('.tabs-list').find('li').on('click', function(event) {
            var tabsList = this.parentNode//$('.tabs-list');
            var tabsWrap = tabsList.parentNode;//$('.tabs-wrap');
            tabsList.find('.current').removeClass('current');
            tabsWrap.find('.tabs-content').hide();
            $(this).addClass('current');
            $(this.getAttribute('direct')).show();
        });
    },
    //--------------基于eui的扩展----------------
    // 弹窗
    $open:function(str,params,isAjax,cb){
        var maxWidth=window.innerWidth-30;
        var maxHeight;
        var maxobj,maxobj2;
        var fixBtn = function (ele) {
            var formBtn,eleForm,scrollHeight,eleHeight;
            var eleMouseMove = function (ele,formBtn) {
                ele.on('mousemove',function (e) {
                    if(e.pageY>ele.outerHeight()-20 && e.pageY<=ele.outerHeight()+30){
                        formBtn.addClass('win-btn-wrap').find('p').addClass('win-btn-helper');
                    }else{
                        formBtn.removeClass('win-btn-wrap').find('p').removeClass('win-btn-helper');
                    }
                });
            };
            formBtn = ele.find('.form-btn-div');
            eleForm = ele.find('form');
            if(formBtn.length>0){
                if(formBtn.offset().top>=0) {
                    eleMouseMove(ele,formBtn);
                }else{
                    ele.off('mousemove');
                }
                scrollHeight = ele.scrollHeight ? ele.scrollHeight : eleForm[0].scrollHeight;
                eleHeight = ele.height();
                ele.on('scroll',function () {
                    if(ele.scrollTop()>scrollHeight-eleHeight-38){
                        ele.off('mousemove');
                    }else{
                        eleMouseMove(ele,formBtn);
                    }
                });
            }
        };
        //简写小,中,大 3种尺寸
        if(params=='s' || params=='S'){
            params={width:360};
        }else if(params=='m' || params=='M'){
            params={width:640};
        }else if(params=='l' || params=='L'){
            params={width:920};
        }
        else if(typeof params=='string'){
            return window.$append.apply(this,[str,params,arguments[2]]);
        }

        //默认不可缩小拉伸,模态显示,允许滚动条,空白标题
        ('maximizable' in params) || (params.maximizable=false);
        ('minimizable' in params) || (params.minimizable=false);
        ('collapsible' in params) || (params.collapsible=false);
        ('resizable' in params) || (params.resizable=false);
        ('scroll' in params) || (params.scroll=true);
        ('modal' in params) || (params.modal=true);
        ('cache' in params) || (params.cache=false);
        ('doSize' in params) || (params.doSize=true);
        ('shadow' in params) || (params.shadow=false);
        ('title' in params) || (params.title=' ');
        ('height' in params) || (params.height='auto');
        ('mask' in params) || (params.mask='top');
        ('style' in params) || (params.style={});//'max-height':window.height-20+'px', 'max-width':window.width-20+'px'});

        window===top && (params.mask='no-need-help');

        if(params.mask=='top'){
            top.showHelpMask(window.width+30>top.width);
            $('body').addClass('overflowHidden');
            document.body.clientHeight>window.height && $('body').addClass('holdScrollWidth');
            var fn=params.onClose;
            params.onClose=function(){
                typeof fn=='function' && fn();
                top.hideHelpMask();
                $('body').removeClass('overflowHidden').removeClass('holdScrollWidth');
            };
            params.top=params.top||5;
            maxHeight=window.innerHeight-25;
            params.style['margin-left']=getRect(top.rootTreeMenu[0]).width/-2;
        }else{
            params.top=params.top||Math.min((window.innerHeight-~~params.height)/2,40);
            maxHeight=window.innerHeight-65;
        }
        maxobj={maxWidth:maxWidth,maxHeight:maxHeight};
        maxobj2={maxWidth:maxWidth-20,maxHeight:maxHeight-46,visibility:'visible'};
        //先分辨是已有元素还是自动生成后ajax加载html或iframe的元素,随后启动,并返回句柄
        var ele;
        if(str.indexOf('#')==0 ){
            ele=$(str);
            //ele.hasClass('window-body') && ele.hasClass('window-body,pannel-body') && ele.unwrap();
            //eui会缓存生成后的弹窗结构及位置, 因此要重置水平居中 ,来防止两次点击弹窗期间窗口大小变化引起的居中位置失准
            // return ele.css({visibility:'hidden'}).show().window(params).window('hcenter').css(maxobj2).parent().addClass('animated fadeInDown').css(maxobj).end();
            ele.css({visibility:'hidden'}).show().window(params).window('hcenter').css(maxobj2).parent().addClass('animated fadeInDown').css(maxobj).end();
            // fixBtn(ele);
            return ele;
        }else if(isAjax){
            ele=$('<div class="e-win-wrap" dynamic>').css({overflow:params.scroll ? 'auto':'hidden'});
            return ele.window(params).css(maxobj2).load(str,cb).parent().addClass('animated fadeInDown').css(maxobj).end();
        }else{
            var id=''+Date.format('MMDDhhmmssS');
            ele=$('<div class="e-win-wrap overhide" dynamic win-id="{1}"><iframe scrolling="{0}" win-id="{1}"></iframe></div>'.format(params.scroll ? 'auto':'no',id));
            return (top._mol_wins[id]=ele.window(params).css(maxobj2).find('iframe').attr('src',str).end().parent().addClass('animated fadeInDown').css(maxobj).end());
        }
    },
    // 单确定框
    _$alert:function(param){
        var title='提示',icon='info',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            icon=param.icon||icon;
            cb=param.callback||cb;
            msg=param.msg;
        }
        jQuery.messager.alert(title,msg,icon,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return Math.max(100,parseInt(v,10)-60);});
        $.noOutline();
    },
    // 二选一确认框
    _$confirm:function(param){
        var title='提示',cb=function(){},msg;
        if(typeof param!='object'){
            msg=param;
            cb=arguments[1]||cb;
        }else{
            title=param.title||title;
            cb=param.callback||cb;
            msg=param.msg;
        }
        jQuery.messager.confirm(title,msg,cb);
        jQuery('.messager-window, .messager-window+.window-shadow').css('top',function(i,v){return Math.max(100,parseInt(v,10)-60);});
        $.noOutline();
    },
    $alert:function(){
        return top._$alert.apply(this,[].slice.call(arguments));
    },
    $confirm:function(){
        return top._$confirm.apply(this,[].slice.call(arguments));
    },
    // 自动关闭提示框
    $show:function(str){
        jQuery.messager.show({
            title:'提示',
            msg:str,
            showType:'fade',
            timeout:1500,
            showSpeed:500,
            width:220,
            height:120,
            style:{
                right:'50%',
                top:'50%',
                margin:'-120px -110px 0  0 '
            }
        });
        $.noOutline();
    },
    //右下角消息通知
    $msg:function(ops){
        typeof ops=='string' && (ops={msg:ops});
        $.messager.show({
            title:ops.title||'<i class="icon-envelope-alt"></i> 新消息提醒',
            msg:ops.msg,
            timeout:ops.timeout||8000,
            width:ops.width||380,
            height:ops.height||210,
            showType:'slide'
        }).closest('.window').addClass('corner-msg '+ (ops.className||''));
    },
    $close:function(isTag){
        if(isTag){
            //关闭整个当前标签页
            var rootTabs=top.rootTabs||top.$('#root-tabs');
            var tab = rootTabs.tabs('getSelected');
            if (tab){
                var index = rootTabs.tabs('getTabIndex', tab);
                index!==0 && rootTabs.tabs('close', index);
            }
        }else{
            //关闭包含本iframe的模态窗
            var ifr=window.iframe;
            if(ifr){
                var win=top._mol_wins[ifr.getAttribute('win-id')];
                win && win.window('close');
            }
        }
    },
    $select:function(){
        var wraper=$(this.iframe).parentsUntil('.panel','.panel-body');
        return wraper.$select();
    },
    $append:function(src,label,iconCls,closable){
        var rootTabs=top.rootTabs||top.$('#root-tabs');
        //给新页签注册一个id
        var id='root-tab-'+new Date().getTime();
        //把调用窗口登记到全局
        var openerId='opener-'+id;
        top._opener_wins[openerId]=this;
        var addTab=function(id){
            rootTabs.tabs('add',{
                title: label,//'Tab'+index,
                id:id,
                content:'<iframe class="tab-content-frame" src="{0}" opener-id="{1}" frameborder="0"></iframe>'.format(src,openerId),
                iconCls:iconCls||null,//'icon-reload',
                closable: closable!==false
            });
        };
        if(rootTabs.tabs('tabs').length>(parseInt(window.config.maxTabCount)||9)){
            top.$confirm('页签窗口过多!<br>将关闭最先打开的页签, 再打开新窗口。<br>是否继续?',function(res){
                if(res) {
                    rootTabs.tabs('close', 1);
                    addTab(id);
                }
            });
        }else{
            addTab(id);
        }
        return top.$('#'+id);
    },
    $ajax:function(url,params,cb,jsonStrWrap,type,beforeSend,complete,msgIcon){
        params=params||{};
        var voidFn=function(){};
        if(beforeSend===false){
            beforeSend=voidFn;
        }else if(typeof beforeSend!='function'){
            beforeSend=function () {showLoading();};
        }
        if(beforeSend==voidFn){
            complete=voidFn;
        }else{
            complete=typeof complete=='function'?complete:function(){hideLoading()};
        }
        jsonStrWrap && (params={jsonStr: obj2str(params)});

        typeof params =='object' && (params.token=top.token);

        //if(type!=='GET'){
           //params=obj2str(params);//post时避免自动将参数序列化为a=1&b=2的形式
        //}
        return $.ajax({
                    type: type || "POST",
                    url: url,
                    //contentType: "application/json; charset=UTF-8",
                    dataType: 'json',
                    data: params,
                    beforeSend: beforeSend,
                }).always(function(res,status){
                        var msgFunc = '';
                        complete();
                        if(status == 'success'){
                            if(res.flag==1){
                                typeof cb=='function' && cb(res);
                            }else if(res.flag==0){
                                msgFunc = (typeof msgIcon == 'string' && res.msg)? msgIcon : 'err';
                                toast(' '+res.msg||'后台请求失败')[msgFunc]();
                                warn('ajax请求失败!\n请求路径为:{0}\n请求参数为:{1}\n后台返回的错误信息为:{2}'.format(url,obj2str(params),res.msg||''));
                            }else if(res.flag==-1){
                                top.location.replace('http://'+top.location.host+'/intoLogin');
                            }
                        }else{
                            toast('请求失败或超时,请检测后台方法或网络连接').err();
                        }
                });
    },
    $post:function(url,params,cb,jsonStrWrap,beforeSend,complete,msgIcon){
        return $ajax(url,params,cb,jsonStrWrap,'POST',beforeSend,complete,msgIcon);
    },
    $get:function(url,params,cb,jsonStrWrap,beforeSend,complete,msgIcon){
        return $ajax(url,params,cb,jsonStrWrap,'GET',beforeSend,complete,msgIcon);
    },
    action2link:function(action){return action+'?token='+top.token;},
    /**
     * Created by XiongYing on 2016/5/21.
     *生成当前位置  <span>※ </span><span color="#265EA9">当前位置：基础信息管理 ></span> 实施项目管理
     * @parameter obj:有如下属性的对象：
     * icon:当前位置前面的符号或者图标
     * pTitle:当前页面的父页面名称数组
     * cTitle:当前页面名称
     */
    createCurrentPosition:function (obj){
        obj = obj?obj:{};
        var icon = obj.icon?obj.icon:'※',
            pTitle = obj.pTitle?obj.pTitle:[],
            cTitle = obj.cTitle?obj.cTitle:document.title,
            parentTitles = '',
            i = 0,
            positionHtml = '';
        for(;i<pTitle.length;i++){
            parentTitles += pTitle[i] + ' > ';
        }
        positionHtml = '<span>{icon}</span> 当前位置: {parentTitles}{cTitle}'.replace(/{\w*}/g,function(match){
            switch(match){
                case '{icon}':
                    return icon;
                case '{parentTitles}':
                    return parentTitles;
                case '{cTitle}':
                    return cTitle;
            }
        });
        $('#current-position').prepend(positionHtml);
    },
    //内容在4行内的不显示“更多”
    isShowMore:function (){
        var letterNum = 140;
        var letterLine = 4;
        var showMore = function (el,letterNum) {
            var elHtml = el.innerHTML.replace(/\n/gm,'<br>'),
                letterNum = letterNum,
                elBriefHtml = '',
                elHtmlLen = elHtml.length,
                $el = $(el),
                $aObj = $el.next(),
                moreId = $aObj.attr('moreId'),
                mt = elHtml.match(/<br/gm),
                mtLen = mt ? mt.length : 0,
                // reg = new RegExp('(?:[^<br>^<br/>]*<br\/?>){n}'.replace('n',letterLine.toString())),
                brHtml = '',
                brHtmlLen = 0,
                htmlArr = [],
                i = 0;
            
            if(mt && mtLen > letterLine){
                htmlArr = elHtml.split(/<br>|<br\/>/gm);
                if(htmlArr.length>=letterLine){
                    for(;i<letterLine;i++){
                        brHtml = brHtml.concat(htmlArr[i]+'<br>');
                    }
                    brHtmlLen = brHtml ? brHtml.length : 0
                }
            }
            // if(elHtmlLen>letterNum ){//|| (mt && mt.length > 3)
            //     elBriefHtml = elHtml.substring(0,letterNum);
            //     $el.html(elBriefHtml);
            //     $aObj.show();
            //     $aObj.on('click',function () {
            //         toggleMore(this,moreId,letterNum,elHtml,elBriefHtml);
            //     });
            // }
            if( elHtmlLen>letterNum || (mt && mtLen > letterLine)){
                if(elHtmlLen > letterNum && mt && mtLen > letterLine){
                    elBriefHtml = brHtmlLen > letterNum ? elHtml.substring(0,letterNum): brHtml;
                }else if (elHtmlLen > letterNum && (mt && mtLen <= letterLine) || !mt){
                    elBriefHtml = elHtml.substring(0,letterNum);
                }else if (elHtmlLen <= letterNum && mt && mtLen > letterLine){
                    elBriefHtml = brHtml;
                }
                $el.html(elBriefHtml);
                $aObj.show();
                $aObj.on('click',function () {
                    toggleMore(this,moreId,letterNum,elHtml,elBriefHtml);
                });
            }
        };
        $('p.brief-content').each(function(index,el){
            showMore(el,letterNum);
        });
        letterNum = null;
    },
    //显示更多、收起
    toggleMore:(function () {
        var isShow = [];//isShow = [{id:'1u',show:true},{id:'2c',show:false}];
        return function (obj,id,letterNum,elHtml,elBriefHtml) {
            var isShowLen = isShow.length,
                moreId = id,
                isMatch = false,//默认false,没有点击过,isShow数组里没有它的id
                i=0,
                obj = $(obj);
            
            for(;i<isShowLen;i++){
                if(isShow[i].id === moreId){
                    if(isShow[i].show){
                        obj.text('收起').prev().html(elHtml);
                        isShow[i].show = false;
                    }else{
                        obj.text('更多').prev().html(elBriefHtml);
                        isShow[i].show = true;
                    }
                    isMatch = true;
                }
            }
            if(!isMatch){
                obj.text('收起').prev().html(elHtml);
                isShow.push({id:moreId,show:false});
            }
        };
    })()
};
