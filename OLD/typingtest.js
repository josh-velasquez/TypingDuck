var keyPressed = [];

function getKey(e) {
  var location = e.location;
  var selector;
  if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
    selector = ['[data-key="' + e.keyCode + '-R"]'];
  } else {
    var code = e.keyCode || e.which;
    selector = [
      '[data-key="' + code + '"]',
      '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]',
    ].join(",");
  }
  return document.querySelector(selector);
}

function pressKey(char) {
  var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
  if (!key) {
    return console.warn("No key for", char);
  }
  key.setAttribute("data-pressed", "on");
  setTimeout(function () {
    key.removeAttribute("data-pressed");
  }, 200);
}

var h1 = document.querySelector("h1");
var originalQueue = h1.innerHTML;
var queue = h1.innerHTML;

function next() {
  var c = queue[0];
  queue = queue.slice(1);
  h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
  pressKey(c);
  if (queue.length) {
    setTimeout(next, Math.random() * 200 + 50);
  }
}

h1.innerHTML = "&nbsp;";
setTimeout(next, 500);

document.body.addEventListener("keydown", function (e) {
  var key = getKey(e);
  if (!key) {
    return console.warn("No key for", e.keyCode);
  }

  key.setAttribute("data-pressed", "on");
  console.log("KEY: " + e.key);

  if (!keyPressed.includes(e.key)) {
    numKeyStrokes++;
    keyPressed.push(e.key);
    updateProgress(e.key);
  }
});

document.body.addEventListener("keyup", function (e) {
  var key = getKey(e);
  key && key.removeAttribute("data-pressed");
});

function size() {
  var size = keyboard.parentNode.clientWidth / 90;
  keyboard.style.fontSize = size + "px";
  // console.log(size);
}

var keyboard = document.querySelector(".keyboard");
window.addEventListener("resize", function (e) {
  size();
});
size();

var numKeyStrokes = 0;
const NUM_KEYS = 104;

function updateProgress(key) {
  if (numKeyStrokes > NUM_KEYS) {
    return;
  }
  let progressBar = document.getElementById("progressBar");
  let percent = Math.round((numKeyStrokes / NUM_KEYS) * 100);
  progressBar.style.width = percent + "%";
  let progressPercent = document.querySelector(".progressPercent");
  progressPercent.textContent = percent + "%";
  let newKey = getLowerCaseId(key);
  highlightKey(newKey);
  updatePercentColour(percent);
}

// Change key colour after 50% through
function updatePercentColour(percent) {
  let progressPercent = document.querySelector(".progressPercent");
  if (percent > 50) {
    progressPercent.style.color = "#2f243a";
  } else {
    progressPercent.style.color = "#fff";
  }
}

function highlightKey(key) {
  let newKey = getLowerCaseId(key);
  let currentKey = document.getElementById(newKey);
  currentKey.style.backgroundColor = "#e1b2b2";
  currentKey.style.color = "#2f243a"
}

function resetKeyHighlight(key) {
  let newKey = getLowerCaseId(key);
  let currentKey = document.getElementById(newKey);
  currentKey.style.backgroundColor = "#2f243a";
  currentKey.style.color = "#e1b2b2"
}

function getLowerCaseId(key) {
  return key.length > 1 ? key : key.toLowerCase();
}

function restart() {
  keyPressed.forEach(key => {
    resetKeyHighlight(key);
  });
  keyPressed = [];
  numKeyStrokes = 0;
  let progressBar = document.getElementById("progressBar");
  progressBar.style.width = 0 + "%";
  let progressPercent = document.querySelector(".progressPercent");
  progressPercent.textContent = 0 + "%";
  progressPercent.style.color = "#fff";
}

// function numberOfKeys() {

// }