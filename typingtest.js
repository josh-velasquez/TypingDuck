var keyPressed = [];

let duckBackround = document.getElementById("duckBackground");
duckBackround.style.backgroundImage = "url(https://images.unsplash.com/photo-1558217512-498092c88af0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2378&q=80)";


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
  if (numKeyStrokes <= NUM_KEYS) {
    let progressBar = document.getElementById("progressBar");
    let percent = Math.round((numKeyStrokes / NUM_KEYS) * 100);
    progressBar.style.width = percent + "%";
    let progressPercent = document.querySelector(".progressPercent");

    // Make key vanish when pressed
    let currentKey = document.getElementById(key);
    currentKey.style.visibility = "hidden";

    // Change key colour after 50% through
    if (percent > 50) {
      progressPercent.style.color = "#2f243a";
    } else {
      progressPercent.style.color = "#fff";
    }
    progressPercent.textContent = percent + "%";
  }
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById("file-content");
  element.textContent = contents;
}

document
  .getElementById("file-input")
  .addEventListener("change", readSingleFile, false);

const fileSelector = document.getElementById("importFile");
fileSelector.addEventListener("change", (event) => {
  const fileList = event.target.files;
  console.log(fileList);
  // console.log("HERE")
});
