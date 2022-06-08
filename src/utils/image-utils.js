/**
 * 替换内容图片路径
 * @param {String} content 内容
 * @param {String} value   值
 * @param {Boolean} removeValue  是否替换
 * @param {Boolean} isMarkdown 内容是否是markdown
 */
export function replaceImageSrc(content, value, removeValue, isMarkdown) {
    if (removeValue) {
        content = content.replace(new RegExp(value, 'g'), '');
    } else {
        // eslint-disable-next-line
        let imgReg = isMarkdown ? /\[(?:.*?)\]\(?(.*?)\)/gi : /<img.*?(?:>|\/>)/gi, //匹配图片（g表示匹配所有结果i表示区分大小写）
            // eslint-disable-next-line
            srcReg = isMarkdown ? /\[(?:.*?)\]\(?(.*?)\)/i : /src=[\'\"]?([^\'\"]*)[\'\"]?/i; //匹配src属性

        let imgList = content.match(imgReg);
        for (let i in imgList) {
            let src = imgList[i].match(srcReg);
            if(src[1] && src[1].indexOf('http') === -1 && src[1].indexOf('/') > 0) {
                content = content.replace(new RegExp(src[1], 'g'), value + src[1]);
            }
        }
    }
    return content;
}

export function replaceMarkDownImageSrc(content, value, removeValue) {
    replaceImageSrc(content, value, removeValue, true);
}

/**
 * 获取内容图片路径列表
 * @param {String} content 内容
 * @param {Boolean} isMarkdown 内容是否是markdown
 */
export function getImageSrc(content, isMarkdown) {
    // eslint-disable-next-line
    let imgReg = isMarkdown ? /\!\[(?:.*?)\]\(?(.*?)\)/gi : /<img.*?(?:>|\/>)/gi, //匹配图片（g表示匹配所有结果i表示区分大小写）
        // eslint-disable-next-line
        srcReg = isMarkdown ? /\!\[(?:.*?)\]\(?(.*?)\)/i : /src=[\'\"]?([^\'\"]*)[\'\"]?/i; //匹配src属性
    let imgList = content.match(imgReg),
        srcList = [];
    for (let i in imgList) {
        let src = imgList[i].match(srcReg);
        srcList.push(src[1]);
    }
    return srcList;
}


export function getMarkDownImageSrc(content) {
    getImageSrc(content, true)
}

/**
 * 图片 base64转为文件
 * @param imageUrl
 * @param filename
 * @returns {File}
 */
export function base64ToFile(imageUrl, filename) {
    let arr = imageUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

/**
 * 图片 base64转为Blob
 * @param imageUrl
 * @returns {Blob}
 */
export function base64ToBlob(imageUrl) {
    let arr = imageUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

/*2:转bob*/
/**
 * 将以base64的图片url数据转换为Blob
 * @param base64    用url方式表示的base64图片数据
 * @return blob     返回blob对象
 */
export function convertBase64UrlToBlob(base64) {
    let type = base64.split(",")[0].match(/:(.*?);/)[1];//提取base64头的type如 'image/png'
    let bytes = atob(base64.split(',')[1]);//去掉url的头，并转换为byte (atob:编码 btoa:解码)

    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);//通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: type});
}

/**
 * Blob转base64
 * @param blob
 * @param callback
 */
export function blobToBase64(blob, callback) {
    let a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}
