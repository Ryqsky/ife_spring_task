/**
 * Created by Ryq on 2015/7/16.
 */
function out(){
    var date = $("#textarea").value;
    date = date.split(/\,|\s|\t/);
    date = uniqArray(date);
    if (date.length > 10 || date.length == 0){
        $("#tip").style.display = "block" ;
        return ;
    }else{
        $("#tip").style.display = "none" ;
    }
    $("#result").innerHTML = "<h3>Interests: </h3>";
    for (var i = 0, len = date.length; i < len; i++){
        $("#result").innerHTML += "<label><input name='Fruit' type='checkbox' />" + date[i] + "</label><br/>";
    }
}
function reset(){
    $("#result").innerHTML = "";
    $("#textarea").value = "";
}
addEvent($("#submit"),"click",out);
addEvent($("#reset"),"click",reset);