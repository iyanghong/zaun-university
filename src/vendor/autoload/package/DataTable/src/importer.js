import Validator from "@/providers/validator";

/**
 * Created by yh on 2021/4/28
 */
/**
 *
 * @param {Array} data
 * @param {Array} header
 * @param {Boolean} force
 * @param {Array} cols
 */
export function handleImport(data, header, force, cols) {
    return new Promise((resolve) => {
        let tmpList = data.map(item => header.map(key => {
            return item[key] === undefined ? null : item[key];
        }));
        let list = tmpList.map(column => {
            let tmp = {};
            for (let index in cols) {
                if (typeof cols[index].field === 'string') {
                    tmp[cols[index].field] = column[index] || null;
                }
            }
            return tmp;
        });
        let rule = {}; // 验证规则列表
        let attribute = {}; // 字段别名列表
        let formatters = {}; // 格式化器列表
        for (let index in cols) {
            let column = cols[index];
            if (column.rule) {
                rule[column.field] = column.rule;
            }
            if (column.formatter !== null) {
                formatters[index] = column.formatter;
            }
            attribute[column.field] = header[index] ? header[index] : '';
        }
        /* 验证数据 */
        let validater = new Validator();
        let resultData = [];
        let flag = true, message = '', fail = [];
        for (let index in list) {
            let row = list[index];
            for (let index in formatters) {
                (typeof formatters[index] === 'function') && (row[index] = formatters[index](row[index]));
            }
            validater.handleFunction(row, rule, {}, attribute, function (result) {
                if (!result.flag) {
                    let failMessage = "第" + (Number(index) + 1) + "行验证失败:" + result.msg + ";"
                    message += failMessage;
                    fail.push({
                        message: failMessage,
                        data: row
                    });
                    if (force === false) {
                        flag = false;
                    }
                } else {
                    resultData.push(row);
                }
            });
            if(flag === false && force === false){
                break;
            }
        }
        resolve({
            flag: flag,
            message: message,   //
            fail: fail,     //失败列表
            data: resultData
        });
    });
}