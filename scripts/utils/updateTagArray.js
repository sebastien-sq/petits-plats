import { tagArray } from "../pages/homepage.js";
import { allRecipes } from "../pages/homepage.js";
import { mainSearch } from "./mainSearch.js";
import { showRecipes } from "./showRecipes.js";

const mainInput = document.getElementById("main-search-input");
let filteredRecipes = [];

export function addTagToArray(tag) {
  tagArray.push(tag);
  console.log("tag added = ", tag);
  console.log("tagArray = ", tagArray);
  // Update the search
 filteredRecipes = mainSearch(allRecipes, mainInput.value, tagArray);
 showRecipes(filteredRecipes);
}

export function removeTagFromArray(tag) {
    console.log("Initial tagArray = ", tagArray);
    const index = tagArray.indexOf(tag);
    if (index !== -1) {
      let deletedTag = tagArray.splice(index, 1);
      console.log("deletedTag = ", deletedTag);
    } else {
      console.log("Tag not found: ", tag);
    }
    console.log("Updated tagArray = ", tagArray);
    
    // Update the search
    filteredRecipes = mainSearch(allRecipes, mainInput.value, tagArray);
    showRecipes(filteredRecipes);
  }
  