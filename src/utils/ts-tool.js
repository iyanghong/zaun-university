/**
 * 根据身份证获取生日，yyyy-MM-dd格式
 * @param {String} cardId
 */
export const getBirthdayByIdNo = function (cardId) {
    var tmpStr = "";
    cardId = cardId.replace(/^\s+|\s+$/g, "");
    if (cardId.length == 15) {
        tmpStr = cardId.substring(6, 12);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        return tmpStr;
    } else {
        tmpStr = cardId.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        return tmpStr;
    }
}

/**
 * 根据生日或者身份证计算星座
 * @param {String} value 生日，或者身份证
 * @param {String} sp 生日格式
 */
export function getConstellation(value, sp = '-') {
    if (!value || value == "") return;
    if (typeof value == 'number') {
        value = getDate('y-m-d', 0, value.length > 10 ? value : value * 1000);
    }
    if (value.length > 15) value = this.getBirthdayByIdNo(value), sp = '-';
    let birthday = value.split(sp);
    let month = birthday[1],
        day = birthday[2];
    let constellation = null;
    const constellation_name = ['水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座'];
    day <= 22 ? (1 !== parseInt(month) ? constellation = constellation_name[month - 2] : constellation =
        constellation_name[11]) : constellation = constellation_name[month - 1];
    return constellation;
}

/**
 * 根据生日或者身份证计算生肖
 * @param {String} value 生日，或者身份证
 * @param {String} sp 生日格式
 */
export function getAnimals(value, sp = '-') {
    if (!value || value == "") return;
    if (typeof value == 'number') {
        value = getDate('y-m-d', 0, value.length > 10 ? value : value * 1000);
    }
    if (value.length > 15) value = this.getBirthdayByIdNo(value), sp = '-';
    let birthday = value.split(sp);
    let year = birthday[0];
    const animalsArray = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    //生肖算法为：（年-1900）求模12
    let key = (year - 1900) % 12;
    return animalsArray[key];
}

/**
 * 根据生日或者身份证计算年龄
 * @param {String} value 生日，或者身份证
 * @param {String} sp 生日格式
 */
export function getAge(value, sp = '-') {
    if (!value || value == "") return;
    if (typeof value == 'number') {
        value = getDate('y-m-d', 0, value.length > 10 ? value : value * 1000);
    }
    if (value.length > 15) value = this.getBirthdayByIdNo(value), sp = '-';

    var age,
        birthdayArr = value.split(sp),
        birthYear = birthdayArr[0],
        birthMonth = birthdayArr[1],
        birthDay = birthdayArr[2],
        d = new Date(),
        nowYear = d.getFullYear(),
        nowMonth = d.getMonth() + 1,
        nowDay = d.getDate();
    if (nowYear == birthYear) {
        age = 0; //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                    age = ageDiff - 1;
                } else {
                    age = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                    age = ageDiff - 1;
                } else {
                    age = ageDiff;
                }
            }
        } else {
            age = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return age; //返回周岁年龄
}

/**
 * 获取时间
 * @param {String} format 时间格式，默认为yyyy-M-d h:m:s
 * @param {String} betweenDay 获取据今多少天的日期
 */
export function getDate(format = "yyyy-M-d h:i:s", betweenDay = 0, time) {
    let nowDate = time ? new Date(time) : new Date();
    var targetday_milliseconds = nowDate.getTime() + 1000 * 60 * 60 * 24 * betweenDay;
    nowDate.setTime(targetday_milliseconds);
    if (format == null || format == '') format = 'yyyy-M-d';

    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var minute = nowDate.getMinutes(),
        second = nowDate.getSeconds(),
        month = nowDate.getMonth() + 1,
        day = nowDate.getDate();
    minute < 10 && (minute = "0" + minute.toString());
    second < 10 && (second = "0" + second.toString());
    month < 10 && (month = "0" + month.toString());
    day < 10 && (day = "0" + day.toString());
    var date = {
        "y+": nowDate.getFullYear(), //年份
        "M+": month, //月份
        "m+": month,
        "d+": day, //日
        "w+": weeks[nowDate.getDay()], //星期
        "h+": nowDate.getHours(), //小时
        "i+": minute, //分
        "s+": second, //秒
        "q+": Math.floor((nowDate.getMonth() + 3) / 3), //季度
        "S": nowDate.getMilliseconds(), //毫秒
        "timestamp": nowDate.getTime() //时间戳
    };
    for (var item in date) {
        if (new RegExp("(" + item + ")").test(format)) {
            format = format.replace(RegExp.$1, date[item]);
        }
    }
    return format;
}

