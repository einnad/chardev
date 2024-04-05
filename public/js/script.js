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
      changeTextarea("#2C2C2C", "#cccccc");
      changeInput("#2C2C2C", "#cccccc");
      changeButton("#2C2C2C", "#cccccc");
      changeBody("dark");
      break;
    case "blue":
      changeTextarea("#DFF5FF", "#0C359E");
      changeInput("#DFF5FF", "#0C359E");
      changeButton("#378CE7", "#0C359E");
      changeBody("blue");
      break;
    case "purple":
      changeTextarea("#FFD1E3", "#392467");
      changeInput("#FFD1E3", "#392467");
      changeButton("#A367B1", "#392467");
      changeBody("purple");
      break;
    case "green":
      changeTextarea("#D2E3C8", "#163020");
      changeInput("#D2E3C8", "#163020");
      changeButton("#739072", "#163020");
      changeBody("green");
      break;
    case "pink":
      changeTextarea("#FEE3EC", "#F94892");
      changeInput("#FEE3EC", "#F94892");
      changeButton("#F999B7", "#F94892");
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
