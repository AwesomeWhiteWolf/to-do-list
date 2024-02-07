const input = document.getElementById("inputTask");
const listContainer = document.getElementById("listContainer");
const addBtn = document.querySelector("button");
addBtn.onclick = addTask;

function addTask() {
    if (input.value != "") {
        let li = document.createElement("li");
        li.innerHTML = input.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem("data2", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data2");
}
showTask();



    