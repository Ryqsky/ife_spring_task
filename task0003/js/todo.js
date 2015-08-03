/**
 * Created by Ryq on 2015/7/26.
 */


//全局变量
var currentCateId = -1; //当前分类id
var currentCateTable = "AllCate"; //当前分类表
var currentTaskId = -1; //当前任务 id

//初始化
initDataBase();
createCates();
initModal();
cateTaskStatusController();
createTask(queryTasks());
createContent(currentTaskId);
addClass($("[taskid]"), "active");
//初始化数据
function initDataBase() {
    if (localStorage.cate || !localStorage.childCate || !localStorage.task) {

        var cateJson = [
            {
                "id": 0,
                "name": "默认分类",
                "child": [0]
            }
        ];

        var childCateJson = [
            {
                "id": 0,
                "pid": 0,
                "name": "默认子分类",
                "child": [-1],
            }
        ];

        var taskJson = [
            {
                "id": -1,
                "pid": 0,
                "finish": true,
                "name": "GTD Tools",
                "date": "2015-06-05",
                "content": "这是GTD Tools应用。",
            }
        ];

        localStorage.cate = JSON.stringify(cateJson);
        localStorage.childCate = JSON.stringify(childCateJson);
        localStorage.task = JSON.stringify(taskJson);
    }
}

//初始化分类模式
function initModal() {
    var cates = queryCates();
    var optionStr = "<option value=-1>新增主分类</option>";
    for (var i = 0, len = cates.length; i < len; i++) {
        if (cates[i].id != 0) {
            optionStr += "<option value=" + cates[i].id + ">" + cates[i].name + "</option>"
        }
    }
    $("#modal-select").innerHTML = optionStr;
}


//-----------------获取---------------------

//获取分类
function queryCates() {
    return JSON.parse(localStorage.cate);
}

//通过ID获取分类
function queryCatesByID(ID) {
    var cates = queryCates();
    for (var i = 0, len = cates.length; i < len; i++) {
        if (cates[i].id == ID) {
            return cates[i];
        }
    }
}

//通过主分类ID查询任务个数
function queryTasksLengthByCateID(ID) {
    var cate = queryCatesByID(ID);
    var result = 0;
    for (i = 0, len = cate.child.length; i < len; i++) {
        var childCate = queryChildCatesByID(cate.child[i]);
        result += childCate.child.length;
    }
    return result;
}

//获取子分类
function queryChildCates() {
    return JSON.parse(localStorage.childCate);
}

//通过主分类ID获取子分类
function queryChildCatesBycateID(cateID) {
    var cate = queryCatesByID(cateID);
    var childCates = queryChildCates();
    var tempChildCates = [];
    for (var i = 0, len = childCates.length; i < len; i++) {
        if (cate.child.indexOf(childCates[i].id) !== -1) {
            tempChildCates.push(childCates[i]);
        }
    }
    return tempChildCates;
}

//通过ID获取子分类
function queryChildCatesByID(ID) {
    var childCates = queryChildCates();
    for (var i = 0, len = childCates.length; i < len; i++) {
        if (childCates[i].id == ID) {
            return childCates[i];
        }
    }
}

//获取任务
function queryTasks(status) {
    var tasksArr = JSON.parse(localStorage.task);
    var resultArr = [];
    if (status !== undefined) {
        for (var i = 0; i < tasksArr.length; i++) {
            if (status) {
                if (tasksArr[i].finish === true) {
                    resultArr.push(tasksArr[i]);
                }
            } else {
                if (tasksArr[i].finish === false) {
                    resultArr.push(tasksArr[i]);
                }
            }
        }
        return resultArr;
    } else {
        return tasksArr;
    }
}

//通过主分类ID获取任务
function queryTasksByCateID(cateID, status) {
    var cateChild = queryCatesByID(cateID).child;
    var tempTasks = [];
    for (var i = 0, len = cateChild.length; i < len; i++) {
        if (status !== undefined) {
            tempTasks = tempTasks.concat(queryTasksByChildCateID(cateChild[i], status));
        } else {
            tempTasks = tempTasks.concat(queryTasksByChildCateID(cateChild[i]));
        }
    }
    return tempTasks;
}

