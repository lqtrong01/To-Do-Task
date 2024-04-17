var taskListArray = [];
const isLocalDB = localStorage.getItem('todoTaskList');
var listTaskToDo = [];
var listTaskComplete = [];

function loadingApp(){
    listTaskToDo = [];
    listTaskComplete = [];
    if(isLocalDB !== null){
        taskListArray = JSON.parse(isLocalDB);
        console.log(taskListArray);
        renderTaskList();
    }
    
    taskListArray.forEach(function(item){
        if(item.status === true)
            listTaskToDo.push(item);
        else listTaskComplete.push(item);
    })
    console.log(listTaskToDo);
    console.log(listTaskComplete);
}

loadingApp();
renderTaskList();

function saveTask(){
    var taskName = document.getElementById('input-field').value;
    
    if(taskName !== ''){
        var todoObj = {
            taskId: taskListArray.length + 1,
            taskName: taskName,
            status: true
        }
        taskName.innerHTML = "";
        alert('Add Complete')
        taskListArray.push(todoObj);
        localStorage.setItem('todoTaskList', JSON.stringify(taskListArray));
        renderTaskList();
    }
    else alert('Nhập một từ gì đó');
}

function renderTaskList(){
    document.getElementById('list-container').innerHTML = '';
    for(var index = 0; index<taskListArray.length;index++){
        const dynamic = document.createElement('li')
        dynamic.classList.add('task');
        if(taskListArray[index].status === false){
            dynamic.classList.add('checked');
        }
        const myLabel = document.createElement('label');
        const myPara = document.createElement('p');
        myPara.textContent = taskListArray[index].taskName;
        myLabel.appendChild(myPara);
        dynamic.appendChild(myLabel);
        const myDiv = document.createElement('div');
        myDiv.classList.add('setting');
        const editIcon = document.createElement('img');
        editIcon.src = 'assets/icons8-edit-64.png';
        editIcon.addEventListener('click', editTask);
        editIcon.taskId = taskListArray[index].taskId;
        editIcon.classList.add('edit');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/icons8-delete-64.png';
        deleteIcon.classList.add('delete');
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.taskId = taskListArray[index].taskId;
        myDiv.appendChild(editIcon);
        myDiv.appendChild(deleteIcon);
        dynamic.appendChild(myDiv);

        document.getElementById('list-container').appendChild(dynamic);
    }
    
}
function deleteTask(e){
    const index = taskListArray.findIndex(m=>m.taskId==e.target.taskId);
    taskListArray.splice(index,1);
    localStorage.setItem('todoTaskList', JSON.stringify(taskListArray));
    renderTaskList();
    loadingApp();
}
function editTask(e){
    const obj = taskListArray.find(m=>m.taskId==e.target.taskId);
    document.getElementById('input-field').value = obj.taskName;

}

const allTask = document.getElementById('all');
allTask.addEventListener('click', AllTask);
function AllTask(){
    renderTaskList();
}

const todoTask = document.getElementById('To-Do');
todoTask.addEventListener('click', ToDoTask);
function ToDoTask(){    
    loadingApp();
    document.getElementById('list-container').innerHTML = '';
    for(var index = 0; index<listTaskToDo.length;index++){
        const dynamic = document.createElement('li')
        dynamic.classList.add('task');
        const myLabel = document.createElement('label');
        const isCheck = document.createElement('input');
        isCheck.type = 'radio';
        isCheck.className = 'isComplete';
        const myPara = document.createElement('p');
        myPara.textContent = listTaskToDo[index].taskName;
        myLabel.appendChild(myPara);
        dynamic.appendChild(myLabel);
        const myDiv = document.createElement('div');
        myDiv.classList.add('setting');
        const editIcon = document.createElement('img');
        editIcon.src = 'assets/icons8-edit-64.png';
        editIcon.addEventListener('click', editTask);
        editIcon.taskId = listTaskToDo[index].taskId;
        editIcon.classList.add('edit');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/icons8-delete-64.png';
        deleteIcon.classList.add('delete');
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.taskId = listTaskToDo[index].taskId;
        myDiv.appendChild(editIcon);
        myDiv.appendChild(deleteIcon);
        dynamic.appendChild(myDiv);

        document.getElementById('list-container').appendChild(dynamic);
    }

}
const listContainer = document.getElementById('list-container');
listContainer.addEventListener('click', function(e){
    if(e.target.tagName ==='LI'){
        e.target.classList.toggle('checked')
        const index = Array.prototype.indexOf.call(listContainer.childNodes, e.target);
        console.log("Index: ", index);
        let clickedIndex;
        listContainer.childNodes.forEach((item, idx) => {
            if (item === e.target) {
                clickedIndex = idx;
            }
        });
        const objIndex = clickedIndex;
        console.log(objIndex);
        if (objIndex !== -1) {
            const isCheck = taskListArray[objIndex].status;
            taskListArray[objIndex].status = isCheck?false:true;
            console.log(taskListArray[objIndex]);
            localStorage.setItem('todoTaskList', JSON.stringify(taskListArray));
        } else {
            console.log("Không tìm thấy phần tử trong mảng.");
        }
    }
    
}, false);

