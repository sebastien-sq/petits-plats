export function getIngredients(data) {
    const ingredients = data.flatMap(recipe => 
        recipe.ingredients.map(ingredient => capitalize(ingredient.ingredient.toLowerCase()))
    );
    return Array.from(new Set(ingredients));
}

export function getUstensils(data) {
    const ustensils = data.flatMap(recipe => 
        recipe.ustensils.map(ustensil => capitalize(ustensil.toLowerCase()))
    );
    return Array.from(new Set(ustensils));
}

export function getAppliances(data) {
    const appliances = data.map(recipe => 
        capitalize(recipe.appliance.toLowerCase())
    );
    return Array.from(new Set(appliances));
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
