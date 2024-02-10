const input = document.getElementById("inputTask");
const listContainer = document.getElementById("listContainer");
const addBtn = document.getElementById("addBtn");
const speechBtn = document.getElementById("speechBtn");
addBtn.onclick = addTask;
speechBtn.onclick = speech;
let speechFlag = false;

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
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognizer = new speechRecognition();

recognizer.interimResults = true;
recognizer.lang = 'ru-Ru';

recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {
        input.value = result[0].transcript;
        addTask();
    }
};

function speech() {
    if (speechFlag == false) {
        recognizer.start();
        speechFlag = true;
    }
    else {
        alert('Распознавание голоса закончено');
        recognizer.stop();
        speechFlag = false;
    }
}

