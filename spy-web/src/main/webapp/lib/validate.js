/**
 * Created by jacob on 2016/7/26.
 */
$.extend($.fn.validatebox.defaults.rules, {
    ip: {
        validator: function (val) {
            return /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/.test(val);
        },
        message: '请输入正确的IP地址'
    },
    //手机或座机号正则
    contact: {
        validator: function (val) {
            return /^1\d{10}$|0\d{2,3}-?\d{7,8}/.test(val);
        },
        message: '请输入正确的固定电话或手机号码'
    },
    //端口号正则
    port: {
        validator: function (val) {
            return /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(val);
        },
        message: '端口号必须在1-65535之间'
    },
    //账号密码非中文正则
    noChinese: {
        validator: function (val) {
            return !/^[\u0391-\uFFE5]+$/.test(val);
        },
        message: '账号密码不能包含中文'
    },
    extLength:{
        validator:function (val,arr) {
            val = val.trim();
            var regCh = /[^\x00-\xff]+/gm,//双字节字符
                regNoCh = /[\x00-\xff]+/gm,//单字节字符
                chArr = val.match(regCh),
                noChArr = val.match(regNoCh),
                valLen = (chArr?chArr.join('').length*2:0) + (noChArr?noChArr.join('').length:0);
            arr[2] = valLen;
            return valLen >= arr[0] && valLen<=arr[1];
        },
        message:'当前长度{2}字节，请输入{0}-{1}字节'
    },
    isChineseID:{
        validator:function(str){
            // aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
            //     31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
            //     43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
            //     61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
            var aCity = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91";
            var iSum = 0;
            var idCardLength = str.length;
            var sBirthday = '';
            var d = 0;
            if(!/^\d{17}(\d|x)$/i.test(str)&&!/^\d{15}$/i.test(str))
            {
                return false;
            }
            //在后面的运算中x相当于数字10,所以转换成a
            str = str.replace(/x$/i,"a");
            var curCity = str.substr(0,2);
            if(!(aCity.indexOf(curCity) > 0) )
            {
                return false;
            }
            if (idCardLength==18)
            {
                sBirthday=str.substr(6,4)+"-"+Number(str.substr(10,2))+"-"+Number(str.substr(12,2));
                d = new Date(sBirthday.replace(/-/g,"/"));
                if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
                {
                    return false;
                }

                for(var i = 17;i>=0;i --)
                    iSum += (Math.pow(2,i) % 11) * parseInt(str.charAt(17 - i),11);
                if(iSum%11!=1)
                {
                    return false;
                }
            }
            else if (idCardLength==15)
            {
                sBirthday = "19" + str.substr(6,2) + "-" + Number(str.substr(8,2)) + "-" +
                    Number(str.substr(10,2));
                d = new Date(sBirthday.replace(/-/g,"/"));
                var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();
                if(sBirthday != dd)
                {
                    return false;
                }
            }
            return true;
        },
        message:'请输入正确的身份证号'
    }
});