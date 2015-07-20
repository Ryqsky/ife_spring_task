/**
 * Created by Ryq on 2015/7/19.
 */
var activeID = 1;
var timerInner = null;
var icoArr = $(".icoBox").getElementsByTagName('a');
var imgWidth = $("img").offsetWidth;
var imageBox = $(".imageBox");
for (var i = 0, len = icoArr.length; i < len; i++) {
    icoArr[i].index = i + 1;
}
t = setInterval(rotate, 3000);
console.log(imageBox.offsetLeft);
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
$.delegate(".icoBox", "a", "click", function () {
    clearInterval(t);
    var clickID = this.index;
    rotate(clickID);
    t = setInterval(rotate, 3000);
});
function startMove(target) {
    clearInterval(timerInner);
    timerInner = setInterval(function () {
        var speed = (target - imageBox.offsetLeft) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        imageBox.style.left = imageBox.offsetLeft + speed + "px";
    }, 20);
}
$.on("#prev", "click", prev);
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
$.on("#next", "click", next);
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
$.on("#stop", "click", stop);
function stop() {
    clearInterval(t);
}