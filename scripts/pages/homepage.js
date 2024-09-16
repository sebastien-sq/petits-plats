import Api from "../api/Api.js";
import { mainSearch } from "../utils/mainSearch.js";
import { showRecipes } from "../utils/showRecipes.js";

// Create an instance of the Api class
const url = "/data/recipes.json";
const api = new Api(url);
// Get the recipes data at first load
export const allRecipes = await api.get();
// Initialize the tag array
export const tagArray = [];
// Call the showRecipes function at first load
showRecipes(allRecipes);

// Add Event Listener to the main search
const mainInput = document.getElementById("main-search-input");
const btnDelete = document.getElementById("btn-main-deleteSearch");
// Hide the delete button if mainInput search field is empty at first load
if (mainInput.value.trim() === "") {
  btnDelete.style.display = "none";
}

// Add eventlistener on delete button to delete the input field
btnDelete.addEventListener("click", () => {
  mainInput.value = "";
  btnDelete.style.display = "none";
  mainInput.focus();
  showRecipes(allRecipes);
});
//
// Add eventlistener on input field to search the recipe and show the filtered recipes, only if the input field is greater than 3 characters
//
mainInput.addEventListener("input", () => {
// Show or hide the delete button on input
  if (mainInput.value.trim() !== "") {
    btnDelete.style.display = "flex";
  }
  if (mainInput.value.length >= 3) {
  const filteredRecipes = mainSearch(allRecipes, mainInput.value, tagArray);
  showRecipes(filteredRecipes)}
 
});

mainInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (mainInput.value.length >= 3) {
      const filteredRecipes = mainSearch(allRecipes, mainInput.value, tagArray);
      showRecipes(filteredRecipes)}
      // Focus and clear the input field
      mainInput.focus();
      mainInput.value = "";
      btnDelete.style.display = "none";
  }
});

