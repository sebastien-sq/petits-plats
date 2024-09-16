
export function mainSearch(recipes, searchedItem, tagArray) {
  const searchedTerm = searchedItem.trim().toLowerCase().split(/\s+/);
  const searchRegex = new RegExp(`\\b(${searchedTerm.join('|')})\\b`, 'i');
  let filteredRecipes = recipes;

  // Check the main search input if the recipe name, description or ingredients match the search term
  if (searchedTerm && searchedTerm.length > 0) {
    filteredRecipes = recipes.filter((recipe) => 
      searchRegex.test(recipe.name.toLowerCase()) ||
      searchRegex.test(recipe.description.toLowerCase()) ||
      recipe.ingredients.some(ing => searchRegex.test(ing.ingredient.toLowerCase()))
    );
  }

  // Check if the recipe has the selected tags if there are selected tags
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
      const ustensilTagsMatch = tagArray.some(tag =>
        recipe.ustensils.some(ust => ust.toLowerCase().includes(tag.toLowerCase()))
      );
    
      // A recipe must satisfy all ingredient tags and at least one appliance or utensil tag
      return ingredientTagsMatch || applianceTagsMatch || ustensilTagsMatch;
    });
    
  }

  if (filteredRecipes.length === 0) {
    const mainInput = document.getElementById("main-search-input");
    mainInput.placeholder = `Aucune recette ne correspond à votre recherche "${searchedTerm.join(' ')}"`;
  }

  return filteredRecipes;
}
