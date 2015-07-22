/**
 * 工具函数
 * @param arr
 */

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn == 'function';
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    //对于数字、字符串、布尔
    if (typeof src == null || typeof src !== 'object') {
        return src;
    }
    //对于Date
    if (src instanceof Date) {
        var clone = new Date(src);
        return clone;
    }
    //对于数组
    if (src instanceof Array) {
        var clone = [];
        for (var i = 0, len = src.length; i < len; i++) {
            clone[i] = src[i];
        }
        return clone;
    }
    //对于Object对象
    if (src instanceof Object) {
        var clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone;
    }
}
// 测试用例：
//var srcObj = {
//    a: 1,
//    b: {
//        b1: ["hello", "hi"],
//        b2: "JavaScript"
//    }
//};
//var abObj = srcObj;
//var tarObj = cloneObject(srcObj);
//
//srcObj.a = 2;
//srcObj.b.b1[0] = "Hello";
//
//console.log(abObj.a);
//console.log(abObj.b.b1[0]);
//
//console.log(tarObj.a);      // 1
//console.log(tarObj.b.b1[0]);    // "hello"


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var uniq = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (uniq.indexOf(arr[i]) == -1) {
            uniq.push(arr[i]);
        }
    }
    return uniq;
}
// 使用示例
//var a = [1, 3, 5, 7, 5, 3];
//var b = uniqArray(a);
//console.log(b); // [1, 3, 5, 7]

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
//var str = '   hi!  ';
//str = trim(str);
//console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}
// 其中fn函数可以接受两个参数：item和index
// 使用示例
//var arr = ['java', 'c', 'php', 'html'];
//function output(item, index) {
//    console.log(index + ': ' + item)
//}
//each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var len = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            len++;
        }
    }
    return len;
}

// 使用示例
//var obj = {
//    a: 1,
//    b: 2,
//    c: {
//        c1: 3,
//        c2: 4
//    }
//};
//console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^\w+@\w+.(\w+.)?\w+$/g.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /\d{11}/g.test(phone);
}

//Task 3

function hasClass(element, oldClassName) {
    return element.className.indexOf(oldClassName) !== -1;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className = element.className + ' ' + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        element.className = element.className.replace(oldClassName, '');
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    return element.getBoundingClientRect();
}

function newGetPosition(element) {
    var X = element.offsetLeft;
    var Y = element.offsetTop;
    var eleParent = element.offsetParent;
    while (eleParent) {
        X += eleParent.offsetLeft;
        Y += eleParent.offsetTop;
        eleParent = eleParent.offsetParent;
    }
    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    console.log(scrollTop);
    X -= scrollLeft;
    Y -= scrollTop;
    return {
        x: X,
        y: Y
    }
}

//实现一个简单的Query
function $(selector) {
    var sele = selector.split(' ');
    var ele;
    var isGet = false;
    for (var i = 0, seleLen = sele.length; i < seleLen; i++) {
        if (!ele) {
            ele = document.getElementsByTagName('html')[0];
        }
        var childs = ele.getElementsByTagName('*');
        var len = childs.length;
        switch (sele[i][0]) {
            case '#':
                sele[i] = sele[i].replace('#', '');
                for (var j = 0; j < len; j++) {
                    if (childs[j].id == sele[i]) {
                        ele = childs[j];
                        isGet = true
                        break;
                    }
                }
                break;
            case '.':
                sele[i] = sele[i].replace('.', '');
                for (var j = 0; j < len; j++) {
                    if (childs[j].className.indexOf(sele[i]) !== -1) {
                        ele = childs[j];
                        isGet = true
                        break;
                    }
                }
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1)
                    for (var j = 0; j < len; j++) {
                        if (childs[j][key] == value) {
                            ele = childs[j];
                            isGet = true;
                            break;
                        }
                    }
                } else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < len; j++) {
                        if (childs[j][key]) {
                            ele = childs[j];
                            isGet = true;
                            break;
                        }
                    }
                }
                break;
            default :
                ele = ele.getElementsByTagName(sele[i])[0];
                isGet = true;
                break;
        }
    }
    if (!isGet) {
        ele = null;
    }
    return ele;
}

// 可以通过id获取DOM对象，通过#标示，例如
//$("#result"); // 返回id为adom的DOM对象
//
//// 可以通过tagName获取DOM对象，例如
//$("a"); // 返回第一个<a>对象
//
//// 可以通过样式名称获取DOM对象，例如
//$(".classa"); // 返回第一个样式定义包含classa的对象
//
//// 可以通过attribute匹配获取DOM对象，例如
//$("[data-log]"); // 返回第一个包含属性data-log的对象
//
//$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
//
//// 可以通过简单的组合提高查询便利性，例如
//$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

//给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
}

//function addEvent(element, event, listener) {
//    element['on' + event] = listener;
//}

// 例如：
//function clicklistener(event) {
//    console.log(event);
//}
//addEvent($("#list"), "click", clicklistener);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', function (e) {
        if (e.keyCode == 13) {
            listener();
        }
    });
}

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (e) {
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, e);
        }
    });
}

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应


$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
}

$.click = function (selector, listener) {
    addClickEvent($(selector), event, listener);
}

$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener);
}

$.delegate = function (selector, tag, eventName, listener) {
    delegateEvent($(selector), tag, eventName, listener);
}


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var s = navigator.userAgent.toLowerCase()
    var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
    if (ie) {
        return ie[1];
    } else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    if (expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        var expires = ";expires=" + exdate.toGMTString();
    } else {
        var expires = '';
    }
    document.cookie = cookieName + "=" + escape(cookieValue) + expires;
}

// 获取cookie值
function getCookie(cookieName) {
    var re = new RegExp(cookieName + '=(.*?)(;|$)')
    return re.exec(document.cookie)[1];
}
//console.log(getCookie("username"));


function ajax(url, options) {
    //处理数据
    var dataResult = '';
    for (var key in options.data) {
        dataResult = dataResult + key + '=' + encodeURI(options.data[key]) + "&";
    }
    dataResult = dataResult.substring(0, dataResult.length - 1);
    console.log(dataResult);
    //处理传输方式
    if (!options.type) {
        options.type = 'GET';
    }

    //创建对象
    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    //发送请求
    if (options.type === 'GET') {
        if (!dataResult){
            xmlhttp.open(options.type, url, true);
        }else{
            xmlhttp.open(options.type, url + '?' + dataResult, true);
        }
        xmlhttp.send();
    } else if (options.type === 'POST') {
        xmlhttp.open(options.type, url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(dataResult);
    }

    //readyState
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4){
            if (xmlhttp.status === 200){
                if (options.onsuccess){
                    options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
                }
            }else{
                if (options.onfail){
                    options.onfail();
                }
            }
        }
    }
}
