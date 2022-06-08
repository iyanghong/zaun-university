/**
 * Created by yh on 2021/5/24
 */


const actionAlgorithm = {
    /**
     * 缓动函数
     * @param {Number} t 动画已消耗时间
     * @param {Number} b 原始值
     * @param {Number} c 目标值
     * @param {Number} d 持续时间
     */
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};

const TweenAlgorithm = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t===0) return b;
            if (t===d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            // eslint-disable-next-line no-redeclare
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s === undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s === undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s === undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - TweenAlgorithm.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return TweenAlgorithm.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return TweenAlgorithm.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
}



/**
 * 将元素滚动到可见位置
 * @param {HTMLElement|String} scroller 要滚动的元素
 * @param {HTMLElement|String} viewer 需要可见的元素
 * @param {String} toViewerPosition 滚动到可见元素的位置（头部|尾部）(top|bottom)
 * @param {Number} justify 偏离值
 * @param {String} speedAlgorithm 滚动速度算法
 * @param {Number} speed 滚动持续时间
 */
export function scrollToView(
    {
        scroller = null,
        viewer,
        toViewerPosition = 'top',
        justify = 0,
        speedAlgorithm = 'easeIn',
        speed = 500
    }) {
    if (!viewer) throw new Error('需要可见的元素找不到');
    if (!scroller) scroller = document.documentElement;
    if (typeof scroller === 'string') {
        scroller = document.querySelector(scroller);
        if (!scroller) throw new Error('要滚动的元素找不到');
    }
    if (typeof viewer === 'string') {
        viewer = document.querySelector(viewer);
        if (!viewer) throw new Error('需要可见的元素找不到');
    }
    const clientHeight = document.documentElement.clientHeight

    const rect = viewer.getBoundingClientRect()
    let scroll = rect.top - clientHeight + rect.height + justify
    if (toViewerPosition === 'bottom') {
        scroll += viewer.clientHeight
    }

    const scrollStart = scroller.scrollTop
    let start = null
    let algorithm = actionAlgorithm[speedAlgorithm] ? actionAlgorithm[speedAlgorithm] : actionAlgorithm.sineaseOut;

    const step = (timestamp) => {
        if (!start) {
            start = timestamp
        }
        let stepScroll = algorithm(timestamp - start, 0, scroll, speed)
        let total = scroller.scrollTop = scrollStart + stepScroll

        if (total < scrollStart + scroll) {
            window.requestAnimationFrame(step)
        }
    }
    window.requestAnimationFrame(step)
}


export function scrollToTop() {
    const scrollStart = document.documentElement.scrollTop
    let start = null;
    let algorithm = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    const step = (timestamp) => {
        if (!start) {
            start = timestamp
        }
        let stepScroll = algorithm(timestamp - start, 0, scrollStart, 500)
        let total = document.documentElement.scrollTop = (scrollStart - stepScroll)

        if (total > 0) {
            window.requestAnimationFrame(step)
        }
    }
    window.requestAnimationFrame(step)
}

/**
 * 滑动滚动条到指定位置
 * @param number 指定位置
 * @param speed 动画时长
 * @returns {number}
 */
export function scrollToNumber(number = 0, speed = 500) {
    let scrollStart = document.documentElement.scrollTop; // 获取当前滚动条位置
    let isTop = scrollStart > number;
    let start = null
    let algorithm = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    let totalStep = isTop ? (scrollStart - number) : number
    const step = (timestamp) => {
        if (!start) {
            start = timestamp
        }
        let stepScroll = algorithm(timestamp - start, 0, totalStep, speed)
        if (isTop) {
            let total = document.documentElement.scrollTop = scrollStart - stepScroll
            if (total >= number) {
                window.requestAnimationFrame(step)
            }
        } else {
            let total = document.documentElement.scrollTop = scrollStart + stepScroll
            if (total < scrollStart + number) {
                window.requestAnimationFrame(step)
            }
        }
    }
    window.requestAnimationFrame(step)
}