document.getElementById('Done').addEventListener('click', function(){
    loadingApp();
    document.getElementById('list-container').innerHTML = '';
    for(var index = 0; index<listTaskComplete.length;index++){
        const dynamic = document.createElement('li')
        dynamic.classList.add('task');
        if(listTaskComplete[index].status === false){
            dynamic.classList.add('checked');
        }
        const myLabel = document.createElement('label');
        const isCheck = document.createElement('input');
        isCheck.type = 'radio';
        isCheck.className = 'isComplete';
        const myPara = document.createElement('p');
        myPara.textContent = taskListArray[index].taskName;
        myLabel.appendChild(myPara);
        dynamic.appendChild(myLabel);
        const myDiv = document.createElement('div');
        myDiv.classList.add('setting');
        const editIcon = document.createElement('img');
        editIcon.src = 'assets/icons8-edit-64.png';
        editIcon.addEventListener('click', editTask);
        editIcon.taskId = taskListArray[index].taskId;
        editIcon.classList.add('edit');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/icons8-delete-64.png';
        deleteIcon.classList.add('delete');
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.taskId = taskListArray[index].taskId;
        myDiv.appendChild(editIcon);
        myDiv.appendChild(deleteIcon);
        dynamic.appendChild(myDiv);

        document.getElementById('list-container').appendChild(dynamic);
    }
})

var listTaskSearch = [];
function search(){
    listTaskSearch = [];
    const searchKey = document.getElementById('input-field').value;
    for(var idx = 0; idx<taskListArray.length;idx++){
        if(taskListArray[idx].taskName.includes(searchKey)){
            listTaskSearch.push(taskListArray[idx]);
        }
    }
    document.getElementById('list-container').innerHTML = '';
    for(var index = 0; index<listTaskSearch.length;index++){
        const dynamic = document.createElement('li')
        dynamic.classList.add('task');
        if(listTaskSearch[index].status === false){
            dynamic.classList.add('checked');
        }
        const myLabel = document.createElement('label');
        const isCheck = document.createElement('input');
        isCheck.type = 'radio';
        isCheck.className = 'isComplete';
        const myPara = document.createElement('p');
        myPara.textContent = listTaskSearch[index].taskName;
        myLabel.appendChild(myPara);
        dynamic.appendChild(myLabel);
        const myDiv = document.createElement('div');
        myDiv.classList.add('setting');
        const editIcon = document.createElement('img');
        editIcon.src = 'assets/icons8-edit-64.png';
        editIcon.addEventListener('click', editTask);
        editIcon.taskId = listTaskSearch[index].taskId;
        editIcon.classList.add('edit');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/icons8-delete-64.png';
        deleteIcon.classList.add('delete');
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.taskId = listTaskSearch[index].taskId;
        myDiv.appendChild(editIcon);
        myDiv.appendChild(deleteIcon);
        dynamic.appendChild(myDiv);

        document.getElementById('list-container').appendChild(dynamic);
    }
}