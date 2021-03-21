const toDoForm = document.querySelector(".form__todo");
const toDoInput = toDoForm.querySelector("input");
const pendingUl = document.querySelector(".pendinglist");
const finishUl = document.querySelector(".finishlist");

const PENDING_LS = 'pending';
const FINISH_LS = "finish"

// const SHOWING_CN = "showing";
let pendinglist = [];
let finishlist = [];

// localStorage에 저장.
function savePending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendinglist));
}
function saveFinish() {
    localStorage.setItem(FINISH_LS, JSON.stringify(finishlist));
}

// pendinglist중 삭제할 내용을 id를 통해 삭제함.
function removeFromPending(taskID) {
    pendinglist = pendinglist.filter(function (task) {
        return task.id != taskID;
    })
}
// finishlist중 삭제할 내용을 id를 통해 삭제함.
function removeFromFinish(taskID) {
    finishlist = finishlist.filter(function (task) {
        return task.id != taskID;
    })
}

function findFinish(taskId) {
    return finishlist.find(function (task) {
        return task.id === taskId;
    });
}

function findPending(taskId) {
    return pendinglist.find(function (task) {
        return task.id === taskId;
    });
}

// 리스트에서 삭제.
function deleteToDo(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFinish(li.id);
    removeFromPending(li.id);
    savePending();
    saveFinish();
}

function addPending(task) {
    pendinglist.push(task);
}

function addFinish(task) {
    finishlist.push(task);
}


// pending 리스트에서 finish리스트로 전송.
function PendingToF(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findPending(li.id);
    removeFromPending(li.id);
    addFinish(task);
    displayFinish(task);
    savePending();
    saveFinish();
}

function FinishToP(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findFinish(li.id);
    removeFromFinish(li.id);
    addPending(task);
    displayPending(task);
    savePending();
    saveFinish();
}

// 보여주는 내용 중 겹치는 내용
function basicDisplay(toDo) {
    const li = document.createElement("li");
    const li_span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.addEventListener("click", deleteToDo);
    li_span.innerText = toDo.text;
    li.appendChild(li_span);
    li.appendChild(deleteBtn);
    li.id = toDo.id;
    return li;
}

// pending 리스트 보여주는 함수
function displayPending(todo_text) {
    console.log("dp");
    const baseDisplay = basicDisplay(todo_text);
    const finishBtn = document.createElement("button");
    // const todo_ID = pendinglist.length() + 1;
    finishBtn.innerHTML = "✅";
    finishBtn.addEventListener("click", PendingToF);
    baseDisplay.appendChild(finishBtn);
    pendingUl.appendChild(baseDisplay);
    // pendinglist.push(pendingObj);
    // savePending(pendingObj);
}
// finish 리스트 보여주기
function displayFinish(todo_text) {
    const baseDisplay = basicDisplay(todo_text);
    const BackBtn = document.createElement("button");
    // const todo_ID = pendinglist.length() + 1;
    BackBtn.innerHTML = "⏪";
    BackBtn.addEventListener("click", FinishToP);
    baseDisplay.appendChild(BackBtn);
    finishUl.appendChild(baseDisplay);
    // finishlist.push()

}


function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text
    };
}

function saveUpdatePending(task) {
    pendinglist.push(task);
}

// 새로 입력 받을 때.
function UpdateToDos(event) {
    // toDoForm.classList.add(SHOWING_CN);
    event.preventDefault();
    const updateText = getTaskObject(toDoInput.value);
    displayPending(updateText);
    saveUpdatePending(updateText);
    toDoInput.value = "";
    saveFinish();
    savePending();
}

function loadToDo() {
    pendinglist = JSON.parse(localStorage.getItem(PENDING_LS)) || [];
    finishlist = JSON.parse(localStorage.getItem(FINISH_LS)) || [];
    pendinglist.forEach(function (pend) {
        displayPending(pend);
    });
    finishlist.forEach(function (fin) {
        displayFinish(fin);
    });

}


function init() {
    console.log("here");
    // 할일 리스트에 새로운 일을 추가하려고 할 때
    toDoForm.addEventListener("submit", UpdateToDos)
    // 이미 리스트에 값이 있는 경우에는 화면에 보여줘야 함.
    loadToDo();
}

init();