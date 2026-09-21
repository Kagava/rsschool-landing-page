import { COLOR_THEME_KEY } from "./constants.js";
import { THEME_LIGHT } from "./constants.js";
import { THEME_DARK } from "./constants.js";

const radioLight = document.getElementById("theme-light");
const radioDark = document.getElementById("theme-dark");

let currentColorTheme = localStorage.getItem(COLOR_THEME_KEY);

radioDark.addEventListener("change", () => {
  localStorage.setItem(COLOR_THEME_KEY, THEME_DARK);
});

radioLight.addEventListener("change", () => {
  localStorage.setItem(COLOR_THEME_KEY, THEME_LIGHT);
});

if (currentColorTheme === THEME_DARK) {
  radioDark.checked = true;
}
