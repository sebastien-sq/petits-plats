export function mainSearch(recipes, searchedItem, tagArray) {
  // Normalisation des termes de recherche
  const searchedTerm = searchedItem.trim().toLowerCase();

  let filteredRecipes = recipes;

  if (searchedTerm.length > 0) {
    filteredRecipes = recipes.filter((recipe) => 
      recipe.name.toLowerCase().includes(searchedTerm) ||
      recipe.description.toLowerCase().includes(searchedTerm) ||
      recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchedTerm))
    );
  } 

  // Check if the recipe has the selected tags if there are selected tags
  // Difference between every and some is that every is true if all tags are present,
  // and some is true if at least one tag is present
  
  if (tagArray && tagArray.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      // Check if all ingredient tags are present in the recipe
      const ingredientTagsMatch = tagArray.every(tag =>
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(tag.toLowerCase()))
      );
    
      // Check if any appliance tags are present
      const applianceTagsMatch = tagArray.some(tag =>
        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
      );
    
      // Check if any utensil tags are present
      const ustensilTagsMatch = tagArray.every(tag =>
        recipe.ustensils.some(ust => ust.toLowerCase().includes(tag.toLowerCase()))
      );
    
      // A recipe must satisfy all ingredients, any appliances or utensils tag
      return ingredientTagsMatch || applianceTagsMatch || ustensilTagsMatch;
    });
    
  }

  if (filteredRecipes.length === 0) {
    const mainInput = document.getElementById("main-search-input");
    mainInput.placeholder = `Aucune recette ne correspond à votre recherche "${searchedTerm}"`;
  }

  return filteredRecipes;
}