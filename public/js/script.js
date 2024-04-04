const body = document.querySelector("body");
const buttons = document.querySelectorAll("button");
const textareas = document.querySelectorAll("textarea");
const inputs = document.querySelectorAll("input");
const colorSelect = document.querySelectorAll(".color-select");

colorSelect.forEach((sel) => {
  sel.addEventListener("click", () => {
    let color = sel.getAttribute("data-color");

    // SWITCH STATEMENT?

    switch (color) {
      case "light":
        changeTextarea("#ffffff", "#000000");
        changeInput("#ffffff", "#000000");
        changeButton("#ffffff", "#000000");
        break;
      case "dark":
        changeTextarea("#575757", "#ffffff");
        changeInput("#575757", "#ffffff");
        changeButton("#575757", "#ffffff");
        break;

      case "blue":
        break;

      case "purple":
        break;

      case "green":
        break;

      case "pink":
        break;

      default:
        break;
    }

    body.classList.remove(...body.classList);
    body.classList.toggle(`${color}`);
  });
});

const changeTextarea = function (color1, color2) {
  textareas.forEach((t) => {
    t.style.backgroundColor = color1;
    t.style.color = color2;
  });
};

const changeInput = function (color1, color2) {
  inputs.forEach((i) => {
    i.style.backgroundColor = color1;
    i.style.color = color2;
  });
};

const changeButton = function (color1, color2) {
  buttons.forEach((b) => {
    b.style.backgroundColor = color1;
    b.style.color = color2;
  });
};
