/**
 * Created by Ryq on 2015/7/19.
 */
var activeID = 1;
var timerInner = null;
var icoArr = $(".icoBox").getElementsByTagName('a');
var imgWidth = $("img").offsetWidth;
for (var i = 0, len = icoArr.length; i < len; i++) {
    icoArr[i].index = i + 1;
}
t = setInterval(rotate, 2000);
console.log($(".imageBox").offsetLeft);
function rotate(clickID) {
    if (clickID) {
        nextID = clickID ;
    } else {
        var nextID = activeID <= 4 ? activeID + 1 : 1;
    }
    startMove( (nextID - 1) * -imgWidth);
    removeClass(icoArr[activeID - 1],"active");
    addClass(icoArr[nextID - 1],"active")
    activeID = nextID;
}
$.delegate(".icoBox", "a", "click", function () {
    clearInterval(t);
    var clickID = this.index;
    rotate(clickID);
    t = setInterval(rotate, 2000);
});
function startMove(target){
    clearInterval(timerInner);
    timerInner = setInterval(function(){
        var speed = (target - $(".imageBox").offsetLeft) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        console.log($(".imageBox").offsetLeft);
        console.log(speed);
        $(".imageBox").style.left = $(".imageBox").offsetLeft + speed + "px";
    },20);
}