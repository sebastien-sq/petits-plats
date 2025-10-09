import {
  ingredientTagsMatch,
  applianceTagsMatch,
  ustensilTagsMatch,
  categorizeTags,
} from "./tagsSearch.js";



export function mainSearch(recipes, searchedItem, tagArray) {
  const searchedTerm = searchedItem.trim().toLowerCase();

  let filteredRecipes = recipes;

  if (searchedTerm.length > 0) {
    filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchedTerm) ||
        recipe.description.toLowerCase().includes(searchedTerm) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchedTerm)
        )
    );
  }

  // Filtrer les recettes qui correspondent à TOUS les tags sélectionnés

  if (tagArray && tagArray.length > 0) {
    const categorizedTags = categorizeTags(tagArray, recipes);
    
    filteredRecipes = filteredRecipes.filter((recipe) => {
      let matchesAllTags = true;
      
      if (categorizedTags.ingredients.length > 0) {
        matchesAllTags = matchesAllTags && ingredientTagsMatch(recipe, categorizedTags.ingredients);
      }
      
        if (categorizedTags.appliances.length > 0) {
        matchesAllTags = matchesAllTags && applianceTagsMatch(recipe, categorizedTags.appliances);
      }
      
      if (categorizedTags.ustensils.length > 0) {
        matchesAllTags = matchesAllTags && ustensilTagsMatch(recipe, categorizedTags.ustensils);
      }
      
      return matchesAllTags;
    });

    console.log("After tag filtering, filteredRecipes = ", filteredRecipes);
  }

  if (filteredRecipes.length === 0) {
    const mainInput = document.getElementById("main-search-input");
    mainInput.placeholder = `Aucune recette ne correspond à votre recherche "${searchedTerm}"`;
  }

  return filteredRecipes;
}
