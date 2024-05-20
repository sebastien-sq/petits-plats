import { getAppliances, getIngredients, getUstensils } from "../utils/getFilters.js";
export default class Filters {
    constructor(data){
        this.ustensils = getUstensils(data);
        this.ingredients = getIngredients(data);
        this.appliances = getAppliances(data);
    }

    createFilters(){
        const filters = document.getElementById('filters');
        filters.innerHTML = `
        <div class="dropdown mt-4 mb-4">
            <button class="btn btn-light btn-lg dropdown-toggle z-index-10" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Ingrédients
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <input class="dropdown-item" type="text" placeholder="Search" aria-label="Search">
                <div class="dropdown-divider">
                </div>
                ${this.ingredients.map(ingredient => (`<a class="dropdown-item" href="#">${ingredient}</a>`)).join('')}
            </div>
        </div>
        <div class="dropdown mt-4 mb-4">
        <button class="btn btn-light btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Appareil
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <input class="dropdown-item" type="text" placeholder="Search" aria-label="Search">
            <div class="dropdown-divider">
            </div>
            ${this.appliances.map(appliance => (`<a class="dropdown-item" href="#">${appliance}</a>`)).join('')}
        </div>
    </div>
    <div class="dropdown mt-4 mb-4">
        <button class="btn btn-light btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Ustensiles
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <input class="dropdown-item" type="text" placeholder="Search" aria-label="Search">
            <div class="dropdown-divider"></div>
            ${this.ustensils.map(ustensil => (`<a class="dropdown-item" href="#">${ustensil}</a>`)).join('')}
        </div>
    </div>
        `;
    }

}


