const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;
    if (userEnteredValue.trim() != 0) {    //is the value isn't only spaces
        addBtn.classList.add("active");  //active the add button
    }
    else {
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTasks();

addBtn.onclick = () => {    //when click on plus icon button
    let useEnteredValue = inputBox.value;   //getting input field value;
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorageData == null) {
        listArray = [];
    }
    else {
        listArray = JSON.parse(getLocalStorageData);
    }
    if (useEnteredValue != "") {
        listArray.push(useEnteredValue);
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");  //unactive the add button once the task added

}


function showTasks() {
    let getLocalStorageData = localStorage.getItem('New Todo');
    if (getLocalStorageData == null) {

        listArray = [];
    }
    else {
        listArray = JSON.parse(getLocalStorageData);
    }

    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    }
    else {
        deleteAllBtn.classList.remove("active");
    }

    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });

    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}


function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

deleteAllBtn.onclick = () => {
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}