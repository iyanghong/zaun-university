/**
 * 验证器
 *
 数据格式：
 form: {
 	name: '',
 	email: '897541333@qq.com',
 	phone: 1877602216
 },
 rules: {
 	name: {name : '用户名',rule : 'required'},	//可以为object格式
 	email: 'required|email',					//也可以便捷的为字符串，多个rule用|隔开
 	phone: 'required|phone'
 }
 */
class validator {
    #list = {}		//已加载的rule列表
    #failMsg = []	//错误信息集合
    #rules = {}

    constructor() {
        //初始化验证规则列表
        this.__initRule();
    }

    /**
     * 初始化验证规则列表
     */
    __initRule() {
        //从同级目录modules中加载所有符合标准的规则
        const modulesFiles = require.context("./modules", true, /\.js$/)
        modulesFiles.keys().reduce((modules, modulePath) => {
            const value = modulesFiles(modulePath).default;
            if (value) {
                if (value instanceof Array) {
                    for (let item of value) {
                        if (item.name && item.handle) {
                            this.extend(item.name, item.handle, item.msg);
                        }
                    }
                } else {
                    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
                    this.extend(moduleName, value.handle, value.msg);
                }
            }
        }, {})
    }

    /**
     *
     * @param {Object} data    验证数据
     * @param {Object} rules 验证规则
     * @param {Object} msg 提示信息
     * @param {Object} attribute 验证属性
     * @returns {Promise<unknown>}
     */
    handle(data, rules, msg = {}, attribute = {}) {

        return new Promise((reslove) => {
            let result = this.resolveHandleValidate(data, rules, msg, attribute)
            reslove(result);
        });
    }


    handleFunction(data, rules, msg = {}, attribute = {}, callback = null) {
        let result = this.resolveHandleValidate(data, rules, msg, attribute)
        if (typeof callback === 'function') {
            callback(result);
        } else {
            return result.flag;
        }
    }

    resolveHandleValidate(data, rules, msg = {}, attribute = {}) {
        for (let key in rules) {
            let rule = rules[key];
            let field = key, message = '', attribute = '', type = '';
            if (typeof rule == 'object') {

                if (rules instanceof Array) {
                    field = rule.field || rule.key || key;
                }
                attribute = rule.label || rule.name || rule.attribute || field

                message = rule.message || rule.msg;
                type = rule.type || ''

            }

            let item = {
                message: message || '',
                attribute: attribute,
                type: type,
                data: data[field]
            };
            Object.assign(item, rule)
            if (item.rule instanceof Array) {
                item.rule = item.rule.join('|');
            }
            if (this.#rules[field]) {
                if (typeof this.#rules[field].rule == 'string') {
                    this.#rules[field].rule += "|" + item.rule
                }
            } else {
                this.#rules[field] = item;
            }

        }
        let flag = true
        for (let key in rules) {
            let rule = rules[key];
            if (typeof rule == 'string') {
                if (this.__doValidateUtil(data[key], rule, key, msg, attribute, data) !== true) {
                    flag = false;
                    break;
                }
            } else if (typeof rule == 'object') {
                let field = key;
                /**
                 * 当rules为数组格式时：
                 *
                 [
                 {field : 'xx',rule : ''},
                 {field : 'xx',rule : ''},
                 ]
                 * @param {Object} rules instanceof Array
                 */
                if (rules instanceof Array) {
                    field = rule.field || rule.key || key;
                }

                let attribute = this.__getItemAttribute(field),
                    ruleStr = rule.rule; //获取中文别名

                if (this.__doValidateUtil(data[field], ruleStr, field, msg, attribute, data) !== true) {
                    flag = false;
                    break;
                }
            }
        }
        return {
            flag: flag,
            msg: this.getLastMsg(),
            fail: this.getLastFail()
        }
    }


