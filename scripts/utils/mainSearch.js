export function mainSearch(recipes, searchedItem) {
  const searchTerms = searchedItem.trim().toLowerCase().split(/\s+/);
  const searchRegex = new RegExp(`\\b(${searchTerms.join('|')})\\b`, 'i');

  const filteredRecipes = recipes.filter((recipe) => 
    searchRegex.test(recipe.name.toLowerCase()) ||
    searchRegex.test(recipe.description.toLowerCase()) ||
    recipe.ingredients.some(ing => searchRegex.test(ing.ingredient.toLowerCase()))
  );
  if (filteredRecipes.length === 0) {
    const mainInput = document.getElementById("main-search-input");
    mainInput.placeholder = `Aucune recette ne correspond à votre recherche "${searchTerms}"`;
  }
  return filteredRecipes;
}
