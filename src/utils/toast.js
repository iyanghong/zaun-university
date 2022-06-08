/**
 * Created by yh on 2021/8/13
 */
let toastTimer = null;

export default function toast(message, option = {}) {
    let elem = option.elem || "body"//提示框显示的元素内，默认为body
        , times = option.times || '1500'//提示框显示时间
        , marginLeft = message.length * 14 / 2 + 12 //由于提示框是距离左边50%，剧中需要往左移动字符串长度 * 字体大小 / 2 + padding
        , _position = option.position ? option.position : '50%'
        , id = 'TS_Message';
    let messagePanel = document.createElement('div');
    messagePanel.id = id;
    messagePanel.setAttribute('style', 'color:white;position:' + (elem === 'body' ? 'fixed' : 'absolute') + ' ;padding: 12px 16px;bottom: ' + _position + ';left:50%;border-radius: 5px;background-color: rgba(0, 0, 0, 0.7);margin-left:-' + marginLeft + 'px;z-index:19999999');
    messagePanel.innerText = message;
    clearTimeout(toastTimer);
    let checkNode = document.getElementById(id);
    if (checkNode) {
        checkNode.parentNode.removeChild(checkNode);
    }
    document.querySelector(elem).appendChild(messagePanel);
    toastTimer = setTimeout(() => { //定时器，this.times时间后移除提示框
        document.querySelector(elem).removeChild(messagePanel);
        clearInterval(this);
    }, times);
}
