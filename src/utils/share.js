/**
 * Created by yh on 2021/5/8
 */

function resolverQuery(params, objectResolve = '') {
    let str = '';
    for (let key in params) {
        if (str !== '') {
            str += "&"
        } else {
            str += '?';
        }

        if (typeof params[key] === 'object') {
            if (objectResolve === '') {
                str += key + '=' + encodeURIComponent(JSON.stringify(params[key]));
            } else {
                let value = params[key].join(objectResolve);
                str += key + '=' + encodeURIComponent(value);
            }
        } else {
            str += key + '=' + encodeURIComponent(params[key]);
        }

    }
    return str
}

/**
 * QQ空间分享
 * @param {String}  url
 * @param {String}  title
 * @param {String}  desc
 * @param {String}  summary
 * @param {String}  site
 * @param {String|Array}  pics
 */
export function shareQzone({url, title, desc, summary, site, pics}) {
    let shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
    shareUrl += resolverQuery({
        url: url,
        title: title,
        desc: desc,
        summary: summary,
        site: site,
        pics: pics
    }, '|');
    window.open(shareUrl, '_blank');
}

/**
 * QQ好友分享
 * @param {String}  url
 * @param {String}  title
 * @param {String}  desc
 * @param {String}  summary
 * @param {String}  site
 * @param {String|Array}  pics
 */
export function shareQQFriend({url, title, desc, summary, site, pics}) {
    var shareUrl = 'https://connect.qq.com/widget/shareqq/iframe_index.html';
    shareUrl += resolverQuery({
        url: url,
        title: title,
        desc: desc,
        summary: summary,
        site: site,
        pics: pics
    }, '|');
    window.open(shareUrl, '_blank');
}

/**
 * 新浪微博分享
 * @param {String}  url
 * @param {String}  title
 * @param {String} source
 * @param {String} sourceUrl
 * @param {String} pic
 * @param {String} content
 */
export function shareSinaWeibo({url, title, source, sourceUrl, pic, content = 'utf-8'}) {
    var shareUrl = 'http://v.t.sina.com.cn/share/share.php';

    shareUrl += resolverQuery({
        url: url,
        title: title,
        source: source,
        sourceUrl: sourceUrl,
        pic: pic,
        content: content
    }, '|');
    window.open(shareUrl, '_blank');
}

/**
 * 微信分享
 * @param {String} url
 */
export function shareWechat(url) {
    let encodePath = encodeURIComponent(url),
        targetUrl = 'http://qr.liantu.com/api.php?text=' + encodePath;
    window.open(targetUrl, 'weixin', 'height=320, width=320')
}