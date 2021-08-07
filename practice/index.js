// import "./styles.css";
"use strict";

class Practice {
  constructor() {
    this.btn1 = document.querySelector(".btn1");
    this.btn2 = document.querySelector(".btn2");
    this.btn1.addEventListener("click", this.print);
    this.btn2.addEventListener("click", (event) => this.print(this.btn2));
  }
  print() {
    console.log(this);
  }
}
const example = new Practice();
