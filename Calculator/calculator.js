let display = document.getElementById("display");

function resetDisplay() {
  display.value = "";
}

function backSpace() {
  let val = display.value;
  // val = val.slice(-1, val.length - 1);
  display.value = val.slice(0, val.length - 1);
}

function appendToDisplay(input) {
  display.value += input;
}

function getResult() {
  if (display.value == "") {
    display.value = "";
  } else {
    try {
      display.value = eval(display.value);
    } catch (e) {
      display.error = e;
    }
  }
}
