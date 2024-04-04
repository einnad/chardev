const body = document.querySelector("body");
const buttons = document.querySelectorAll("button");
const textareas = document.querySelectorAll("textarea");
const inputs = document.querySelectorAll("input");
const colorSelect = document.querySelectorAll(".color-select");

const textColor = "#000000";

window.onload = () => {
  const theme = localStorage.getItem("theme");
  changeTheme(theme);
};

colorSelect.forEach((sel) => {
  console.log(sel);
  sel.addEventListener("click", () => {
    let color = sel.getAttribute("data-color");

    // SWITCH STATEMENT?
    changeTheme(color);
    localThemeChange(sel.id);
  });
});

const localThemeChange = function (theme) {
  localStorage.setItem("theme", theme);
};

const getTheme = function () {
  return localStorage.getItem("theme");
};

const changeTheme = function (theme) {
  switch (theme) {
    case "light":
      changeTextarea("#ffffff", textColor);
      changeInput("#ffffff", textColor);
      changeButton("#ffffff", textColor);
      changeBody("light");
      break;
    case "dark":
      changeTextarea("#575757", "#ffffff");
      changeInput("#575757", "#ffffff");
      changeButton("#575757", "#ffffff");
      changeBody("dark");
      break;
    case "blue":
      changeTextarea("#C3E1E7", textColor);
      changeInput("#C3E1E7", textColor);
      changeButton("#48A1B5", textColor);
      changeBody("blue");
      break;
    case "purple":
      changeTextarea("#E0C4FB", textColor);
      changeInput("#E0C4FB", textColor);
      changeButton("#A75BF5", textColor);
      changeBody("purple");
      break;
    case "green":
      changeTextarea("#C0E4BF", textColor);
      changeInput("#C0E4BF", textColor);
      changeButton("#69BF66", textColor);
      changeBody("green");
      break;
    case "pink":
      changeTextarea("#F8DEEF", textColor);
      changeInput("#F8DEEF", textColor);
      changeButton("#E68EC7", textColor);
      changeBody("pink");
      break;
    default:
      break;
  }
};

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

const changeBody = function (className) {
  body.classList.remove(...body.classList);
  body.classList.add(`${className}`);
};