//通过子分类ID获取任务
function queryTasksByChildCateID(childCateID, status) {
    var resultArr = [];
    var tempArr = queryChildCatesByID(childCateID).child;
    for (var i = 0; i < tempArr.length; i++) {
        var task = queryTasksByID(tempArr[i]);
        if (status !== undefined) {
            if (status) {
                if (task.finish === true) {
                    resultArr.push(task);
                }
            } else {
                if (task.finish === false) {
                    resultArr.push(task);
                }
            }
        } else {
            resultArr.push(task);
        }
    }
    return resultArr;
}

//通过ID获取任务
function queryTasksByID(ID) {
    var tasks = JSON.parse(localStorage.task);
    for (var i = 0, len = tasks.length; i < len; i++) {
        if (tasks[i].id == ID) {
            return tasks[i];
        }
    }
}

//通过日期获取任务
function queryTasksByDateInTaskArr(date, taskArr) {
    var tempTasks = [];
    for (var i = 0, len = taskArr.length; i < len; i++) {
        if (taskArr[i].date == date) {
            tempTasks.push(taskArr[i]);
        }
    }
    return tempTasks;
}

//显示数据库状态
function showJson() {
    console.log("-------显示数据库状态--------");
    console.log("主分类:");
    console.log(queryCates());
    console.log("子分类:");
    console.log(queryChildCates());
    console.log("任务:");
    console.log(queryTasks());
    console.log("-----------------------------");
}


// ---------------------创建--------------------

//创建分类
function createCates() {
    var cates = queryCates();
    var childCates = queryChildCates();
    var catesName = "";
    var childCatesName = [];
    var listr = "";
    for (var i = 0, len = cates.length; i < len; i++) {
        if(i === 0){
            for (var j = 0, clen = cates[i].child.length; j < clen; j++) {
                listr +=
                    "<li><h3" + " " + "cateid=" + childCates[cates[i].child[j]].id
                    + " " + "onclick=" + "clickCate(this)" + ">" + childCates[cates[i].child[j]].name
                    + "(" + childCates[cates[i].child[j]].child.length + ')</h3></li>';
            }
            childCatesName.push(listr);
            listr =
                '<li><h2 cateid= '+ cates[i].id + ' onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>'+ cates[i].name +'</span> ('+ queryTasksLengthByCateID(cates[i].id) + ')</h2></li><ul>' + childCatesName[i] + '</ul>';
            catesName += listr;
            listr = "";
        }else{
            for (var j = 0, clen = cates[i].child.length; j < clen; j++) {
                listr +=
                    "<li><h3" + " " + "cateid=" + childCates[cates[i].child[j]].id
                    + " " + "onclick=" + "clickCate(this)" + ">" + childCates[cates[i].child[j]].name
                    + "(" + childCates[cates[i].child[j]].child.length + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h3></li>';
            }
            childCatesName.push(listr);
            listr =
                '<li><h2 cateid= '+ cates[i].id + ' onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>'+ cates[i].name +'</span> ('+ queryTasksLengthByCateID(cates[i].id) + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h2></li><ul>' + childCatesName[i] + '</ul>';
            catesName += listr;
            listr = "";
        }
    }
    $('#listContent').innerHTML = "<ul>" + catesName + "</ul>";
    $("#list-title span").innerHTML = queryTasks().length;
}

//创建日期数据
function createDateData(taskArr) {
    var dateArr = [];
    var newDateTasks = [];

    for (var i = 0, len = taskArr.length; i < len; i++) {
        if (dateArr.indexOf(taskArr[i].date) == -1) {
            dateArr.push(taskArr[i].date);
        }
    }
    dateArr = dateArr.sort();
    for (var j = 0, jlen = dateArr.length; j < jlen; j++) {
        var tempObject = {
            date: dateArr[j],
            tasks: queryTasksByDateInTaskArr(dateArr[j], taskArr),
        };
        newDateTasks.push(tempObject);

    }
    currentTaskId = newDateTasks[0].tasks[0].id;
    return newDateTasks;
}