    /**
     * @param {String} value    值
     * @param {String} rule        规则
     * @param {String} key        属性名
     * @param {String|Object} msg        验证失败显示信息
     * @param {String|Object} attribute    属性中文别名
     * @param {Object} data 数据集
     */
    __doValidateUtil(value, rule, key, msg, attribute, data) {
        if (!rule) return true;
        let ruleList = rule.split('|');
        //判断规则是否允许为空忽略规则
        for (let item of ruleList) {
            if (this.__checkCanEmpty(item) === true && this.__isEmptyString(value)) {
                return true;
            }
        }

        let flag = true
        for (let ruleItem of ruleList) {
            ruleItem = ruleItem.split(':');
            // orRequired
            if (ruleItem[0].toUpperCase() === 'ORREQUIRED' && Object.prototype.toString.call(ruleItem[1]) === '[object String]') {
                let value1 = data[key], value2 = data[ruleItem[1]];
                if (this.__isEmptyString(value1) && this.__isEmptyString(value2)) {
                    let label1 = this.__getItemAttribute(key)
                        , label2 = this.__getItemAttribute(ruleItem[1]);
                    this.#failMsg.push([
                        {field: key, rule: ruleItem[0], message: `${label1}或${label2}必须填一个`},
                        {field: ruleItem[1], rule: ruleItem[0], message: `${label2}或${label1}必须填一个`}
                    ]);
                    flag = false;
                    break;
                }
                continue;
                // equal
            } else if (ruleItem[0].toUpperCase() === 'EQUAL' && Object.prototype.toString.call(ruleItem[1]) === '[object String]') {
                let value1 = data[key], value2 = data[ruleItem[1]];
                if (value1 !== value2) {
                    let label1 = this.__getItemAttribute(key)
                        , label2 = this.__getItemAttribute(ruleItem[1]);
                    this.#failMsg.push({
                        field: key,
                        rule: ruleItem[0],
                        message: `${label1}与${label2}不一致`
                    })
                    flag = false;
                    break;
                }
                continue;
            }
            let ruleObj = this.#list[ruleItem[0]];
            if (ruleObj) {

                let param = [
                    value,
                    ruleItem.join(':'),
                    this.___getItemType(key)
                ];
                // console.log(param);
                if (ruleObj.handle(...param) !== true) {
                    flag = false;
                    //处理错误信息
                    let failObj = {
                        field: key,
                        rule: ruleItem[0]
                    };
                    if (typeof msg == 'object') {
                        if (msg[key + "." + ruleItem[0]]) {
                            failObj.message = msg[key + "." + ruleItem[0]];
                            this.#failMsg.push(failObj);
                        } else if (msg[key]) {
                            failObj.message = msg[key];
                            this.#failMsg.push(failObj)
                        } else if (ruleObj.msg) {
                            failObj.message = ruleObj.msg.replace("${name}", typeof attribute == 'object' ? (attribute[key] || key) :
                                attribute);
                            this.#failMsg.push(failObj);
                        }
                    } else if (typeof msg === 'string') {
                        this.#failMsg.push(msg);
                    } else {
                        this.#failMsg.push(`"${key}"验证${ruleItem[0]}不通过`);
                    }
                    break
                    // break traverseRule;
                }
            }
        }
        return flag
    }

    /**
     * 判断是否允许为空的规则
     * @param rule
     */
    __checkCanEmpty(rule) {
        let optionUpperCase = rule.toUpperCase();
        return optionUpperCase === 'NOTNULL' || optionUpperCase === 'ORNULL' || optionUpperCase === 'CANNULL';

    }

    /**
     * 判断空字符串
     * @param {Object} value
     */
    __isEmptyString(value) {
        return value === "" || value === null || value === undefined;

    }

    ___getItemType(key) {
        if (this.#rules[key]) {
            return this.#rules[key].type
        }
        return ''
    }

    __getItemMessage(key) {
        if (this.#rules[key]) {
            return this.#rules[key].message || this.#rules[key].msg
        }
        return ''
    }

    __getItemAttribute(key) {
        if (this.#rules[key]) {
            return this.#rules[key].label || this.#rules[key].attribute || this.#rules[key].name || key
        }
        return key
    }

    /**
     * 获取最近错误信息
     */
    getLastMsg() {
        if (this.#failMsg.length > 0) {
            let last = this.#failMsg[this.#failMsg.length - 1]
            if (last && last instanceof Array && last.length > 0) {
                return last[last.length - 1].message;
            } else {
                return last.message;
            }
        }
        return ''
    }

    getLastFail() {
        if (this.#failMsg.length > 0) {
            if (this.#failMsg[this.#failMsg.length - 1]) {
                return this.#failMsg[this.#failMsg.length - 1];
            }
        }
        return {}
    }

    /**
     * 单个验证
     */
    check(value, rule, ...arg) {
        let flag = true
        let ruleList = rule.split('|');
        for (let ruleItem of ruleList) {
            ruleItem = ruleItem.split(':');
            let ruleObj = this.#list[ruleItem[0]];
            if (ruleObj) {
                if (ruleObj.handle(value, rule, ...arg) !== true) {
                    flag = false;
                    break
                }
            }
        }
        return flag
    }

    /**
     * 获取当前已加载的规则列表
     */
    getRuleList() {
        return Object.keys(this.#list);
    }

    /**
     * @param {Object} name
     * @param {Object} handle
     * @param {Object} msg
     */
    extend(name, handle, msg) {
        this.#list[name] = {
            name,
            handle,
            msg
        };
    }
}

export default validator
