// import "./styles.css";
const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h2");

// You're gonna need this
function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  const day = xmasDay.getDay();
  const hours = xmasDay.getHours();
  const minutes = xmasDay.getMinutes();
  const seconds = xmasDay.getSeconds();
  clockTitle.innerText = `${day}d ${hours < 10 ? `0${hours}` : hours}h ${
    minutes < 10 ? `0${minutes}` : minutes
  }m ${seconds < 10 ? `0${seconds}` : seconds}s`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
