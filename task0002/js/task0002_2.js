/**
 * Created by Ryq on 2015/7/19.
 */
//绑定事件
$.on("#submit","click",timer);
$.on("#reset","click",reset);

function timer() {
    var timer = $("#import").value;
    timer = timer.split("-");
    if (timer.length !== 3) {
        $("#tip").style.display = "block";
    } else {
        t = setTimeout('timer()', 1000);

        var future = new Date();
        future.setFullYear(timer[0], timer[1] - 1, timer[2]);
        future.setHours(0, 0, 0, 0)
        var now = new Date();

        if (future - now < 0) {
            clearTimeout(t);
            $("#tip").style.display = "block";
            return;
        }

        var day = Math.floor((future - now) / 1000 / 60 / 60 / 24);
        var hours = Math.floor((future - now) / 1000 / 60 / 60) - (day * 24);
        var minutes = Math.floor((future - now) / 1000 / 60) - (day * 24 * 60) - (hours * 60);
        var seconds = Math.floor((future - now) / 1000) - (day * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        $("#tip").style.display = "none";
        $("#result").innerHTML = '距离' + timer[0] + '年'
            + timer[1] + '月' + timer[2] + '日'
            + '还有' + day + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
    }
}

function reset() {
    clearTimeout(t);
    $("#result").innerHTML = "";
    $("#import").value = "";
    $("#tip").style.display = "none";
}