//创建任务
function createTask(taskArr) {
    var result = "";
    if (taskArr.length == 0) {
        result = "";
    } else {
        var taskList = createDateData(taskArr);
        for (i = 0, len = taskList.length; i < len; i++) {
            var listr = "<div>" + taskList[i].date + "</div>";

            for (j = 0 , jlen = taskList[i].tasks.length; j < jlen; j++) {

                if (taskList[i].tasks[j].finish) {
                    listr += "<li" + ' class="task-done" taskid=' + taskList[i].tasks[j].id + " " +
                        "onclick=" + "clickTask(this)" + '><i class="fa fa-check"></i>' + taskList[i].tasks[j].name + "</li>";
                }else{
                    listr += "<li" + " " + "taskid=" + taskList[i].tasks[j].id + " " +
                        "onclick=" + "clickTask(this)" + ">" + taskList[i].tasks[j].name + "</li>";
                }

            }
            result += listr;
        }
    }
    $('#task-list').innerHTML = "<ul>" + result + "</ul>";

}

//创建内容
function createContent(taskID) {
    var task = queryTasksByID(taskID);
    if (taskID !== undefined) {
        $('.todo-name').innerHTML = task.name;
        $('.task-date').innerHTML = task.date;
        $('.content').innerHTML = task.content;
        var manipulate = $(".manipulate");
        if (task.finish) { //若已完成
            manipulate.innerHTML = "";
        } else { //未完成
            manipulate.innerHTML = '<a onclick="checkTaskDone()"><i class="fa fa-check-square-o"></i></a><a onclick="changeTask()"><i class="fa fa-pencil-square-o"></i></a>';
        }
    } else {
        $('.todo-name').innerHTML = " ";
        $('.task-date').innerHTML = " ";
        $('.content').innerHTML = " ";
    }
    $(".button-area").style.display = "none";
}

//添加一个任务
function addTask(taskObject) {
    var taskArr = queryTasks();
    taskObject.id = taskArr[taskArr.length - 1].id + 1; //id 生成
    taskArr.push(taskObject);
    updateChildCateChildByAdd(taskObject.pid, taskObject.id); //更新子分类的 child 字段
    localStorage.task = JSON.stringify(taskArr);
    return taskObject.id; //将当前任务 id 返回，方便调用
}

//-----------------------更新--------------------

//更新分类子元素
function updateCateChildByAdd(pid, ID) {
    var cates = queryCates();
    for (var i = 0, len = cates.length; i < len; i++) {
        if (cates[i].id == pid) {
            cates[i].child.push(ID);
        }
    }
    localStorage.cate = JSON.stringify(cates);
}

//更新子分类
function updateChildCateChildByAdd(pid, ID) {
    var childCates = queryChildCates();
    console.log(pid, ID);
    for (var i = 0, len = childCates.length; i < len; i++) {
        if (childCates[i].id == pid) {
            childCates[i].child.push(ID);
            console.log(childCates[i].child);
        }
    }
    console.log(childCates);
    localStorage.childCate = JSON.stringify(childCates);
}

//更新分类的 child 字段
function updateCateChildByDelete(id, childId) {
    var cate = JSON.parse(localStorage.cate);
    for (var i = 0; i < cate.length; i++) {
        if (cate[i].id == id) {
            for (var j = 0; j < cate[i].child.length; j++) {
                if (cate[i].child[j] == childId) {
                    cate[i].child = deleteInArray(cate[i].child, j);
                }
            }
        }
    }
    localStorage.cate = JSON.stringify(cate);
}

//根据ID更新任务
function updateTaskById(id, name, date, content) {
    var allTasks = queryTasks();
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id == id) {
            allTasks[i].name = name;
            allTasks[i].date = date;
            allTasks[i].content = content;
        }
    }
    localStorage.task = JSON.stringify(allTasks);
}

