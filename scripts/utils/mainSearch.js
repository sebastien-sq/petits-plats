export function mainSearch(recipes) {
  const filteredRecipes = recipes.filter((recipe) => {

    const searchedItem = document
      .getElementById("main-search-input")
      .value.toLowerCase();

    const ingredientFilter = Array.from(recipe.ingredients).includes(searchedItem);
    console.log(ingredientFilter)
    return recipe.name.toLowerCase().includes(searchedItem);
  });
  return filteredRecipes;
}
