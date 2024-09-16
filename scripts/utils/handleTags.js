export function getIngredients(data) {
  const ingredients = data.map((recipe) =>
    recipe.ingredients.map((ingredient) =>
      capitalize(ingredient.ingredient.toLowerCase())
    )
  );
  return Array.from(new Set(ingredients.flat()));
}

export function getUstensils(data) {
  const ustensils = data.map((recipe) =>
    recipe.ustensils.map((ustensil) => capitalize(ustensil.toLowerCase()))
  );
  return Array.from(new Set(ustensils.flat()));
}

export function getAppliances(data) {
  const appliances = data.map((recipe) =>
    capitalize(recipe.appliance.toLowerCase())
  );
  return Array.from(new Set(appliances));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


