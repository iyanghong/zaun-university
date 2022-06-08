/**
 * Created by yh on 2021/7/25
 */
import {loadJs, loadCss} from "@/utils/async-load";

export function loadXLSX() {
    return new Promise((resolve, reject) => {
        loadJs('https://cdn.bootcdn.net/ajax/libs/xlsx/0.16.9/xlsx.min.js').then(() => {
            if (window.XLSX) {
                resolve(window.XLSX);
            } else {
                reject(new Error('无法加载[XLSX]'));
            }
        })
    })
}

export function loadHighlight() {
    loadCss('https://cdn.bootcdn.net/ajax/libs/highlight.js/10.5.0/styles/github.min.css');
    return new Promise((resolve, reject) => {
        loadJs('https://cdn.bootcdn.net/ajax/libs/highlight.js/10.5.0/highlight.min.js').then(() => {
            if (window.hljs) {
                resolve(window.hljs);
            } else {
                reject(new Error('无法加载[highlight]'))
            }

        })
    });
}

export function loadEcharts() {
    return new Promise((resolve, reject) => {
        loadJs('https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js').then(() => {
            if (window.echarts) {
                resolve(window.echarts);
            } else {
                reject(new Error('无法加载[echarts]'))
            }
        })
    })
}

export function loadAddressData() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/AddressData.js').then(() => {
            if (window.addressData) {
                resolve(window.addressData);
            } else {
                reject(new Error('无法加载[addressData]'))
            }
        })
    })
}


export function loadQuillEmoji() {
    return new Promise((resolve, reject) => {
        loadCss('https://resources.iyanghong.cn/vendor/quill-emoji/quill-emoji.css');
        loadJs('https://resources.iyanghong.cn/vendor/quill-emoji/quill-emoji.js').then(() => {
            if (window.QuillEmoji) {
                resolve(window.QuillEmoji);
            } else {
                reject(new Error('无法加载[QuillEmoji]'))
            }
        })
    })
}

export function loadQuillHtmlEditButton() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/quill-html-edit-button/quill.htmlEditButton.min.js').then(() => {
            if (window.htmlEditButton) {
                resolve(window.htmlEditButton);
            } else {
                reject(new Error('无法加载[htmlEditButton]'))
            }
        })
    })
}

export function loadQuillImageResize() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/quill-image-resize-module/image-resize.min.js').then(() => {
            if (window.ImageResize) {
                resolve(window.ImageResize);
            } else {
                reject(new Error('无法加载[ImageResize]'))
            }
        })
    })
}


export function loadQuillMarkdownToolbar() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/quill-markdown-toolbar/markdownToolbar.min.js').then(() => {
            if (window.MarkdownToolbar) {
                resolve(window.MarkdownToolbar);
            } else {
                reject(new Error('无法加载[MarkdownToolbar]'))
            }
        })
    })
}


export function loadMavonEditor() {
    return new Promise((resolve, reject) => {
        loadCss('https://resources.iyanghong.cn/vendor/mavon-editor/css/index.css')
        loadJs('https://resources.iyanghong.cn/vendor/mavon-editor/mavon-editor.js').then(() => {
            if (window.MavonEditor) {
                resolve(window.MavonEditor);
            } else {
                reject(new Error('无法加载[MavonEditor]'))
            }
        })
    })
}


export function loadTopology() {
    return new Promise((resolve, reject) => {
        loadCss('https://resources.iyanghong.cn/vendor/markdown-topology-editor/markdown-topology-editor.css')
        loadJs('https://resources.iyanghong.cn/vendor/markdown-topology-editor/markdown-topology-editor.umd.min.js').then(() => {
            if (window['markdown-topology-editor']) {
                resolve(window['markdown-topology-editor']);
            } else {
                reject(new Error('无法加载[markdown-topology-editor]'))
            }
        })
    })
}


export function loadChinaMapJson() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/echarts/map/china.umd.js').then(() => {
            if (window['echartsChinaMap']) {
                resolve(window['echartsChinaMap']);
            } else {
                reject(new Error('无法加载[echartsChinaMap]'))
            }
        })
    })
}

export function loadVueMarkdown() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/vue-markdown/vue-markdown.js').then(() => {
            if (window['VueMarkdown']) {
                resolve(window['VueMarkdown']);
            } else {
                reject(new Error('无法加载[VueMarkdown]'))
            }
        })
    })
}
export function loadKatexCss() {
    return new Promise(resolve => {
        loadCss('https://unpkg.com/katex@0.13.18/dist/katex.min.css').then(() => {
            resolve();
        });
    })
}

export function loadMarkdownIt() {

    return new Promise((resolve, reject) => {
        loadJs('https://cdn.bootcdn.net/ajax/libs/markdown-it/12.1.0/markdown-it.min.js').then(() => {

            if (window['markdownit']) {
                resolve(window['markdownit']);
            } else {
                reject(new Error('无法加载[markdownit]'))
            }
        })
    })
}


export function loadToolGsap() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/gsap.min.js').then(() => {
            if (window['gsap']) {
                resolve(window['gsap']);
            } else {
                reject(new Error('无法加载[gsap]'))
            }
        })
    })
}


export function loadToolMultiavatar() {
    return new Promise((resolve, reject) => {
        loadJs('https://resources.iyanghong.cn/vendor/multiavatar.min.js').then(() => {
            if (window['multiavatar']) {
                resolve(window['multiavatar']);
            } else {
                reject(new Error('无法加载[multiavatar]'))
            }
        })
    })
}


export function loadToolTrianglify() {
    return new Promise((resolve, reject) => {
        loadJs('https://unpkg.com/trianglify@^4/dist/trianglify.bundle.js').then(() => {
            if (window['trianglify']) {
                resolve(window['trianglify']);
            } else {
                reject(new Error('无法加载[trianglify]'))
            }
        })
    })
}

export function loadBaiduMap() {
    return new Promise((resolve, reject) => {
        loadJs('https://unpkg.com/vue-baidu-map').then(() => {
            if (window['VueBaiduMap']) {
                resolve(window['VueBaiduMap']);
            } else {
                reject(new Error('无法加载[VueBaiduMap]'))
            }
        })
    })
}
