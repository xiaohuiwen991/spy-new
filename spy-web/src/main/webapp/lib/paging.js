 (function($){
    //计算器 计算页数和各页的begin和end
	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	};
    
	$.extend($.PaginationCalculator.prototype, {
		numPages:function() {
			return Math.ceil(this.maxentries/this.opts.pageOnce);
		},
		getInterval:function(currentPage)  {
			var ne_half = Math.floor(this.opts.num_display_entries/2);
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = currentPage > ne_half ? Math.max( Math.min(currentPage - ne_half, upper_limit), 0 ) : 0;
			var end = currentPage > ne_half?Math.min(currentPage+ne_half + (this.opts.num_display_entries % 2), np):Math.min(this.opts.num_display_entries, np);
			return {start:start, end:end};
		}
	});
	
    //生成器 生成单个或多个页码链接
	$.PaginationRenderers = {};
	
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	};
	$.extend($.PaginationRenderers.defaultRenderer.prototype, {
		createLink:function(page_id, currentPage, appendopts){
			var lnk, np = this.pc.numPages();
			page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
			appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
			if(page_id == currentPage){
				lnk = $("<span class='current'>" + appendopts.text + "</span>");
			}
			else
			{
				lnk = $("<a>" + appendopts.text + "</a>")
					.attr('href', this.opts.link_to.replace(/__id__/,page_id));
			}
			if(appendopts.classes){ lnk.addClass(appendopts.classes); }
			if(appendopts.rel){ lnk.attr('rel', appendopts.rel); }
			lnk.data('page_id', page_id);
			return lnk;
		},
		// Generate a range of numeric links 
		appendRange:function(container, currentPage, start, end, opts) {
			var i;
			for(i=start; i<end; i++) {
				this.createLink(i, currentPage, opts).appendTo(container);
			}
		},
		getLinks:function(currentPage, eventHandler) {
			var begin, end,
				interval = this.pc.getInterval(currentPage),
				np = this.pc.numPages(),
				//fragment = $("<div class='pagination'></div>");
				fragment = $("<div>");
			
			// Generate "Previous"-Link
			if(this.opts.prev_text && (currentPage > 0 || this.opts.prev_show_always)){
				fragment.append(this.createLink(currentPage-1, currentPage, {text:this.opts.prev_text, classes:"prev",rel:"prev"}));
			}
			// Generate starting points
			if (interval.start > 0 && this.opts.num_edge_entries > 0)
			{
				end = Math.min(this.opts.num_edge_entries, interval.start);
				this.appendRange(fragment, currentPage, 0, end, {classes:'sp'});
				if(this.opts.num_edge_entries < interval.start && this.opts.ellipse_text)
				{
					$("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
			}
			// Generate interval links
			this.appendRange(fragment, currentPage, interval.start, interval.end);
			// Generate ending points
			if (interval.end < np && this.opts.num_edge_entries > 0)
			{
				if(np-this.opts.num_edge_entries > interval.end && this.opts.ellipse_text)
				{
					$("<span>"+this.opts.ellipse_text+"</span>").appendTo(fragment);
				}
				begin = Math.max(np-this.opts.num_edge_entries, interval.end);
				this.appendRange(fragment, currentPage, begin, np, {classes:'ep'});
				
			}
			// Generate "Next"-Link
			if(this.opts.next_text && (currentPage < np-1 || this.opts.next_show_always)){
				fragment.append(this.createLink(currentPage+1, currentPage, {text:this.opts.next_text, classes:"next",rel:"next"}));
			}
			$('a', fragment).click(eventHandler);//所以那个return continuePropagation并没有什么软用
			return fragment;
		}
	});
	
	// 这个方法是直接发动在分页条元素上，并非整个列表容器
	$.fn._pagination = function(maxentries, opts){
		
		// Initialize options with default values
		opts = $.extend({
			pageOnce:15,
			num_display_entries:11,
			currentPage:0,
			num_edge_entries:0,
			link_to:"javascript:void(0);",
			prev_text:"上一页",
			next_text:"下一页",
			ellipse_text:"...",
			prev_show_always:true,
			next_show_always:true,
			renderer:"defaultRenderer",
			show_if_single_page:false,
			loadFirstPage:true,
			callback:function(){return false;}
		},opts||{});
		
		var containers = this, renderer, links, currentPage;
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function paginationClickHandler(evt){
			//jQuery("#loadingBar").text('加载中...请稍候');
			var links, 
				newCurrentPage = $(evt.target).data('page_id'),
				continuePropagation = selectPage(newCurrentPage);
			if (!continuePropagation) {
				evt.stopPropagation();
			}
			return continuePropagation;
		}
		
		function selectPage(newCurrentPage) {
			// update the link display of a all containers
			containers.data('currentPage', newCurrentPage);
			links = renderer.getLinks(newCurrentPage, paginationClickHandler);
			containers.empty();
			links.appendTo(containers);
			// call the callback and propagate the event if it does not return false
			var continuePropagation = opts.callback(newCurrentPage, containers);
			return continuePropagation;
		}
		
		// -----------------------------------
		// Initialize containers
		// -----------------------------------
		currentPage = parseInt(opts.currentPage, 10);
		containers.data('currentPage', currentPage);
		// Create a sane value for maxentries and pageOnce
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.pageOnce = (!opts.pageOnce || opts.pageOnce < 0)?1:opts.pageOnce;
		
		if(!$.PaginationRenderers[opts.renderer])
		{
			throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
		
		// Attach control events to the DOM elements
		var pc = new $.PaginationCalculator(maxentries, opts);
		var np = pc.numPages();
		containers.off('setPage').on('setPage', {numPages:np}, function(evt, page_id) { 
				if(page_id >= 0 && page_id < evt.data.numPages) {
					selectPage(page_id); return false;
				}
		});
		containers.off('prevPage').on('prevPage', function(evt){
				var currentPage = $(this).data('currentPage');
				if (currentPage > 0) {
					selectPage(currentPage - 1);
				}
				return false;
		});
		containers.off('nextPage').on('nextPage', {numPages:np}, function(evt){
				var currentPage = $(this).data('currentPage');
				if(currentPage < evt.data.numPages - 1) {
					selectPage(currentPage + 1);
				}
				return false;
		});
		containers.off('currentPage').on('currentPage', function(){
				var currentPage = $(this).data('currentPage');
				selectPage(currentPage);
				return false;
		});
		

		links = renderer.getLinks(currentPage, paginationClickHandler);
		containers.empty();
		if(np > 1 || opts.show_if_single_page) {
			links.appendTo(containers);
		}
        
		if(opts.loadFirstPage) {
			//config中一路传过来的newSearch在此时会传入，也只有loadFirstPage时有机会传第三个参数，确保了selectPage时为false
			//2016.07.18改为直接传true;
			opts.callback(currentPage, containers, true);//opts.newSearch);
		}
	}; 
	

	//paging是利用pagination的封装。 在含有paging分页条的母容器上发动。总数count作为option的一部分传入，而callback从option中拿出单独传入。
 	$.fn.paging = function(config,clickHandle) {
 			typeof config=='number' && (config={count:config});
 			var pageOnce=config.pageOnce=config.pageOnce||15;
 			var currentPage = config.currentPage||0;
		    var $this = $(this);
		    var opts = {
				pageOnce:pageOnce,
				loadFirstPage:config.loadFirstPage!==false,
				num_display_entries:10,
				num_edge_entries:2,
				currentPage:currentPage,
				callback: function(pageIndex, jq, newSearch){  //这个jq并无卵用,可以随时用jquery取到的分页条对象
		    		var begin = pageIndex * pageOnce;
				    var end   = Math.min((pageIndex+1) * pageOnce, config.count);
				    //执行保存了查询条件,只更改页码条件的搜索
		    		clickHandle((begin+1),end,newSearch,pageIndex,pageOnce, config.count);//这个newSearch在整个pagination里只有loadFirstPage时会传递，确保selectPage时为false
					!newSearch && config.autoHash!==false && (jq.parent()[0].scrollIntoView());//(location.href = location.pathname+'#'+ (jq.parent().attr('id')||'') );
				}
			};
            //发动容器内的.paging子元素是分页条元素，对其执行pagination
			$this.find('.paging')._pagination(config.count,opts);
            //发动容器内的.total-count元素显示总条数，.table-name元素显示列表名（如果有配置的话将替换原来html中的表名）
            $this.find('.total-count').html(config.count);
	        config.name && $this.find('.table-name,.list-name').html(config.name);
            //设置好描述文字后，表头条可以显示出来
			$this.find('.list-title-bar').show();
			return $this;
	};
	
	/* 用css inline-block结合IE7 hack *+html .paging div{ display:inline}解决，避免每次callback生成html后调用setFitWidth()
	function setFitWidth($this){
		var left=$this.find('.paging .prev').eq(0).offset().left;
		var right=$this.find('.paging .next').eq(0).offset().left+60;
		$this.find('.paging>div').width(right-left);
	}
	*/ 
    
    //pagingList——基于paging的restful再包装， paging处理同步(本地已有数据)情况下的分页，而pagingList是集合了ajax请求、本地缓存、paging分页的合体
		var localCache={};
		//localCache.size=0;
		var paged=false;
		var commonHTML='<div class="new-color-bar list-title-bar"> <b>▌</b><u class="table-name"></u><span class="table-desc">共查找到<u class="total-count"></u>条数据</span></div>'+
						'<div class="search-result"  tpsource="#search-result-tp"></div>'+
						'<div class="paging"></div>';
		var exeAjaxEvent=function(eveType,the){
			typeof the.data('ajax'+eveType)=='function' && the.data('ajax'+eveType)();
		};
		var checkCache=function(cacheMax,cacheOnce,pageOnce){
			var msg='';
			//缓存设置必须检测下有效性
			if (typeof cacheOnce!='number' || typeof cacheMax!='number') {
				msg='缓存参数设置错误，非数字！';
			}
			//单次缓存确保不超过最大缓存
			if( cacheOnce>cacheMax){
				msg='缓存参数设置错误，单次缓存数大于总体缓存数!';
			}
			//单次缓存确保不低于单页条数
			if(cacheOnce < pageOnce){
				msg='缓存参数设置错误，单次缓存数小于单页条数!';
			};
			if(msg){
				throw new Error(msg+' cacheMax,cacheOnce,pageOnce: '+[cacheMax,cacheOnce,pageOnce].join(','));
			}
			return true;
		};
		var resetCache=function(id){
			localCache[id] = [];
			localCache[id].size = 0;
			localCache[id].time = new Date().getTime();
		};
		//var setCache=function(useCache,cacheMax,data,newSearch,sectionBegin){
		var setCache=function(id,cacheMax,data,reset,_begin){
			_begin=_begin||1;
			//newSearch或超过缓存极限时重置
			if (reset || (localCache[id].size + data.length > cacheMax)) {
				resetCache(id);
			}

			//对应放入,localCache的index对应整体数据的index
			for (var i = data.length - 1; i > -1; i--) {
				//localCache[sectionBegin + i] = data[i];
				localCache[id][_begin-1 + i] = data[i];
			}

			localCache[id].size+=data.length;
			return true;
		};
		$.fn.setCache=function(data,_begin,reset,cacheMax){
			var id=this[0].id||this.attr('cache-id');
			setCache(id,cacheMax||500,data,reset!==false,_begin||1);
			return $(this);
		};
		//pagingList只接收一个对象做参数
		 $.fn.pagingList=function(config) {
			 //为了一页多个缓存,cache必须挂在自身标识
			 var id=this[0].id||this.attr('cache-id');
			 localCache[id]=[];
			 localCache[id].size=0;

			//第一次启动的变量全部保存起来,默认就是newSearch
            var $this = this,
				newSearch = config.newSearch !== false,
				useCache = config.useCache !== false,
				cacheMax = config.cacheMax || 120,
				cacheOnce = config.cacheOnce || 60,
				pageOnce = config.pageOnce || 15,
				begin = config.begin||1,
				end = config.end||(begin-1+pageOnce),
			
				name = config.name,
                //一查通默认向yctPostAction请求，其他可传自定义的action
				action = config.action || window.yctPostAction,
                //jsonObj是整个参数集合打包，并包括了跨域转接url，后台无对应接收的忽略此参数
				jsonObj = config.jsonObj || window.jsonObj || {},
                //如果不是用jsonObj把参数打包再转为jsonStr单参数传递的话，可以自定义params，是一个键值对对象，后台可以按键一一接收
				params = config.params,
				//callback是每次取回单页数据的回调，一般就是代入数据生成html
				callback = config.callback,
                //默认是用post
				method = config.method || 'post';
				
				config.commonHTML && $this.html(commonHTML);//如果发动容器为空，注明commonHTML，newSearch时生成默认html结构


			//该函数就是一个restful封装
			var remote=function(cb,reset,_begin,_end){
				//if(!confirm(jsonObj.begin+' - '+jsonObj.end))return false;
				jsonObj['begin']= _begin;
				jsonObj['end']  = useCache ? _begin-1+cacheOnce : _end;
				exeAjaxEvent('Begin',$this);
				params=params||{};
				params.token=top.token;
				//params.begin=jsonObj.begin,params.end=jsonObj.end;
				$[method](action, $.extend({jsonStr: obj2str(jsonObj)}, params)).always(function (res, status) {
					exeAjaxEvent('End',$this);
					if (status == 'success') {
						if(res.length && res.length>2048*100 || (res.data && res.data.length>500)){
							warn("result's length too long, check the end－bengin,or other params wrong？");
							return false;
						}
						res=str2obj(res);
						if(res.flag == 1){
							useCache && setCache(id,cacheMax,res.data,false,jsonObj['begin']);
							cb(res);
						} else if (res.flag == -1) {
							top.location.replace('http://'+top.location.host+'/intoLogin');
						} else {
							//参数错误等
							toast(res.msg||'后台请求失败').err();
							warn('ajax请求失败!\n请求路径为:{0}\n请求参数为:{1}\n后台返回的错误信息为:{2}'.format(action,obj2str($.extend({jsonStr: obj2str(jsonObj)}, params)),res.msg||''));
						}
					}else{
						warn('请求地址错误或网络问题');
					}
				});
			};
			var pageHandle=function(_begin,_end,newSearch,pageIndex,pageOnce,totalCount){
				if(config.count==0){
					//利用callback生成空内容, 清理旧的内容
					callback([], _begin,_end,newSearch,pageIndex,pageOnce,totalCount);
				}
				//有缓存
				else if (localCache[id][_begin - 1] && localCache[id][_end - 1] && localCache[id].time+3*60*1000>new Date().getTime()) {
					//（newSearch为true时会清缓存，所以跑到这里newSearch一定是false,所以直接传false了）
					callback(localCache[id].slice(_begin - 1, _end), _begin, _end, false, pageIndex,pageOnce,totalCount);
				}else{
					remote(function(res){
						//callback(useCache ? localCache.slice(_begin - 1, _end):res.data, _begin,_end,newSearch,pageIndex,pageOnce);//更改了callback参数列表
						callback(res.data.slice(0,pageOnce), _begin,_end,newSearch,pageIndex,pageOnce,totalCount);//更改了callback参数列表
					},newSearch,_begin,_end);
				}
			};

			//准备就绪，开始
			checkCache(cacheMax,cacheOnce,pageOnce);

			newSearch && resetCache(id);
			
			if(config.count){
				$this.paging(config,pageHandle);
			}else{
				remote(function(res){
					//config.loadFirstPage=false;
					config.count=res.totalCount;
					if(useCache){
						$this.paging(config,pageHandle);
					}else{
						config.loadFirstPage=false;
						$this.paging(config,config,pageHandle);
						//由于无缓存时,当前的res.data需要在此立刻使用, 取消了第一页自动点击,因此在这里要走一个第一页的callback
						callback(res.data, begin,end,newSearch,0,pageOnce,config.count);
					}

					//pagingHandle(begin,end,newSearch);
					//loadFirstPage的机制是pagination自动执行第一页的handle，但这样无法区分newSearch，因此关闭，改为手动执行(另一方式，config传递到pagination，执行一次callback后设置为false)
				},newSearch,begin,end);
			}


			 var sortFn=function(config){
				 var sortName = this.getAttribute('sort-name');
				 var sortOrder = this.getAttribute('sort-order')||'asc';
				 if(!sortName){return false;}
				 config.jsonObj.sortName=sortName;
				 config.jsonObj.sortOrder=sortOrder;
				 $this.pagingList(config);
				 if(this.getAttribute('sort-order')=='desc'){
					 this.setAttribute('sort-order','asc');
					 //目前只支持单字段排序,因此移除其他排序标识
					 $this.find('.sort-arrow').remove();
					 $(this).append('<b class="sort-arrow">▼</b>');//('<i class="icon-caret-down sort-arrow"></i>');
				 }else{
					 this.setAttribute('sort-order','desc');
					 $this.find('.sort-arrow').remove();
					 $(this).append('<b class="sort-arrow">▲</b>')//('<i class="icon-caret-up sort-arrow"></i>');
				 }
			 }
			 //排序事件只注册一次,防止递归多次调用
			 //if($this.data('sortReged')!=1){
			 // 其实应该多次注册,newSearch清除上次残留
			 if(newSearch){
				//$this.data('sortReged',1);
				$this.find("[sort-name]").off('click').click(function(){
					sortFn.call(this,config);
				});
			}
			return $this;
		};
		 
})(window.jQuery);
 
 
// $('#userTable').paging(97,function(begin,end){})
 
//$('#userTable').pagingList({
    //begin:1,
    //end:15,
    //callback:generateForPerson,
    //newSearch:true
    //pageOnce:15,
    //useCache:true,
    //cacheOnce:60,
    //cacheMax:120,
    //name:'人员列表'
    //action:yctPostAction,
    //jsonObj:jsonObj,
    //commonHTML:false
//});
    
    
