// import "./styles.css";
"use strict";

const form = document.querySelector(".js-form"),
  resultMessage = form.querySelector(".js-form-submit"),
  rangeNumber = document.getElementById("rangeNumber"),
  txtGuessNumber = document.getElementById("txtGuessNumber"),
  maxNumber = document.getElementById("maxNumber");

function isNumeric(inputText) {
  return !isNaN(inputText);
}

function genericRandomNum(inputNumber, rangeMaxNumber) {
  let randomNumber = Math.floor(Math.random() * rangeMaxNumber + 1);
  if (parseInt(inputNumber, 10) === randomNumber) {
    randomNumber = genericRandomNum(inputNumber, rangeMaxNumber);
  }
  return randomNumber;
}

function loadResult(inputNumber, rangeMaxNumber) {
  const machineNumber = genericRandomNum(inputNumber, rangeMaxNumber);
  resultMessage.innerHTML = `You chose: ${inputNumber}, the machine chose: ${machineNumber}.
  ${inputNumber > machineNumber ? `You won!` : `You lost!`}`;
}

function loadState() {
  maxNumber.innerText = rangeNumber.value;
}

function handleRangeChange() {
  loadState();
}

function handleFormSubmit(e) {
  e.preventDefault();
  const rangeMaxNumber = rangeNumber.value;
  let inputNumber = txtGuessNumber.value;
  if (!inputNumber) {
    return;
  }
  if (!isNumeric(inputNumber) || inputNumber > rangeMaxNumber) {
    txtGuessNumber.value = "";
    return;
  }
  loadResult(inputNumber, rangeMaxNumber);
}

function init() {
  rangeNumber.addEventListener("input", handleRangeChange);
  form.addEventListener("submit", handleFormSubmit);
  loadState();
}
init();
