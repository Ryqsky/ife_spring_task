/**
 * Created by Ryq on 2015/7/20.
 */
var word = $('.prompt').getElementsByTagName('li');
var choose = -1;
var next = 0;
var resultLen;
for (var i = 0, len = word.length; i < len; i++) {
    word[i].index = i + 1;
}
$.on("#import", "keyup", showHint);
function showHint(e) {
    var str = $("#import").value;
    if (str == '') {
        clear();
        return;
    }

    if (window.event) {                          // 获取键盘按下的字符
        var keynum = e.keyCode;
    }
    else if (e.which) {
        var keynum = e.which;
    }

    switch (keynum) {
        case 38 :
            if (choose > 0) {
                next = choose - 1;
                word[next].className = 'choose';
                word[choose].className = '';
                choose = next;
            }
            break;
        case 40 :
            if (next < resultLen - 1) {
                if (choose !== -1) {
                    word[choose].className = '';
                }
                next = choose + 1;
                word[next].className = 'choose';
                choose = next;
            }
            break;
        case 13 :
            $("#import").value = word[choose].innerHTML;
            clear();
            break;
        default :
            ajax(
                'prompt.php',
                {
                    data: {
                        q: str
                    },
                    onsuccess: function (responseText, xhr) {
                        clear();
                        result = responseText.replace(/\s+/g, '').split(',');
                        for (var i = 0, len = result.length; i < len; i++) {
                            word[i].innerHTML = result[i];
                        }
                        resultLen = result.length;
                    },
                    onfail: function () {
                        console.log("onfail");
                    }
                }
            );
            break;
    }
    console.log(choose);
}

$.delegate('.prompt', 'li', 'click', function () {
    $("#import").value = word[this.index - 1].innerHTML;
    clear();
});

$.delegate('.prompt', 'li', 'mouseover', function () {
    word[this.index - 1].className = 'choose';
});

$.delegate('.prompt', 'li', 'mouseout', function () {
    word[this.index - 1].className = '';
});

function clear() {
    choose = -1;
    next = 0;
    for (var i = 0, len = word.length; i < len; i++) {
        word[i].innerHTML = '';
        word[i].className = '';
    }
}