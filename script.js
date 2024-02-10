const input = document.getElementById("inputTask");
const listContainer = document.getElementById("listContainer");
const addBtn = document.getElementById("addBtn");
const speechBtn = document.getElementById("speechBtn");
addBtn.onclick = addTask;
speechBtn.onclick = speech;
// let speechFlag = false;

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




var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;
recognizer.lang = 'ru-Ru';

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {
        input.value = result[0].transcript;
        addTask();
    }
};

var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');

function speech() {
    recognizer.start();
}

