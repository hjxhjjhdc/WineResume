/**
 *  时间转换
 */
export const secondToMinuteTime = (second) =>{
    const minute = Math.floor(second/60);
    const rest_seconds = second%60;
    return `${minute.toString().padStart(2, '0')}:${rest_seconds.toString().padStart(2, '0')}`
}
//获取浏览器
export const browerType=() =>{
    var ua = navigator.userAgent.toLocaleLowerCase();
    // 判断是否为IE(第一个是正常的IE，第二个是Edge，第三个是IE11)
    var isIE = (ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1) || (ua.indexOf("edge") > -1) || (ua.indexOf(
        'trident') > -1 && ua.indexOf("rv:11.0") > -1);
    // 判断是否为IE5678，!+[1,] 在IE5678返回true，在IE9、IE10、IE11返回false
    var isLteIE8 = isIE && !+[1,];
    // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
    var dm = document.documentMode,
        isIE5,
        isIE6,
        isIE7,
        isIE8,
        isIE9,
        isIE10,
        isIE11;
    if (dm) {
        isIE5 = dm === 5;
        isIE6 = dm === 6;
        isIE7 = dm === 7;
        isIE8 = dm === 8;
        isIE9 = dm === 9;
        isIE10 = dm === 10;
        isIE11 = dm === 11;
    } else {
        // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
        isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));
        // 判断是否为IE6，IE7开始有XMLHttpRequest对象
        isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
        // 判断是否为IE7，IE8开始有document.documentMode属性
        isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
        // 判断是否IE8
        isIE8 = isLteIE8 && document.documentMode;
        // 判断IE9，IE9严格模式中函数内部this不为undefined
        isIE9 = !isLteIE8 && (function () {
            "use strict";
            return !!this;
        }());
        // 判断IE10，IE10开始支持严格模式，严格模式中函数内部this为undefined
        isIE10 = isIE && !!document.attachEvent && (function () {
            "use strict";
            return !this;
        }());
        // 判断IE11，IE11开始移除了attachEvent属性
        isIE11 = isIE && !document.attachEvent;
    };
    // 因为字符串存在覆盖重复原因，判断顺序不可随意修改
    if (isIE5) return 'IE5';
    if (isIE6) return 'IE6';
    if (isIE7) return 'IE7';
    if (isIE8) return 'IE8';
    if (isIE9) return 'IE9';
    if (isIE10) return 'IE10';
    if (isIE11) return 'IE11';
    if (ua.indexOf('green') > -1) return '绿色浏览器';
    if (ua.indexOf('qq') > -1) return 'QQ浏览器';
    if (ua.indexOf('bidu') > -1) return '百度浏览器';
    if (ua.indexOf('lb') > -1) return '猎豹浏览器';
    if (ua.indexOf('world') > -1) return '世界之窗浏览器';
    if (ua.indexOf('2345') > -1) return '2345浏览器';
    if (ua.indexOf('maxthon') > -1) return '傲游浏览器';
    if (ua.indexOf('tao') > -1) return '淘宝浏览器';
    if (ua.indexOf('ubrowser') > -1) return 'UC浏览器';
    if (ua.indexOf('coolnovo') > -1) return '枫叶浏览器';
    if (ua.indexOf('opr') > -1) return 'opera浏览器';
    if (ua.indexOf('se') > -1) return '搜狗浏览器';
    if (ua.indexOf('firefox') > -1) return 'firefox浏览器';
    if (ua.indexOf('safari') > -1 && ua.indexOf("version") > -1) return ('safari浏览器');
    if (window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length) return '360浏览器';
    if (ua.indexOf("chrome") > -1 && window.chrome) return ('chrome浏览器');
    return '其他浏览器';
}

/*
// 获取浏览器类型
export function browerType() {
    // 获取浏览器 userAgent
    var ua = navigator.userAgent

    // 是否为 Opera
    var isOpera = ua.indexOf('Opera') > -1
    // 返回结果
    if (isOpera) { return 'Opera' }
    // 是否为 IE
    var isIE = (ua.indexOf('compatible') > -1) && (ua.indexOf('MSIE') > -1) && !isOpera
    var isIE11 = (ua.indexOf('Trident') > -1) && (ua.indexOf("rv:11.0") > -1)
    // 返回结果
    if (isIE11) { return 'IE11'
    } else if (isIE) {
        // 检测是否匹配
        var re = new RegExp('MSIE (\\d+\\.\\d+);')
        re.test(ua)
        // 获取版本
        var ver = parseFloat(RegExp["$1"])
        // 返回结果
        if (ver == 7) { return 'IE7'
        } else if (ver == 8) { return 'IE8'
        } else if (ver == 9) { return 'IE9'
        } else if (ver == 10) { return 'IE10'
        } else { return "IE" }
    }
    // 是否为 Edge
    var isEdge = ua.indexOf("Edge") > -1
    // 返回结果
    if (isEdge) { return 'Edge' }
    // 是否为 Firefox
    var isFirefox = ua.indexOf("Firefox") > -1
    // 返回结果
    if (isFirefox) { return 'Firefox' }
    // 是否为 Safari
    var isSafari = (ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") == -1)
    // 返回结果
    if (isSafari) { return "Safari" }
    // 是否为 Chrome
    var isChrome = (ua.indexOf("Chrome") > -1) && (ua.indexOf("Safari") > -1) && (ua.indexOf("Edge") == -1)
    // 返回结果
    if (isChrome) { return 'Chrome' }
    // 是否为 UC
    var isUC= ua.indexOf("UBrowser") > -1
    // 返回结果
    if (isUC) { return 'UC' }
    // 是否为 QQ
    var isQQ= ua.indexOf("QQBrowser") > -1
    // 返回结果
    if (isUC) { return 'QQ' }
    // 都不是
    return '其他浏览器'
}*/
