// import { quotes } from "./words.json"
const TIME_LIMIT = 60;
let timer = null;
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let characterTyped = 0;
let errors = 0;
let currentText = "";
let quotes_array = ["Out of the night that covers me,",
  "Black as the Pit from pole to pole,",
  "I thank whatever gods may be",
  "For my unconquerable soul.",
  "In the fell clutch of circumstance",
  "I have not winced nor cried aloud.",
  "Under the bludgeonings of chance",
  "My head is bloody, but unbowed.",
  "Beyond this place of wrath and tears",
  "Looms but the Horror of the shade,",
  "And yet the menace of the years",
  "Finds, and shall find, me unafraid.",
  "It matters not how strait the gate,",
  "How charged with punishments the scroll,",
  "I am the master of my fate:",
  "I am the captain of my soul."];
let currentTextNum = 0;
let totalErrors = 0;

let userInput = document.querySelector(".user_input");
let accuracyText = document.querySelector(".accuracy");
let textArea = document.querySelector(".words");

function onUserType() {
  let splitUserInput = userInput.value.split("");
  characterTyped++;
  errors = 0;
  let textSpan = textArea.querySelectorAll("span");
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

  let currentAccuracy = ((characterTyped - (totalErrors + errors)) / characterTyped) * 100;
  accuracyText.textContent = Math.round(currentAccuracy) + "%";

  let errorText = document.querySelector(".errors");
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
  userInput.value = "";
  userInput.disabled = true;
  textArea.textContent = "Click the area below to start.";
  let cpm = document.querySelector(".cpm");
  cpm.textContent = Math.round((characterTyped / timeElapsed) * 60);
  let wpm = document.querySelector(".wpm");
  wpm.textContent = Math.round((characterTyped / 5 / timeElapsed) * 60);
}

function reset() {
  clearInterval(timer);
  resetValues();
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  totalErrors = 0;
  accuracy = 0;
  characterTyped = 0;
  currentTextNum = 0;
  userInput.disabled = false;
  userInput.value = "";
  textArea.textContent = "Click on the area below to start the game.";
  let textAccuracy = document.querySelector(".accuracy");
  textAccuracy.textContent = "NA";
  let cpm = document.querySelector(".cpm");
  cpm.textContent = "NA";
  let wpm = document.querySelector(".wpm");
  wpm.textContent = "NA";
  let textError = document.querySelector(".errors");
  textError.textContent = 0;
  let timerText = document.querySelector(".timer");
  timerText.textContent = timeLeft;
}

function onStartTyping() {
  resetValues();
  updateText();
  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

function updateText() {
  let userInput = document.querySelector(".user_input");
  userInput.value = "";
  textArea.textContent = "";
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

function importTextFile() {
  console.log("Importing text file.");
}