//根据任务 id 更新任务状态
function updateTaskStatusByID(taskId) {
    var allTasks = queryTasks();
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id == taskId) {
            allTasks[i].finish = true;
        }
    }
    localStorage.task = JSON.stringify(allTasks);
}

//-----------------------删除-------------------

//根据ID删除任务
function deleteTaskByID(id) {
    var result = [];
    var allTasksArr = queryTasks();
    for (var i = 0; i < allTasksArr.length; i++) {
        if (allTasksArr[i].id == id) {
            result = deleteInArray(allTasksArr, i);
        }
    }
    localStorage.task = JSON.stringify(result); //save
}

//根据ID删除子元素
function deleteChildCate(id) {
    var result = [];
    var childCateArr = queryChildCates();
    for (var i = 0; i < childCateArr.length; i++) {
        if (childCateArr[i].id == id) {
            result = deleteInArray(childCateArr, i);
            //更新父节点中的 childId 字段
            updateCateChildByDelete(childCateArr[i].pid, childCateArr[i].id);
            //查看 child
            if (childCateArr[i].child.length !== 0) {
                for (var j = 0; j < childCateArr[i].child.length; j++) {
                    deleteTaskByID(childCateArr[i].child[j]);
                }
            }
        }
    }
    localStorage.childCate = JSON.stringify(result); //save
}

//根据ID删除父元素
function deleteCate(id) {
    var result = [];
    var cateArr = queryCates();
    for (var i = 0; i < cateArr.length; i++) {
        if (cateArr[i].id == id) {
            result = deleteInArray(cateArr, i);
            if (cateArr[i].child.length !== 0) {
                for (var j = 0; j < cateArr[i].child.length; j++) {
                    deleteChildCate(cateArr[i].child[j]);
                }
            }
        }
    }
    localStorage.cate = JSON.stringify(result);
}

//点击垃圾桶图标
function del(e, element) {
    //这里要阻止事件冒泡
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    console.log("=====del======");
    var cateClicked = element.parentNode;
    if (cateClicked.tagName.toLowerCase() === "h2") {
        console.log("h2");
        cateClicked.getAttribute("cateid");
        console.log(cateClicked.getAttribute("cateid"));
        var r = confirm("是否确定删除分类？");
        if (r === true) {
            deleteCate(cateClicked.getAttribute("cateid"));
        }
    } else if (cateClicked.tagName.toLowerCase() === "h3") {
        console.log("h3");
        console.log(cateClicked.getAttribute("cateid"));
        var rr = confirm("是否确定删除分类？");
        if (rr === true) {
            deleteChildCate(cateClicked.getAttribute("cateid"));
        }
    }
    createCates();
    createTask(queryTasks()); //初始化任务列表
}

//-----------------------点击--------------------

//点击分类
function clickCate(element) {
    var cateID = element.getAttribute('cateid');
    setHighLight(element);
    if (cateID == -1) {
        createTask(queryTasks());
        currentCateId = cateID;
        currentCateTable = "AllCate";
    } else {
        if (element.tagName.toLowerCase() == "h2") {
            createTask(queryTasksByCateID(cateID));
            currentCateId = cateID;
            currentCateTable = "cate";
        } else {
            createTask(queryTasksByChildCateID(cateID));
            currentCateId = cateID;
            currentCateTable = "childCate";
        }
    }
    cleanAllActiveOnStatusButton();
    addClass($("#all-tasks"), "active");
    addClass($("[taskid]"), "active");
    createContent(currentTaskId);
}

//点击任务
function clickTask(element) {
    var taskID = element.getAttribute('taskid');
    currentTaskId = taskID;
    console.log(currentTaskId);
    createContent(taskID);
    cleanTasksHighLight();
    addClass(element, "active");
}

//点击增加主分类
function clickAddCate() {
    $(".cover").style.display = "block";
}

