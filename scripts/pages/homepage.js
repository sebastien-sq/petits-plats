import Api from "../api/Api.js";
import Recipe from "../models/Recipe.js";
import RecipeCard from "../templates/RecipeCard.js";

// Create an instance of the Api class
const api = new Api("/data/recipes.json");
 // Get the container element
 const container = document.getElementById('card-container');

const displayRecipes = async () => {
    try {
        // Get the recipes data
        const data = await api.get();
        // Create an array of Recipe objects
        const recipes = data.map((recipe) => new Recipe(recipe));
        // Create an array of RecipeCard objects
        const recipeCards = recipes.map((recipe) => new RecipeCard(recipe));
        // Append the recipe cards to the colDiv  
        recipeCards.forEach((recipeCard) => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4';
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
