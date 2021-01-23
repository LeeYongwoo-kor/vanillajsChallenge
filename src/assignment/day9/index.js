// import "./styles.css";
"use strict";
const form = document.querySelector(".js-form");
const txtResult = document.getElementById("txtResult");
const txtResultRecord = document.getElementById("txtResultRecord");

let numberArr = [],
  resultRecord = [];

function isNumeric(inputText) {
  return !isNaN(inputText);
}

function clearNumberArr() {
  numberArr.length = 0;
}

function clearRecord() {
  resultRecord.length = 0;
}

function saveRecord(inputText) {
  resultRecord.push(inputText);
}

function showResult(result) {
  txtResult.innerText = result;
  txtResult.value = result;
}

function showResultRecord() {
  txtResultRecord.innerText = resultRecord.join(" ");
}

const calculator = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => x / y,
  calculate: () => {
    let lastValue = 0;
    let operator = "";
    resultRecord.forEach((value, index) => {
      if (index === 0) {
        lastValue = value;
        return;
      }
      if (index % 2 === 1) {
        operator = value;
      } else if (index % 2 === 0) {
        switch (operator) {
          case "+":
            lastValue = calculator.add(lastValue, value);
            break;

          case "-":
            lastValue = calculator.subtract(lastValue, value);
            break;

          case "*":
            lastValue = calculator.multiply(lastValue, value);
            break;

          case "/":
            lastValue = calculator.divide(lastValue, value);
            break;

          default:
            return;
        }
      }
    });
    return lastValue;
  },
  clear: () => {
    clearNumberArr();
    clearRecord();
    showResult(0);
    showResultRecord();
  },
};

const calculatorController = {
  continueOperation: (inputValue) => {
    const lastRecord = resultRecord[resultRecord.length - 1];
    if (!isNumeric(lastRecord)) {
      saveRecord(txtResult.value);
      saveRecord(inputValue);
      showResult(calculator.calculate());
      showResultRecord();
      clearNumberArr();
    } else {
      saveRecord(inputValue);
      showResultRecord();
      clearNumberArr();
    }
  },
  calculate: (inputValue) => {
    const lastRecord = resultRecord[resultRecord.length - 1];
    if (!isNumeric(lastRecord)) {
      if (resultRecord.length === 0) {
        return;
      }
      if (lastRecord !== "=") {
        saveRecord(txtResult.value);
        saveRecord(inputValue);
      } else {
        resultRecord.splice(0, resultRecord.length - 3);
        resultRecord.unshift(txtResult.value);
      }
      showResult(calculator.calculate());
      showResultRecord();
    }
  },
  clear: () => calculator.clear(),
};

function parsingValue(e) {
  e.preventDefault();
  const inputValue = e.submitter.value;
  if (e.submitter.id.indexOf("_") > -1) {
    if (!isNumeric(inputValue)) {
      return;
    }

    const lastRecord = resultRecord[resultRecord.length - 1];
    if (lastRecord === "=") {
      calculatorController.clear();
    }

    let result = 0;
    const parseNumber = parseInt(inputValue, 10);
    numberArr.push(parseNumber);
    numberArr.forEach((item) => {
      result *= 10;
      result += item;
    });

    showResult(result);
  } else {
    switch (inputValue) {
      case "+":
      case "-":
      case "*":
      case "/":
        calculatorController.continueOperation(inputValue);
        break;

      case "=":
        calculatorController.calculate(inputValue);
        break;

      default:
        calculatorController.clear();
        return;
    }
  }
}

function init() {
  form.addEventListener("submit", parsingValue);
  //   window.addEventListener("keydown", parsingValue);
}
init();