//点击增加任务
function clickAddTask() {
    if (currentCateId != -1 && currentCateTable == "cate" && queryCatesByID(currentCateId).child.length === 0) {
        alert("请先建立子分类");
    } else {
        $(".todo-name").innerHTML = '<input type="text" class="input-title" placeholder="请输入标题">';
        $(".task-date").innerHTML = '<input type="date" class="input-date">';
        $(".content").innerHTML = '<textarea class="textarea-content" placeholder="请输入任务内容"></textarea>';
        $(".button-area").innerHTML = '<span class="info"></span> <button class="save">保存</button> <button class="cancel-save">放弃</button>';
        $(".button-area").style.display = "block";
        clickSaveOrCancel();
    }
}

//点击保存或取消
function clickSaveOrCancel() {
    addClickEvent($(".save"), function () {
        var title = $(".input-title");
        var content = $(".textarea-content");
        var date = $(".input-date");
        var info = $(".info");
        var tasks = queryTasks();

        if (title.value === "") {
            info.innerHTML = "标题不能为空";
        } else if (date.value === "") {
            info.innerHTML = "日期不能为空";
        } else if (content.value === "") {
            info.innerHTML = "内容不能为空";
        } else {
            var pid;
            if (currentCateTable === "AllCate") { //如果焦点在所有分类上
                pid = 0;
            } else if (currentCateTable === "cate") {
                pid = queryCatesByID(currentCateId).child[0];
            } else {
                pid = currentCateId;
            }
            var tempTask = {
                "pid": pid,
                "finish": false,
                "name": title.value,
                "date": date.value,
                "content": content.value,
            };
            var curTaskId = addTask(tempTask);
            currentTaskId = curTaskId;
            if (currentCateTable === "AllCate") { //如果焦点在所有分类上
                createTask(queryTasks());
            } else if (currentCateTable === "cate") {
                createTask(queryTasksByCateID(currentCateId));
            } else {
                createTask(queryTasksByChildCateID(currentCateId));
            }
            createContent(currentTaskId);
            createCates();
        }
    });

    addClickEvent($(".cancel-save"), function () {
        createContent(currentTaskId);
    });
}

//保存分类
function ok() {
    var newCateName = $("#newCateName").value;
    var cateID = $("#modal-select").selectedIndex;
    var cates = queryCates();
    var childCates = queryChildCates();
    if (!newCateName) {
        alert("分类名称不能为空")
    } else {
        if (cateID == 0) {
            var newCateJson =
            {
                "id": cates.length,
                "name": newCateName,
                "child": [],
            };
            var temp = JSON.parse(localStorage.cate);
            temp.push(newCateJson);
            localStorage.cate = JSON.stringify(temp);
        } else {
            var newChildCateJson =
            {
                "id": childCates.length,
                "pid": cateID,
                "name": newCateName,
                "child": [],
            };
            var temp = JSON.parse(localStorage.childCate);
            temp.push(newChildCateJson);
            localStorage.childCate = JSON.stringify(temp);
            updateCateChildByAdd(cateID, childCates.length);
        }
    }
    $(".cover").style.display = "none";
    initModal();
    createCates();
}

//取消
function cancel() {
    $(".cover").style.display = "none";
}

//移除
function removeActive(className) {
    var element = $(".active");
    if (element) {
        removeClass(element, "active");
    }
}

//设置高亮
function setHighLight(element) {
    cleanAllActive();
    addClass(element, "active");
}

//清除所有分类高亮
function cleanAllActive() {
    removeClass($("#allTasks"), "active");
    var h2Elements = $("#listContent").getElementsByTagName('h2');
    for (var i = 0; i < h2Elements.length; i++) {
        removeClass(h2Elements[i], "active");
    }
    var h3Elements = $("#listContent").getElementsByTagName('h3');
    for (var j = 0; j < h3Elements.length; j++) {
        removeClass(h3Elements[j], "active");
    }
}

