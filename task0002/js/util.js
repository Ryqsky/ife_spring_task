//task1.1 ʵ�ּ򵥼ӷ�
//function $(id) {
//    return document.getElementById(id);
//}
//function add(num1, num2) {
//    return num1 + num2;
//}
//function renderResult(result) {
//    $("result").innerHTML = result;
//}
//function addEventHandle() {
//    var num1 = $("num1").value;
//    var num2 = $("num2").value;
//    var result = add(num1, num2);
//    renderResult(result);
//}
//function initEvent() {
//    $("addbtn").addEventListener("click", addEventHandle, false);
//}

//task2.1 ʵ���жϸ����������͵ķ���

// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
    return !!fn
        && !fn.nodeName
        && fn.constructor != String
        && fn.constructor != RegExp
        && fn.constructor != Array
        && /function/i.test(fn + '');
}

// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
function cloneObject(src) {
    //���� ���� �ַ��� ���� null undefined
    if (src == null || typeof src != 'object') {
        return src;
    }
    //�������� ���� Object ����object�����������ж�
    if (src instanceof Date) {
        var clone = new Date(src.getDate());
        return clone;
    }

    if (src instanceof Array) {
        var clone = [];
        for (var i = 0, len = src.length; i < len; i++) {
            clone[i] = src[i];
        }
        return clone;
    }

    if (src instanceof Object) {
        var clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone
    }
}

//// ����������
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

// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
function uniqArray(arr) {
    var uniq = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] != '' && uniq.indexOf(arr[i]) < 0) {
            uniq.push(arr[i]);
        }
    }
    return uniq;
}
// ʹ��ʾ��

//var a = [1, 3, 5, 7, 5, 3];
//var b = uniqArray(a);
//console.log(b); // [1, 3, 5, 7]

// ��ϰͨ��ѭ�����Լ��ַ�����һЩ�����������ֱ�ɨ���ַ���strͷ����β���Ƿ��������Ŀհ��ַ�������ɾ�����ǣ���󷵻�һ�����ȥ�����ַ���
function simpleTrim(str) {
    for (var i = 0, len = str.length; i < len; i++) {
        if (str[i] != ' ') {
            break;
        }
    }
    for (var j = str.length - 1; j >= 0; j--) {
        if (str[j] != ' ') {
            break;
        }
    }
    return str.substring(i, j);
}
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
//var str = '   hi!   ';
//str = trim(str);
//console.log(str); // 'hi!'

// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}
// ʹ��ʾ��
//var arr = ['java', 'c', 'php', 'html'];
//function output(item, index) {
//    console.log(index + ': ' + item)
//}
//each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// ��ȡһ�����������һ��Ԫ�ص�����������һ������
function getObjectLength(obj) {
    var len = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            len++;
        }
    }
    return len;
}

//var obj = {
//    a: 1,
//    b: 2,
//    c: {
//        c1: 3,
//        c2: 4
//    }
//};
//console.log(getObjectLength(obj)); // 3

//task 2.4
function isEmail(emailStr) {
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

function isMobilePhone(phone) {
    phone = phone + '';
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}

//task 3.1
function hasClass(element, className) {
    return element.className.match(className);
}
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className += ' ' + newClassName;
    }
}

function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        element.className = element.className.replace(oldClassName, "");
    }
}

function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

function getPosition(element) {
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var parent = element.offsetParent;
    while (parent !== null) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    left -= scrollLeft;
    top -= scrollTop;
    return {
        x: left,
        y: top
    }
}

function $(selector) {
    var allchilds = [];
    var childs = function (element) {
        return element.getElementsByTagName('*');
    }

    var ele = document.getElementsByTagName('html')[0];
    var sele = selector.replace(/\s+/, ' ').split(' ');

    for (var i = 0, len = sele.length; i < len; i++) {
        ele = childs(ele);
        var elelen = ele.length;
        var isGet = false;
        switch (sele[i][0]) {
            case '#':
                for (var j = 0; j < elelen; j++) {
                    if (ele[j].id === sele[i].substring(1)) {
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
            case '.':
                for (var j = 0; j < elelen; j++) {
                    var name = uniqArray(ele[j].className.split(' '));
                    if (name.indexOf(sele[i].substring(1)) !== -1) {
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
            case '[':
                var valueLoc = sele[i].indexOf("=");
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < elelen; j++) {
                        if (ele[j][key] === value) {
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                } else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < elelen; j++) {
                        if (ele[j][key]) {
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                }
                break;
            default :
                for (var j = 0; j < elelen; j++) {
                    if (ele[j].tagName === sele[i].toUpperCase()) {
                        ele = ele[j];
                        isGet = true;
                        break;
                    }
                }
                break;
        }
    }

    if (!isGet) {
        ele = null;
    }

    return ele;
}



//task 4.1

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
}

function removeEvent(element, event, listener) {
    if (element.removeEventListenr) {
        element.removeEventListenr(event, listener);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    }
}

function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function (event) {
        if (event.keyCode == 13) {
            listener();
        }
    });
}

function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (event) {
        var target = event.target || event.srcElement;
        if (target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, event);
        }
    });
}

$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
};
$.click = function(selector, listener) {
    addClickEvent($(selector), listener);
};
$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listener);
};
$.delegate = function(selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener);
};


//$.delegate($("#list"), "li", "click", clickHandle);


//task 5.1

function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    var ie = ua.match(/rv:([\d.]+)/) || ua.match(/msie ([\d.]+)/)
    if (ie) {
        return ie[1];
    } else {
        return -1;
    }
}

function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(cookieName) {
    var re = new RegExp(cookieName + '=(.*?)($|;)');
    return re.exec(document.cookie)[1];
}

//function checkCookie()
//{
//    var username=getCookie('username');
//    if (username!=null && username!="")
//    {alert('Welcome again '+username+'!');}
//    else
//    {
//        username=prompt('Please enter your name:',"");
//        if (username!=null && username!="")
//        {
//            setCookie('username',username,365);
//        }
//    }
//}
//checkCookie();

//
function ajax(url, options) {
    // ��������

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (options.data) {
        var dataArr = [];
        for (var item in options.data) {
            dataArr.push(item + '=' + encodeURI(options.data[item]));
        }
        var data = dataArr.join('&');
    }

    if (!options.type) {
        options.type = 'GET';
    }
    options.type = options.type.toUpperCase();

    if (options.type === 'GET') {
        var myURL = '';
        if (options.data) {
            myURL = url + '?' + data;
        } else {
            myURL = url;
        }
        xmlhttp.open('GET', myURL, true);
        xmlhttp.send();

    } else {
        if (options.type === 'POST') {
            xmlhttp.open('POST', url, true);
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urllencoded');
            xmlhttp.send(data);
        }
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
                }
            } else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    }
}


//ajax(
//    'http://www.ruanyq.com/prompt.php',
//    {
//        data: {
//            q: 'a'
//        },
//        onsuccess: function (responseText, xhr) {
//            console.log(responseText);
//        },
//        onfail: function () {
//            console.log("fail");
//        }
//    }
//);