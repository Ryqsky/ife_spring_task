/**
 * Created by Ryq on 2015/7/19.
 */
//初始化数据
var activeID = 1; //当前显示ID
var timerInner = null;
var icoArr = $(".icoBox").getElementsByTagName('a');
var imgWidth = $(".rotateImg").offsetWidth;
var imageBox = $(".imageBox");
for (var i = 0, len = icoArr.length; i < len; i++) {
    icoArr[i].index = i + 1;
}

//页面加载成功时，开始轮播
window.onload = function(){
    t = setInterval(rotate, 3000);
}

//绑定事件
$.delegate(".icoBox", "a", "click", function () {
    clearInterval(t);
    var clickID = this.index;
    rotate(clickID);
    t = setInterval(rotate, 3000);
});
$.on("#prev", "click", prev);
$.on("#next", "click", next);
$.on("#stop", "click", stop);

//轮播图主函数
function rotate(clickID) {
    if (clickID) {
        nextID = clickID;
    } else {
        var nextID = activeID <= 4 ? activeID + 1 : 1;
    }
    startMove((nextID - 1) * -imgWidth);
    removeClass(icoArr[activeID - 1], "active");
    addClass(icoArr[nextID - 1], "active")
    activeID = nextID;
}

//开始移动函数
function startMove(target) {
    clearInterval(timerInner);
    timerInner = setInterval(function () {
        var speed = (target - imageBox.offsetLeft) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        imageBox.style.left = imageBox.offsetLeft + speed + "px";
        if(speed == 0){
            clearInterval(timerInner);
        }
    }, 20);
}

//点击上一张
function prev() {
    clearInterval(t);
    if (activeID == 1) {
        var clickID = 5;
    } else {
        var clickID = activeID - 1;
    }
    rotate(clickID);
    t = setInterval(rotate, 3000);
}

//点击下一张
function next() {
    clearInterval(t);
    if (activeID == 5) {
        var clickID = 1;
    } else {
        var clickID = activeID + 1;
    }
    rotate(clickID);
    t = setInterval(rotate, 3000);
}

//停止
function stop() {
    clearInterval(t);
}