export function isEmpty(val) {
    // null or undefined
    if (val == null) return true;

    if (typeof val === 'boolean') return false;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {

        case '[object String]':
        case '[object Array]':
            return !val.length;

        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size;
        }
        case '[object Object]': {
            return !Object.keys(val).length;
        }
    }

    return false;
}


export function isPromise(obj) {

    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

}

export function trimArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        if (Object.prototype.toString.call(arg) !== '[object Array]') {
            return arg;
        }
    } else {
        if (!Array.isArray(arg)) {
            return arg;
        }
    }
    let data = [];
    for (let item of arg) {
        if (item !== undefined && item !== null && item !== '') {
            data.push(item);
        }
    }
    return data;
}


export function getDuration(time) {
    let days = time / 1000 / 60 / 60 / 24;
    let daysRound = Math.floor(days);
    let hours = time / 1000 / 60 / 60 - (24 * daysRound);
    let hoursRound = Math.floor(hours);
    let minutes = time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    let minutesRound = Math.floor(minutes);
    let seconds = time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    seconds = Math.floor(seconds);
    return daysRound + '天' + hoursRound + '时' + minutesRound + '分' + seconds + '秒';
}


/**
 * 加密手机号码
 * @param {String|Int} value
 */
export function cryptPhone(value) {
    if (!value) return '';
    value = value.toString();
    if (value.length < 3) return '';
    return value.substr(0, 3) + '******' + value.substr(-2);
}

/* eslint-disable */
export function cryptEmail(value) {
    if (!(/^[_a-z0-9-\.]+@([-a-z0-9]+\.)+[a-z]{2,}$/i).test(value)) {
        return '';
    }
    let index = value.indexOf('@');
    if (index > 2) {
        return value.substr(0, 2) + '******' + value.substr(index);
    }
    return '******' + value.substr(index);
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}


/* 数字转整数 如 100000 转为10万
 * @param {Number} value 需要转化的数
 * @param {Number} point 需要保留的小数位数
 */
export function tranNumber(value = 0, point = 2) {
    const newValue = ['', '', ''];
    let fr = 1000
    let num = 3
    let fm = 1
    while (value / fr >= 1) {
        fr *= 10
        num += 1
        // console.log('数字', value / fr, 'num:', num)
    }
    if (num <= 3) {
        newValue[0] = parseInt(value / 100) + ''
    } else {
        let unit = 'K';
        if (num <= 6) { //千级
            fm = 1000
        } else if (num < 10) { //百万级
            fm = 1000000
            unit = 'M';
        } else { //10亿级
            fm = 1000000000
            unit = 'B';
        }
        if (value % fm === 0) {
            newValue[0] = parseInt(value / fm) + ''
        } else {
            newValue[0] = parseFloat(value / fm).toFixed(point) + ''
        }
        newValue[1] = unit;
    }
    if (value < 1000) {
        newValue[0] = value + ''
        newValue[1] = ''
    }
    return newValue.join('')
}

/**
 * 静态更新URL
 * @param {String} key 需要更改的参数名
 * @param {String} value 更改的值
 * 参数值不为空时，存在参数则更新，否则不操作
 */
export const updateQuery = function (key, value) {
    var uri = window.location.href;

    if (!value) {
        return uri;
    }
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    var state = {
        title: document.title,
        url: document.location.href,
        otherkey: null
    };

    if (uri.match(re)) {
        history.replaceState(state, document.title, uri.replace(re, '$1' + key + "=" + value + '$2'));
    } else {
        history.replaceState(state, document.title, uri + separator + key + "=" + value);
    }
}
