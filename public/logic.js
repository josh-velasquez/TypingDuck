const TIME_LIMIT = 60;
let timer = null;
let timeLeft = TIME_LIMIT;
let elapsedTime = 0;
let numCharacter = 0;
let errors = 0;
let currentText = "";
let quotes_array = [
  "Testing this out to see if it works.",
  "Juan is a troll and that is right."
];
let currentTextNum = 0;
let totalErrors = 0;


let userInput = document.querySelector(".user_input");


function onUserType() {
  let splitUserInput = userInput.value.split("");
  numCharacter++;
  errors = 0;
  let textSpan = document.querySelector(".words").querySelectorAll("span");
  textSpan.forEach((char, i) => {
    let typedChar = splitUserInput[i];
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");
      errors++;
    }
  });

  let errorText = document.querySelector(".errors");
  console.log("HERE");
  errorText.textContent = totalErrors + errors;
  if (userInput.value.length == currentText.length) {
    updateText();
    totalErrors += errors;
    userInput.value = "";
  }
}

function updateTime() {
  let timerText = document.querySelector(".timer");
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timerText.textContent = timeLeft;
  } else {
    finishTyping();
  }
}

function finishTyping() {
  clearInterval(timer);

  userInput.disabled = true;
  let textArea = document.querySelector(".words");
  textArea.textContent = "Click the area below to start."
  let cpm = document.querySelector(".cpm");
  cpm.textContent = Math.round((characterTyped / timeElapsed) * 60);
  let wpm = document.querySelector(".wpm");
  wpm.textContent = Math.round((characterTyped / 5 / timeElapsed) * 60);
}


function resetValues() {
  timer = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  totalErrors = 0;
  accuracy = 0;
  characterTyped = 0;
  currentTextNum = 0;
  userInput.disabled = false;

  userInput.textContent = "";

  let textArea = document.querySelector(".words");
  textArea.textContent = "Click on the area below to start the game.";
  let textAccuracy = document.querySelector(".accuracy");
  textAccuracy.textContent = 100;
  let cpm = document.querySelector(".cpm");
  cpm.textContent = 100;
  let wpm = document.querySelector(".wpm");
  wpm.textContent = 100;
  let textError = document.querySelector(".errors");
  textError.textContent = 0;
}

function onStartTyping() {
  resetValues();
  updateText();

  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}


function updateText() {
  let userInput = document.querySelector(".user_input");
  userInput.textContent = null;
  let textArea = document.querySelector(".words")
  textArea.textContent = null;
  currentText = quotes_array[currentTextNum];

  currentText.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    textArea.appendChild(charSpan);
  });

  if (currentTextNum < quotes_array.length - 1) {
    currentTextNum++;
  } else {
    currentTextNum = 0;
  }
}