//清除状态按钮高亮
function cleanAllActiveOnStatusButton() {
    removeClass($("#all-tasks"), "active");
    removeClass($("#unfinish-tasks"), "active");
    removeClass($("#finished-tasks"), "active");
}

//清除列表的高亮
function cleanTasksHighLight() {
    var aLi = $("#task-list").getElementsByTagName('li');
    for (var i = 0; i < aLi.length; i++) {
        removeClass(aLi[i], "active");
    }
}

//分类任务状态控制按钮
function cateTaskStatusController() {
    addClickEvent($("#all-tasks"), function () {
        console.log("click all tasks");
        cateTaskStatusControllerHelper(this);
    });
    addClickEvent($("#unfinish-tasks"), function () {
        console.log("click unfinish tasks");
        cateTaskStatusControllerHelper(this, false);
    });
    addClickEvent($("#finished-tasks"), function () {
        console.log("click finished-tasks");
        cateTaskStatusControllerHelper(this, true);
    });
}

//任务列表状态切换辅助
function cateTaskStatusControllerHelper(element, finish) {
    cleanAllActiveOnStatusButton(); //清除状态按钮高亮
    addClass(element, "active");

    if (currentCateId == -1) {
        createTask(queryTasks(finish));
        console.log(finish);
    } else {
        if (currentCateTable == "cate") {
            createTask(queryTasksByCateID(currentCateId, finish));
        } else {
            console.log("**************************");
            console.log(finish);
            console.log(queryTasksByChildCateID(currentCateId, finish));
            createTask(queryTasksByChildCateID(currentCateId, finish));
            console.log("*********** END **********");
            console.log(currentTaskId);
        }
    }
}

//点击完成
function checkTaskDone() {
    var r = confirm("确定将任务标记为已完成吗？");
    if (r) {
        updateTaskStatusByID(currentTaskId); //更新状态
        createContent(currentTaskId);
        var temp = currentTaskId;
        if (currentCateTable === "AllCate") { //如果焦点在所有分类上
            createTask(queryTasks());
        } else if (currentCateTable === "cate") {
            createTask(queryTasksByCateID(currentCateId));
        } else {
            createTask(queryTasksByChildCateID(currentCateId));
        }
        currentTaskId = temp;
    }
}

//点击修改
function changeTask() {
    var task = queryTasksByID(currentTaskId);
    console.log(currentTaskId);
    $(".todo-name").innerHTML = '<input type="text" class="input-title" placeholder="请输入标题" value="' + task.name + '">';
    $(".manipulate").innerHTML = "";
    $(".task-date").innerHTML = '<input type="date" class="input-date" value="' + task.date + '">';
    $(".content").innerHTML = '<textarea class="textarea-content" placeholder="请输入任务内容">' + task.content + '</textarea>';
    $(".button-area").innerHTML = '<span class="info"></span>                    <button class="save">保存修改</button>                    <button class="cancel-save">放弃</button>';
    $(".button-area").style.display = "block";
    changeSaveOrNot();
}

//保存修改或不修改
function changeSaveOrNot() {
    addClickEvent($(".save"), function () {

        var title = $(".input-title");
        var content = $(".textarea-content");
        var date = $(".input-date");
        var info = $(".info");

        if (title.value === "") {
            info.innerHTML = "标题不能为空";
        } else if (date.value === "") {
            info.innerHTML = "日期不能为空";
        } else if (content.value === "") {
            info.innerHTML = "内容不能为空";
        } else {
            updateTaskById(currentTaskId, title.value, date.value, content.value);
            createContent(currentTaskId);
            var temp = currentTaskId;
            if (currentCateTable === "AllCate") { //如果焦点在所有分类上
                createTask(queryTasks());
            } else if (currentCateTable === "cate") {
                createTask(queryTasksByCateID(currentCateId));
            } else {
                createTask(queryTasksByChildCateID(currentCateId));
            }
            currentTaskId = temp;
        }
    });

    addClickEvent($(".cancel-save"), function () {
        createContent(currentTaskId);
    });
}
