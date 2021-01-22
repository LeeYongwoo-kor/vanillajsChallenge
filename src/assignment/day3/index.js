// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>
const title = document.querySelector("h2");

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/
const superEventHandler = {
  decorate: function (color, message) {
    title.style.color = color;
    title.innerHTML = message;
  },
  handleMouseEnter: () =>
    superEventHandler.decorate(colors[0], "The mouse is here!"),
  handleMouseLeave: () =>
    superEventHandler.decorate(colors[1], "The mouse is gone!"),
  handleResize: () =>
    superEventHandler.decorate(colors[2], "You just resized!"),
  handleRightClick: () =>
    superEventHandler.decorate(colors[4], "That was a right click!"),
};

title.addEventListener("mouseenter", superEventHandler.handleMouseEnter);
title.addEventListener("mouseleave", superEventHandler.handleMouseLeave);
window.addEventListener("resize", superEventHandler.handleResize);
window.addEventListener("contextmenu", superEventHandler.handleRightClick);
