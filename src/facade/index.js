import date from '@/utils/date.js'
import isString from '@/providers/validator/modules/isString'
import isArray from '@/providers/validator/modules/isArray'
import validator from '@/providers/validator'
import crypt from '@/providers/crypt/index'
import cache from '@/providers/cache.js'

/**
 * 别名加载列表
 */
const aliases = {
    /**
     * 日期助手
     */
    date: {
        delay: false,
        handle(...d) {
            return new date(...d);
        }
    },
    isString: {
        handle: isString.handle
    },
    isArray: {
        handle: isArray.handle
    },
    /**
     * 验证器
     */
    validator: {
        handle(data, rules, msg = {}, attribute = {}) {
            if (data && rules) {
                return new validator().handle(data, rules, msg, attribute)
            }
            return new validator()
        }
    },
    /**
     * 加密
     */
    encrypt: {
        handle(data, key) {
            return crypt.encrypt(data, key)
        }
    },
    /**
     * 解密
     */
    decrypt: {
        handle(data, key) {
            return crypt.decrypt(data, key)
        }
    },
    cache: {
        handle: cache
    },
    getRandomBg: {
        handle() {
            let ramInt = Math.floor(Math.random() * 300 + 1);
            ramInt = ('0000' + ramInt).substr(-4);
            return 'global/bg/bg-' + ramInt + '.jpg';
        }
    },
    removeBind: {
        handle(value) {
            if (typeof value == 'object') {
                return JSON.parse(JSON.stringify(value));
            }
            return value;
        }
    },
    guid: {
        handle(format) {
            let guid = "";
            for (let i = 1; i <= 32; i++) {
                let n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if (format && (i === 8 || i === 12 || i === 16 || i === 20)) guid += "-";
            }
            return guid;
        }
    },
    tl: {
        handle(key, defaultValue) {
            if (this.$config.app.internationalization) {
                let value = this.$t(key);
                return (value === key && defaultValue) ? defaultValue : value;
            }
            return defaultValue || key;
        }
    },
    tlDelete: {
        handle(name, objName) {
            if (this.$config.app.internationalization) {
                return `${this.$t('deleteMessage.suffix')}${objName}${this.$t('deleteMessage.postfix')}`;
            }
            return `此操作将会永久删除${objName},是否继续？`;
        }
    }
}


/**
 * 直接加载列表
 */
const directly = [];
/**
 * 初始化默认注册门面列表
 */
export default {
    aliases,
    directly
}
