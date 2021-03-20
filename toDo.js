const toDoForm = document.querySelector(".for__todo");
const toDoInput = toDoForm.querySelector("input");
const pendingUl = document.querySelector(".pendinglist");
const finishUl = document.querySelector(".pendinglist");

const PEDNIG_LS = 'pending';
const FINISH_LS = "finish"

// const SHOWING_CN = "showing";
let pendinglist = [];
let finishlist = [];

// localStorage에 저장.
function savePending() {
    localStorage.setItem(PENDIG_LS, JSON.stringify(pendinglist));
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

function findInFinish(taskId) {
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
    finishlist.push(task);
    displayFinish();
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
    li_span.innerText = toDO.text;
    li.appendChild(li_span);
    li.appendChild(deleteBtn);
    li.id = toDo.id;
    return li;
}

// pending 리스트 보여주는 함수
function displayPending(todo_text) {
    const baseDisplay = basicDisplay(todo_text);
    const finishBtn = document.createElement("button");
    const todo_ID = pendinglist.length() + 1;
    finishBtn.innerHTML = `<i class="fas fa-check-circle"></i>`;
    finishBtn.addEventListener("click", PendingToF);
    baseDisplay.appendChild(finishBtn);
    pendingUl.appendChild(baseDisplay);
    const pendingObj = {
        text: text,
        id = todo_ID
    }
    pendinglist.push(pendingObj);
    savePending(pendingObj);

}


// 새로 입력 받을 때.
function UpdateToDos(event) {
    // toDoForm.classList.add(SHOWING_CN);
    event.preventDefault();
    const updateText = toDoInput.value;
    displayPending(updateText);
    toDoInput.value = "";
}

function loadToDo() {
    const loadedPending = localStorage.getItem(PENDING_LS);
    if (loadedPending != null) {
        const loadedPending__parse = JSON.parse(loadedPending);
        loadedPending__parse.forEach(function (todo) {
            displayToDos(todo.text);
        });
    }

    const loadedFinish = localStorage.getItem(FINISH_LS);
}


function init() {
    // 이미 리스트에 값이 있는 경우에는 화면에 보여줘야 함.
    loadToDo();
    // 할일 리스트에 새로운 일을 추가하려고 할 때
    toDoForm.addEventListener("submit", UpdateToDos())
}

init();