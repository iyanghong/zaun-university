/**
 * Created by yh on 2021/5/16
 */

export function Typewriter(str, callback, speed = 300) {

    if (!str || typeof callback !== 'function') throw new Error('option incomplete!');
    if (typeof str !== 'string') str = str.toString();
    this.count = str.length;

    let now = 1;

    this.timer = setInterval(() => {
        if(now / 2 > this.count){
            clearInterval(this.timer);
            return;
        }
        let text = '';
        if (now % 2 === 0) {
            text = str.substring(0, now / 2);
        } else {
            text = str.substring(0, (now - 1) / 2) + '_';
        }
        now++;
        callback(text);
    }, speed / 2);

    this.clear = function () {
        clearInterval(this.timer);
    }
}