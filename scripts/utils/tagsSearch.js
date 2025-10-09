import { getIngredients, getAppliances, getUstensils } from "./handleTags.js";

export function ingredientTagsMatch(recipe, tagArray) {
  return tagArray.every(tag =>
    recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function applianceTagsMatch(recipe, tagArray) {
  return tagArray.every(tag =>
    recipe.appliance.toLowerCase().includes(tag.toLowerCase())
  );
}

export function ustensilTagsMatch(recipe, tagArray) {
  return tagArray.every(tag =>
    recipe.ustensils.some(ust => ust.toLowerCase().includes(tag.toLowerCase()))
  );
} 

export function categorizeTags(tagArray, recipes) {
  const allIngredients = getIngredients(recipes);
  const allAppliances = getAppliances(recipes);
  const allUstensils = getUstensils(recipes);
  
  const categorizedTags = {
    ingredients: [],
    appliances: [],
    ustensils: []
  };
  
  tagArray.forEach(tag => {
    if (allIngredients.includes(tag)) {
      categorizedTags.ingredients.push(tag);
    } else if (allAppliances.includes(tag)) {
      categorizedTags.appliances.push(tag);
    } else if (allUstensils.includes(tag)) {
      categorizedTags.ustensils.push(tag);
    }
  });
  
  return categorizedTags;
}