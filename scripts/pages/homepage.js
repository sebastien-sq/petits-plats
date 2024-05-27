import Api from "../api/Api.js";
import { showRecipes } from "../utils/showRecipes.js";

// Create an instance of the Api class
const url = "/data/recipes.json";
const api = new Api(url);
// Get the recipes data at first load
const allRecipes = await api.get();
// Call the showRecipes function at first load
showRecipes(allRecipes);

// Add Event Listener to the main search
const mainInput = document.getElementById("main-search-input");
const btnDelete = document.getElementById("btn-main-deleteSearch");
// Hide the delete button if mainInput search field is empty
if (mainInput.value.trim() === "") {
  btnDelete.style.display = "none";
}
// Show or hide the delete button on input
mainInput.addEventListener("input", () => {
  mainInput.value.trim() === ""
    ? (btnDelete.style.display = "none")
    : (btnDelete.style.display = "flex");
});
// Add eventlistner on delete button to delete the input field
btnDelete.addEventListener("click", () => {
  mainInput.value = "";
  btnDelete.style.display = "none";
  mainInput.focus();
});
