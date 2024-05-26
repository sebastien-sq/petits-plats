import {
  getAppliances,
  getIngredients,
  getUstensils,
} from "../utils/handleTags.js";
import Tag from "./Tag.js";
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
              <input class="dropdown-search-input" type="text" aria-label="Search">
              <button class="btn z-index-100 btn-deleteSearch" type="button" style="display:none">
                <img src="/assets/icons/delete-icon.svg" height="12px">
              </button>
              <button type="submit" id="btn-tags-search" >
              <img src="/assets/icons/loupe.svg" height='20px'>
              </button>
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
    const dropdownSearch = document.querySelectorAll(".dropdown-search-input");
    dropdownSearch.forEach((input) => {
      const btnDelete = input.nextElementSibling;
      // Hide the delete button as search field is empty at first
      if (input.value.trim() === "")
        input.nextElementSibling.style.display = "none";
      // Show or hide the delete button on input
      input.addEventListener("input", () => {
        input.value.trim() === ""
          ? (input.nextElementSibling.style.display = "none")
          : (input.nextElementSibling.style.display = "flex");
      });

      // Add click event listener to the delete button
      btnDelete.addEventListener("click", (e) => {
        e.stopPropagation();
        input.value = "";
        btnDelete.style.display = "none";
        input.focus();
      });
    });

    // Get the dropdown items to show what items/tags is selected on the tags container
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const newTag = new Tag(item.textContent);
        newTag.createTag();
      });
    });
  }
}
