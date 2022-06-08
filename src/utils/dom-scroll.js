/**
 * Created by yh on 2021/5/19
 */
/**
 * 滚动到元素位置事件监听
 * (支持多元素)
 * @param {Document|String} elem 元素选择器
 * @param {Function} callback 触发回调函数
 * @param {String} domPosition 定位位置（以元素上边框定位或者元素下边框定位）:top|bottom
 * @param {Number} triggerOffset 偏移量 （距离元素定位位置还有多少触发，默认50）
 * @returns {boolean}
 * @constructor
 */
export function listenDocumentScrollEvent(elem, callback, domPosition = 'top', triggerOffset = 50) {
    if (!elem) {
        throw new Error('请传入元素 or 元素选择器');
    }
    if (typeof callback !== 'function') {
        throw new Error('错误的回调函数类型:[' + typeof callback + ']');
    }
    let elements = document.querySelectorAll(elem);
    for (let element of elements) {
        listenEvent(element)
    }
    function listenEvent(dom) {
        window.addEventListener('scroll', function () {
            let elementOffset = dom.offsetTop - triggerOffset;
            if (domPosition === 'bottom') {
                elementOffset += dom.clientHeight;
            }
            //当前滚动条 + 可视区域高度
            let documentScrollTop = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (documentScrollTop > elementOffset) {
                callback(dom);
            }
        });
    }
}