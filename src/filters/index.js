import date from '../utils/date.js'

/**
 * 格式化时间戳（毫秒级）
 * @param value
 * @returns {String}
 */
export function formatDate(value) {
    let d = new date(value);
    return d.get('y-M-d');
}

/**
 * 格式化时间戳（秒级）
 * @param value
 * @returns {String}
 */
export function formatSecondDate(value) {
    let dataStr = value;
    if (typeof value === 'number') {
        dataStr *= 1000;
    }
    let d = new date(dataStr);
    return d.get('y-M-d');
}

/**
 * 格式化时间戳（秒级）
 * @param value
 * @returns {String}
 */
export function formatSecondDateAndDiff(value) {
    let d = new date(value * 1000);
    return d.getDiffFormat() + '(' + d.get('y-M-d') + ')';
}

export function formatDateDiff(value, option = null) {
    let d = new date(value);
    console.log(d.getDiffFormat())
    return d.getDiffFormat(option);
}

export function resources(value) {
    if (value && /^(https|http)\:\/\//.test(value)) {	//eslint-disable-line
        return value
    }
    return process.env.VUE_APP_BASE_RESOURCE_URL + value;
}

export function escapeHtml(str) {
    let arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
    let value  = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
    return value
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
