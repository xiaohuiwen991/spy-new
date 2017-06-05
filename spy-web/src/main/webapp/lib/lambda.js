
    //lambda临时委托方法工厂
    var $lambda=window.$lambda=function(foo){
        var str,i,param,body;
        if(!foo){
            return function(x){return x};   
        }else if(typeof foo=='function'){
            return foo;
        }else if(foo.source){
            str=foo.source.replace(/^\s+|\s+$/g,'');;
        }else{
            str=foo.replace(/^\s+|\s+$/g,'');
        }
            
        //开始解析函数字符串
        var i=str.indexOf('=>');
        if(i==-1)  {
            return new Function(str);
        }else{
            param=str.slice(0,i).replace(/\s+/gm,'');
            body =str.slice(i+2).replace(/^\s+|\s+$/g,'');

            //k=><alert(k);return k;>  //[]可能用来表示数组,{}用来表示对象,()用来表示区间块,只有<>是没有用的
            body= body.indexOf('<')==0 ? body.slice(1,-1) : 'return '+body;
            
            if(param=='args'){
                body='var args=arguments;'+body;
                param='';
            }
            return new Function(param,body);
        }
    }

    module.exports={
        indexAs:function(item){
                    var len=this.length;
                    for(var i=0;i<len;i++){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        lastIndexAs:function(item){
                    for(var i=this.length-1;i>-1;i--){
                        if( JSON.equal(item,this[i]) ) //依赖于JSON.equal扩展，检测是否相等的JSON对象
                            return i;
                    }
                    return -1;
                },
        each:Array.prototype.forEach,
        remove:function(i){return this.splice(i,1);},
        has:function(item,bol){return this.indexOf(item,bol)+1;},
        except:function (foo) {
                    var the=this;
                    return the.filter(function(v,i,arr){
                        return !$lambda(foo)(v,i,arr);
                    });
        },
        where:function(foo){
                    var the=this;
                    return the.filter(function(v,i,arr){
                        return $lambda(foo)(v,i,arr);
                    });
                },
        select:function(foo){
                    var the=this;
                    return the.map(function(v,i,arr){
                        return $lambda(foo)(v,i,arr);
                    });
                },
        update:function (foo) {
            this.forEach(function(v,i,arr){
                arr[i]=$lambda(foo)(v,i,arr);
            });
            return this;
        },
        delete:function (foo) {
            this.forEach(function(v,i,arr){
                return $lambda(foo)(v,i,arr) && arr.remove(i);
            });
            return this.where('x => typeof x !="undefined" ');
        },
        distinct:function(jsonEqual){
                        var i,j;
                        for(i=this.length-1;i>0;i--){
                                j= jsonEqual ? this.indexAs(this[i]) :this.indexOf(this[i]);
                                j>-1 && j<i && this.remove(i);
                            
                            /*for(var k=i-1;k>-1;k--){
                                var item=this[i];
                                JSON.equal(item,this[k],jsonEqual) && this.remove(i);
                            }*/
                        }
                        return this.where('x => typeof x !="undefined" ');
                },
        order:function(func,desc){
                    var orderFn, arr=this.slice();
                    
                    //准备好转换函数定义和排序三大套路
                    var trans=function(x){return x};
                    var orderFns={
                        number:function(a,b){return trans(a) - trans(b)},
                        string:function(a,b){return trans(a).localeCompare(trans(b))},
                        boolean:function(a,b){return !trans(a);}
                    };
                    
                    if(this.length<2) return arr;
                    
                    //trans转换函数重赋值（不传的话等于初始值）
                    trans=$lambda(func);
                    
                    //抽样判断转换函数的返回值类型，来选择对应的比较函数
                    orderFn=orderFns[typeof trans(arr[0])];
                    
                    try{
                        arr.sort(orderFn||null);
                    }catch(e){
                        throw new Error('排序失败,请检测方法和数组内容');
                    }
                    //第二参数为true表示结果需要倒序
                    desc && arr.reverse();
                    return arr;
                },
        max:function(str){
                    var now, j=this.length, func=$lambda(str);
                    if(j==0) return null;
                    if(j==1) return func(this[0])
                    now=func(this[0]);
                    for(var i=1;i<j;i++){
                        now=Math.max(now,func(this[i]));
                    }
                    return now;
                },
        min:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    now=Math.min(now,func(this[i]));
                }
                return now;
            },
        sum:function(str){
                var now, j=this.length, func=$lambda(str);
                if(j==0) return null;
                if(j==1) return func(this[0])
                now=func(this[0]);
                for(var i=1;i<j;i++){
                    next=func(this[i]);
                    if(now==null){
                        now=next;      //前者是null直接取后者         
                    }else{
                        now= next==null ? now : now+next;  //后者是null直接取前者，否则相加
                    } 
                    //null加数字的时候,就是0+数字,而null加字符串,不是''+字符,而是'null'+字符串...所以是null就不加
                }
                return now;
            },
    
        linq:function(query){
            //数据源
            var dataInfo=query.match(/\sfrom\s+([^\s]+\s+\w)/)[1].split(/\s+/); //'from多个空格到where或终点之间的字符'之'前半段'
            var dataName=dataInfo[0]; //数据源名
            var dataMark=dataInfo[1]; //短别名	
            
            var columns=[];
            var where_clause='';
            var order_clause='';
            var desc='';
            
            //用正则捕获where和order条件 TODO
            var cond=query.match(/\swhere\s+(.+)(order\sby){0,1}/); //where和order by一起取出
            if(cond.length && cond.length>1){
                var clause=cond[1].split(' order by ');
                where_clause=clause[0];
                if (clause.length>1){
                    order_clause=clause[1];
                    desc=order_clause.slice(-5)==' desc'; //"order by字段.slice(-5)==' desc'或' DESC'"
                    desc && (order_clause=order_clause.slice(0,-5));
                }
            }else{
                //没有where条件的,尝试找下order by条件
                cond=query.match( new RegExp("\\s#\\s+*\\s+order\\sby(.+)".replace('#',dataName).replace('*',dataMark))  );
                if(cond.length && cond.length>1){
                    var index=cond[0].indexOf(' order by ');
                    order_clause=cond[0].slice(index+10)
                }
            }

            //排除空条件
            if(where_clause.trim())
                where_clause= dataMark+'=>'+where_clause;
            if(order_clause.trim())
                order_clause= dataMark+'=>'+order_clause;

            //用正则捕获选取的字段 TODO
            var cols=query.match(/^select\s+(.+)\s+from/);
            if(cols.length && cols.length>1){
                cols=cols[1].trim();
                if(cols.trim()=='*'){
                    columns[0]='';
                }else{
                    columns=cols.split(/,\s+/gm); //最终选了,和空格,是否改为;分割?
                    var j=columns.length
                    for(var i=0;i<j;i++)
                        columns[i]=dataMark+'=>'+columns[i];
                }
            }
            
            eval('var data='+dataName); 
            //this[dataName] 用this指向上下文，需要使用时将数据挂在某对象上。 
            //或者直接传入第二个Linq参数data引用数据源
            
            return function(){
                return [].select.apply(data.where(where_clause).orderby(order_clause,desc),columns); //cols用select.apply(data,colsArr)传多个字段
            };
        }
            // "select d.name, d.age from datas d where d.age>25 && d.name!='tom' order by d.age desc";
            // 这样的写法其实已经不能成立， columns分隔依赖select的多项合并，和数组combine方法
            //select('d=>d.name','d=>d.age') //这里需要讲两次循环的数组结果项concat，因为性能已经放弃，并且单项还是数组不是对象
            //select('d=>{姓名:d.name,年龄:d.age}') //解析为这样的理想形式需要键名
            //或者这样写
            //"select {姓名:d.name,年龄:d.age－1} from datas d where d.age%2==0"
            //"select [d.name,d.age] from datas d"
    };





