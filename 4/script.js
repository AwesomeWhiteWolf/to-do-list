const input = document.getElementById("inputTask");
const listContainer = document.getElementById("listContainer");
const addBtn = document.getElementById("addBtn");
const speechBtn = document.getElementById("speechBtn");
addBtn.onclick = addTask;
speechBtn.onclick = speech;

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
    localStorage.setItem("data3", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data3");
}
showTask();

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognizer = new speechRecognition();

recognizer.interimResults = true;
recognizer.lang = 'ru-Ru';

recognizer.addEventListener('result', (e) => {
    const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    input.value = text;
    if (e.results[0].isFinal) {
        addTask();
    }
});

function speech() {
    recognizer.start();
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const linkId = link.id; // Получаем ID ссылки
  const linkText = link.querySelector('.link-text');
  const editButton = link.querySelector('.edit-btn');

  // Загружаем текст ссылки из localStorage при загрузке страницы
  const savedText = localStorage.getItem(linkId);
  if (savedText) {
    linkText.textContent = savedText;
  }

  editButton.addEventListener('click', () => {
    const newText = prompt('Введите новое название:', linkText.textContent);
    if (newText) {
      linkText.textContent = newText;
    }
    localStorage.setItem(linkId, linkText.textContent);
  });
});
