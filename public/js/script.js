const body = document.querySelector("body");
const buttons = document.querySelectorAll("button");
const textareas = document.querySelectorAll("textarea");
const inputs = document.querySelectorAll("input");
const colorSelect = document.querySelectorAll(".color-select");

colorSelect.forEach((sel) => {
  sel.addEventListener("click", () => {
    let color = sel.getAttribute("data-color");

    // SWITCH STATEMENT?
    if (color === "dark") {
      textareas.forEach((t) => {
        t.style.backgroundColor = "#575757";
        t.style.color = "#ffffff";
      });
    }

    body.classList.remove(...body.classList);
    body.classList.toggle(`${color}`);
  });
});
