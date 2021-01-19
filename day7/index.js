// import "./styles.css";
const tasksForm = document.querySelector(".js-tasksForm"),
  addTaskInput = tasksForm.querySelector("input"),
  allListId = document.querySelectorAll(".js-list ul li");

const ID_NUMBER = "157501599", // 난수:고정값
  MIN_NUMBER = 1000, // 난수:최소값
  MAX_NUMBER = 9999; // 난수:최대값

const PENDING_LIST = "pendingList", // pendingList
  FINISHED_LIST = "finishedList"; // finishedList

const PENDING_LS = "PENDING", // LocalStorage.key of pendingList
  FINISHED_LS = "FINISHED"; // LocalStorage.key of finishedList

let pendingExistList = [], // pendingList의 저장배열
  finishedExistList = []; // finishedList의 저장배열

/**
 * Generate Random Number
 */
function genId() {
  const randomNumber = Math.floor(
    Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER
  );
  // 중복체크
  for (let duplicateCheck of allListId) {
    if (duplicateCheck.id.replace(ID_NUMBER, "") === randomNumber.toString()) {
      return genId();
    }
  }
  return ID_NUMBER.concat(randomNumber);
}

/**
 * 리스트를 localStorage에 저장
 *
 * @param  {} listName
 */
function saveList(listName) {
  if (listName === PENDING_LIST) {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingExistList));
  } else if (listName === FINISHED_LIST) {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedExistList));
  }
}

/**
 * Delete button Click Event
 * 해당 리스트를 삭제
 *
 * @param  {} event
 * @param  {} listName
 */
function deleteList(event, listName) {
  const btn = event.target;
  const li = btn.parentNode;
  const currentList = document.querySelector(`.js-${listName}`);
  currentList.removeChild(li);
  if (listName === PENDING_LIST) {
    // 삭제된 ID를 찾아 pendingList를 재배열
    const currentExistList = pendingExistList.filter(
      (list) => list.id !== li.id
    );
    pendingExistList = currentExistList;
  } else if (listName === FINISHED_LIST) {
    // 삭제된 ID를 찾아 pendingList를 재배열
    const currentExistList = finishedExistList.filter(
      (list) => list.id !== li.id
    );
    finishedExistList = currentExistList;
  }
  saveList(listName);
}

/**
 * Check Button Click Event
 * pendingList -> finishedList
 *
 * @param  {} event
 * @param  {} listName
 * @param  {} id
 * @param  {} text
 */
function moveToFinished(event, listName, id, text) {
  deleteList(event, listName);
  paintList(FINISHED_LIST, id, text);
}

/**
 * Back Button Click Event
 * finishedList -> pendingList
 *
 * @param  {} event
 * @param  {} listName
 * @param  {} id
 * @param  {} text
 */
function moveToPending(event, listName, id, text) {
  deleteList(event, listName);
  paintList(PENDING_LIST, id, text);
}

/**
 * HTML Input Press Enter Event
 * inputText -> pendingList
 *
 * @param  {} event
 */
function handleSubmit(event) {
  event.preventDefault();
  const inputText = addTaskInput.value;
  const newId = genId();
  paintList(PENDING_LIST, newId, inputText);
  addTaskInput.value = "";
}

/**
 * 리스트를 화면에 구성
 *
 * @param  {} listName
 * @param  {} id
 * @param  {} text
 */
function paintList(listName, id, text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const subBtn = document.createElement("button");
  const createList = document.querySelector(`.js-${listName}`);
  const listObj = {
    id: id,
    text: text,
  };
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", (event) => deleteList(event, listName));
  if (listName === PENDING_LIST) {
    // pendingListArea
    subBtn.innerText = "✔";
    pendingExistList.push(listObj);
    subBtn.addEventListener("click", (event) =>
      moveToFinished(event, listName, id, text)
    );
  } else if (listName === FINISHED_LIST) {
    // finishedListArea
    subBtn.innerText = "⏪";
    finishedExistList.push(listObj);
    subBtn.addEventListener("click", (event) =>
      moveToPending(event, listName, id, text)
    );
  }
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(subBtn);
  li.id = id;
  createList.appendChild(li);
  saveList(listName);
}

/**
 * localStorage 필터하기
 *
 * @param  {} localStorage
 */
function filterList(localStorage) {
  for (let i = 0; i < localStorage.length; i++) {
    const localStorageName = localStorage.key(i);
    const parsedList = JSON.parse(localStorage.getItem(localStorageName));
    if (localStorageName === PENDING_LS) {
      parsedList.forEach((list) => paintList(PENDING_LIST, list.id, list.text));
    } else if (localStorageName === FINISHED_LS) {
      parsedList.forEach((list) =>
        paintList(FINISHED_LIST, list.id, list.text)
      );
    }
  }
}

/**
 * 리스트 불러오기
 */
function loadList() {
  const localStorage = this.localStorage;
  if (localStorage !== null) {
    filterList(localStorage);
  }
}

/**
 * 화면 초기화
 */
function init() {
  loadList();
  tasksForm.addEventListener("submit", handleSubmit);
}

init(); // 화면 초기화 함수 실행
