import {
  getAppliances,
  getIngredients,
  getUstensils,
} from "../utils/getFilters.js";
export default class Filters {
  constructor(data) {
    this.ustensils = getUstensils(data);
    this.ingredients = getIngredients(data);
    this.appliances = getAppliances(data);
  }

  createDropdown(id, title, items) {
    return `
        <div class="dropdown-container mt-4 mb-4">
          <button class="btn btn-light btn-lg dropdown-toggle w-100" type="button" id="${id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ${title}
          </button>
          <div class="dropdown-menu" aria-labelledby="${id}">
            <div class="input-group position-relative w-100 h-auto">
              <input class="dropdown-search" type="text" aria-label="Search">
              <button class="btn z-index-100" id="btn-delete" type="button">
                <img src="/assets/icons/delete-icon.svg" height="12px">
              </button>
              <label for="search" name="search" id="search-label" >
              <img src="/assets/icons/loupe.svg" height='20px'>
              </label>
            </div>
            <div class="dropdown-divider"></div>
            ${items
              .map((item) => `<a class="dropdown-item" href="#">${item}</a>`)
              .join("")}
          </div>
        </div>`;
  }

  createFilters() {
    const filters = document.getElementById("filters");
    filters.innerHTML = `
        ${this.createDropdown(
          "ingredientsDropdown",
          "Ingrédients",
          this.ingredients
        )}
        ${this.createDropdown(
          "appliancesDropdown",
          "Appareil",
          this.appliances
        )}
        ${this.createDropdown(
          "ustensilsDropdown",
          "Ustensiles",
          this.ustensils
        )}
      `;
  }
}
