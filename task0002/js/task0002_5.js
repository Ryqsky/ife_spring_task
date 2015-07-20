/**
 * Created by Ryq on 2015/7/20.
 */
/**
 * 定义
 * @type {NodeList|jQuery}
 */
var startX;
var startY;
var startTop;
var startLeft;
var elePosition;
var drag = $('.drag-container').getElementsByClassName('drag');
var wrap = $('.drag-container').getElementsByClassName('drag-wrap');
;
/**
 * 事件函数
 */
window.onload = function () {
    for (var i = 0, len = drag.length; i < len; i++) {
        drag[i].draggable = true;
        drag[i].style.top = (i % 6 ) * 41 + 'px';
        addEvent(drag[i], 'drag', dragging);
        addEvent(drag[i], 'dragstart', dragStart);
    }
    addEvent(document.body, 'drop', drop);
    addEvent(document.body, 'dragover', dragOver);
}
function dragStart(e) {
    e = e || window.event;
    startX = e.clientX;
    startY = e.clientY;
    var parent = this.parentNode;
    startTop = parseInt(this.style.top);
    startLeft = parent.offsetLeft;
    this.style.zIndex = 1;
    moveDrag(nextDrag(this), -41);
}

function dragging(e) {
    if (this.className !== 'dragging') {
        this.className = 'dragging';
    }
}

function dragOver(e) {
    e.preventDefault();
}
function drop(e) {
    e = e || window.event;
    var moveX = e.clientX - startX;
    var moveY = e.clientY - startY;
    var top = startTop + moveY;
    var left = startLeft + moveX;
    var location = [];
    if (left < 211) {
        location[0] = 0;
    } else if (left < 473) {
        location[0] = 1;
    } else {
        location[0] = 2;
    }
    var tgWrap = wrap[location[0]];
    var tgLength = tgWrap.getElementsByClassName('drag').length;

    var tgHeight = tgLength * 41;

    if (top > tgHeight) {
        location[1] = tgLength;
    } else {
        location[1] = Math.round(top / 41);
    }
    var tgDrag = tgWrap.getElementsByClassName('drag')[location[1]];
    if (tgDrag) {
        var tgTop = parseInt(tgDrag.style.top);
        console.log(tgTop);
    } else {
        var tgTop = location[1] * 41;
        console.log(tgTop);
    }
    moveDrag(tgDrag, 41);
    var dragging = document.getElementsByClassName('dragging')[0];
    dragging.style.top = tgTop + 'px';
    dragging.style.zIndex = 0;
    dragging.className = 'drag';
    tgWrap.insertBefore(dragging, tgDrag);
}

/**
 * 工具函数
 */
function moveDrag(element, target) {
    while (element) {
        element.style.top = parseInt(element.style.top) + target + 'px';
        element = nextDrag(element);
    }
}
function nextDrag(element) {
    var borther = element.nextSibling;
    while (borther !== null && borther.nodeName === "#text") {
        borther = nextDrag(borther);
    }
    return borther;
}
