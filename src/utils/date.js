export default class date {
    time = 0;

    constructor(...date) {
        //由于js中月份是从0开始，所以如果有月份先减一
        if (date[1]) {
            date[1]--
        }
        if (date[0] && Object.prototype.toString.call(date[0]) === '[object String]' && date[0].toString().length > 4) {
            //兼容垃圾苹果
            date[0] = date[0].replace(/-/g, "/").replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            let arr = date[0].split(/[- : \/]/);
            if (arr[1]) {
                arr[1]--
            }
            this.time = new Date(...arr).getTime();

        } else if (date[0] && Object.prototype.toString.call(date[0]) === '[object String]') {
            //处理 2020-12-07T11:44:18.000000Z格式
            date[0] = date[0].replace(/-/g, "/");
            let json_date = new Date(date).toJSON();
            json_date = json_date.replace(/-/g, "/").replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            let tempDate = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/-/g, "/").replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            this.time = new Date(tempDate).getTime()
        } else if (date[0] && typeof date[0] === 'number') {
            let d = new Date();
            d.setTime(date[0])
            this.time = d.getTime()
        } else {
            this.time = date[0] ? Date.parse(...date) : new Date().getTime();
        }

    }

    /**
     * 获取相隔x天的时间
     */
    diff(day = 0) {
        this.time = this.time + (day * 60 * 60 * 24 * 1000)
        return this
    }

    /**
     * 获取xx天前、xx月前这种格式
     */
    getDiffFormat(option = null) {
        let langKey = 'zh-CN', langUnitText;
        if (option !== null && option !== undefined && typeof option === 'object') {
            if (option.langKey) langKey = option.langKey;
            if (option.langUnitText) langUnitText = option.langUnitText;
        }
        let defaultUnitText = ['年前', '月前', '周前', '天前', '小时前', '分钟前', '刚刚'];
        if (!langUnitText) {
            if (langKey === 'zh-CN') {
                langUnitText = defaultUnitText
            } else if (langKey === 'en') {
                langUnitText = ['year ago', 'month ago', 'week ago', 'day ago', 'hour ago', 'minute ago', 'Just']
            } else {
                langUnitText = defaultUnitText;
            }
        } else if (typeof langUnitText === 'string') {
            langUnitText = langUnitText.split(',');
        } else {
            langUnitText = defaultUnitText;
        }
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = day * 365;
        let now = new Date().getTime();
        now = now - 8 * 60 * 60 * 1000;    //东8区需要减8个小时
        let diffValue = now - this.time;
        let result;
        if (diffValue < 0) {
            return;
        }
        let yearC = diffValue / year;
        let monthC = diffValue / month;
        let weekC = diffValue / (7 * day);
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;

        function resolveUnitText(num, index) {
            if (parseInt(num) > 1 && langKey === 'en') {
                let text = langUnitText[index];
                if (text) {
                    text = text.split(' ');
                    text[0] = text[0] + 's';
                    return ' ' + text.join(' ')
                } else {
                    return defaultUnitText[index];
                }
            }

            return langUnitText[index] || defaultUnitText[index];
        }

        if (yearC >= 1) {
            result = "" + parseInt(yearC) + resolveUnitText(yearC, 0);
        } else if (monthC >= 1) {
            result = "" + parseInt(monthC) + resolveUnitText(monthC, 1);
        } else if (weekC >= 1) {
            result = "" + parseInt(weekC) + resolveUnitText(weekC, 2);
        } else if (dayC >= 1) {
            result = "" + parseInt(dayC) + resolveUnitText(dayC, 3);
        } else if (hourC >= 1) {
            result = "" + parseInt(hourC) + resolveUnitText(hourC, 4);
        } else if (minC >= 1) {
            result = "" + parseInt(minC) + resolveUnitText(minC, 5);
        } else
            result = langUnitText[6] || defaultUnitText[6];
        return result;
    }

    /**
     * 获取自定义时间格式
     * @param {String}  format 时间格式
     */
    get(format = "yyyy-M-d h:i:s") {
        let date = new Date(this.time);

        var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var minute = date.getMinutes(),
            second = date.getSeconds(),
            month = date.getMonth() + 1,
            day = date.getDate();
        minute < 10 && (minute = "0" + minute.toString());
        second < 10 && (second = "0" + second.toString());
        month < 10 && (month = "0" + month.toString());
        day < 10 && (day = "0" + day.toString());
        var formatList = {
            "timestamp": date.getTime(), //时间戳
            "y+": date.getFullYear(), //年份
            "M+": month, //月份
            "m+": month,
            "d+": day, //日
            "w+": weeks[date.getDay()], //星期
            "h+": date.getHours(), //小时
            "i+": minute, //分
            "s+": second, //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds(), //毫秒

        };
        for (var item in formatList) {
            if (new RegExp("(" + item + ")").test(format)) {
                format = format.replace(RegExp.$1, formatList[item]);
            }
        }
        return format;
    }
}
