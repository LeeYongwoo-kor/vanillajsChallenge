// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const title = document.getElementById("title");

const COLOR_HALF_CLASS = "color-half";
const COLOR_FULL_CLASS = "color-full";

const addClass = (className) => title.classList.add(className);
const removeClass = (className) => title.classList.remove(className);

function handleResize() {
  if (window.innerWidth < window.screen.width / 2) {
    addClass(COLOR_HALF_CLASS);
    removeClass(COLOR_FULL_CLASS);
  } else if (window.innerWidth > (window.screen.width * 80) / 100) {
    removeClass(COLOR_HALF_CLASS);
    addClass(COLOR_FULL_CLASS);
  } else {
    removeClass(COLOR_HALF_CLASS);
    removeClass(COLOR_FULL_CLASS);
  }
}

const init = () => window.addEventListener("resize", handleResize);
init();
