import Api from "../api/Api.js";
import Recipe from "../models/Recipe.js";
import RecipeCard from "../templates/RecipeCard.js";
import Filters from "../templates/Filters.js";
import { handleFilters } from "../utils/handleFilters.js";

// Create an instance of the Api class
const url = "/data/recipes.json";
const api = new Api(url);
 // Get the container element
 const container = document.getElementById('card-container');

const displayRecipes = async () => {
    try {
        // Get the recipes data
        const data = await api.get();
        // Create an array of Recipe objects
        const recipes = data.map((recipe) => new Recipe(recipe));
        // Create an instance of the Filters class
        const filters = new Filters(recipes);
        // Call the createFilters method
        filters.createFilters();
        handleFilters();
        // Create an array of RecipeCard objects
        const recipeCards = recipes.map((recipe) => new RecipeCard(recipe));
        // Append the recipe cards to the colDiv  
        recipeCards.forEach((recipeCard) => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-4 d-flex align-items-start justify-content-start gap-3';
        colDiv.appendChild(recipeCard.createRecipeCard());
        // Add the column (and therefore the card) to the container
        container.appendChild(colDiv);
    });
    } catch (error) {
        console.error(error);
    }
}
// Call the displayRecipes function
displayRecipes();
