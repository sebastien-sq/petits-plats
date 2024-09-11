export function mainSearch(allRecipes) {
  const filteredData = allRecipes.filter((recipe) => {
    const searchValue = document
      .getElementById("main-search-input")
      .value.toLowerCase();

    const ingredientFilter = Array.from(recipe.ingredients).includes(searchValue);
    console.log(ingredientFilter)
    return recipe.name.toLowerCase().includes(searchValue);
  });
  return filteredData;
}
