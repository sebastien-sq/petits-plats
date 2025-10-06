import Recipe from "../models/Recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import Filters from "../templates/Filters.js";

export function showRecipes(data) {
  try {
    // Get the container element
    const container = document.getElementById("card-container");
    // Clear the container
    container.innerHTML = "";
    // Update the recipes counter
    const recipesCounter = document.getElementById("counter");
    recipesCounter.textContent = `${data.length} recettes`;
    // Create an array of Recipe objects
    const recipes = data.map((recipe) => new Recipe(recipe));
    // Create an instance of the Filters class
    const filters = new Filters(recipes);
    // Call the createFilters method to display the filters
    filters.createFilters();
    // Create an array of RecipeCard objects
    const recipeCards = recipes.map((recipe) => new RecipeCard(recipe));
    // Append the recipe cards to the colDiv
    recipeCards.forEach((recipeCard) => {
      const colDiv = document.createElement("div");
      colDiv.className =
        "col d-flex align-items-start justify-content-start";
      colDiv.appendChild(recipeCard.createRecipeCard());
      // Add the column (and therefore the card) to the container
      container.appendChild(colDiv);
    });
  } catch (error) {
    console.error(error);
  }
}
