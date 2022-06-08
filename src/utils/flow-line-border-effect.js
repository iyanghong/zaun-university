import {getStyle} from "@/utils/dom";

/**
 * Created by yh on 2021/7/2
 */
export default function ({container,color = '#FFB800',speed = 1}) {
    let el = document.querySelector(container);
    if(!el){
        throw new Error('无法找到元素' + container);
    }
    let position = getStyle(el, 'position');
    if (position !== 'absolute' && position !== 'fixed' && position !== 'relative') {
        el.style.position = 'relative';
    }
    if(!document.querySelector('style#flow-line-border-effect-style')){
        let style = document.createElement('style');
        style.id = 'flow-line-border-effect-style';
        style.innerText = '@keyframes flow-line-border-left {' +
            '            0% {' +
            '                left: -100%;' +
            '            }' +
            '' +
            '            50%, 100% {' +
            '                left: 100%;' +
            '            }' +
            '        }' +
            '        @keyframes flow-line-border-top {' +
            '            0% {' +
            '                top: -100%;' +
            '            }' +
            '' +
            '            50%, 100% {' +
            '                top: 100%;' +
            '            }' +
            '        }' +
            '        @keyframes flow-line-border-right {' +
            '            0% {' +
            '                right: -100%;' +
            '            }' +
            '' +
            '            50%, 100% {' +
            '                right: 100%;' +
            '            }' +
            '        }' +
            '        @keyframes flow-line-border-bottom {' +
            '            0% {' +
            '                bottom: -100%;' +
            '            }' +
            '' +
            '            50%, 100% {' +
            '                bottom: 100%;' +
            '            }' +
            '        }';
        el.appendChild(style);
    }

    if(color === 'success'){
        color = '#67C23A';
    }else if(color === 'warning'){
        color = '#E6A23C';
    }else if(color === 'danger'){
        color = '#F56C6C';
    }
    let leftLine = document.createElement('span');
    leftLine.className = 'flow-line-border-span';
    leftLine.style.display = 'block';
    leftLine.style.position = 'absolute';
    leftLine.style.top = '0';
    leftLine.style.left = '0';
    leftLine.style.width = '100%';
    leftLine.style.height = '2px';
    leftLine.style.background  = 'linear-gradient(90deg, transparent, '+color+')';
    leftLine.style.animation = 'flow-line-border-left  '+speed+'s linear infinite';
    let topLine = document.createElement('span');
    topLine.className = 'flow-line-border-span';
    topLine.style.display = 'block';
    topLine.style.position = 'absolute';
    topLine.style.top = '-100%';
    topLine.style.right = '0';
    topLine.style.width = '2px';
    topLine.style.height = '100%';
    topLine.style.background = 'linear-gradient(90deg, transparent, '+color+')';
    topLine.style.animation = 'flow-line-border-top  '+speed+'s linear infinite';
    topLine.style.animationDelay = speed / 4 +'s';

    let rightLine = document.createElement('span');
    rightLine.className = 'flow-line-border-span';
    rightLine.style.display = 'block';
    rightLine.style.position = 'absolute';
    rightLine.style.bottom = '0';
    rightLine.style.right = '0';
    rightLine.style.width = '100%';
    rightLine.style.height = '2px';
    rightLine.style.background = 'linear-gradient(270deg, transparent, '+color+')';
    rightLine.style.animation = 'flow-line-border-right  '+speed+'s linear infinite';
    rightLine.style.animationDelay = speed / 2 +'s';

    let bottomLine = document.createElement('span');
    bottomLine.className = 'flow-line-border-span';
    bottomLine.style.display = 'block';
    bottomLine.style.position = 'absolute';
    bottomLine.style.bottom = '-100%';
    bottomLine.style.left = '0';
    bottomLine.style.width = '2px';
    bottomLine.style.height = '100%';
    bottomLine.style.background = 'linear-gradient(360deg, transparent, '+color+')';
    bottomLine.style.animation = 'flow-line-border-bottom  '+speed+'s linear infinite';
    bottomLine.style.animationDelay = (speed * 0.75) +'s';

    el.appendChild(leftLine);
    el.appendChild(topLine);
    el.appendChild(rightLine);
    el.appendChild(bottomLine);




}
