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
              <input class="dropdown-search-input" type="text" aria-label="Search" min=3 data-type="${title}">
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
      // Select only the nearest parent container to only have search results among the same type of filters : ingredients, appliances, ustensils
      const dropdownParentContainer = input.closest('.dropdown-container');
      const dropdownItemsOfSameType = dropdownParentContainer.querySelectorAll('.dropdown-item');

      // Hide the delete button as search field is empty at first
      if (input.value.trim() === "")
        btnDelete.style.display = "none";
      // Show or hide the delete button on input
      input.addEventListener("input", () => {
        input.value.trim() === ""
          ? (btnDelete.style.display = "none")
          : (btnDelete.style.display = "flex");
      });
      // Search the term in the dropdown, update the dropdown with the filtered items and show the recipes
     input.addEventListener("input", () => {
      const searchTerm = input.value.toLowerCase().trim();
      dropdownItemsOfSameType.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
            // Add click event listener to the delete button
      btnDelete.addEventListener("click", (e) => {
        e.stopPropagation();
        input.value = "";
        btnDelete.style.display = "none";
        input.focus();
        dropdownItemsOfSameType.forEach(item => {
          item.style.display = '';
        });
      });
    });

    // Get the dropdown items to show what items/tags is selected on the tags container
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        // Get the tags container to check if the tag already exists in the tags container
        const tagsContainer = document.getElementById("tags");
        if (tagsContainer) {
          const tagsList = tagsContainer.querySelectorAll(".tag");
          let tagExists = false;
          Array.from(tagsList).forEach((tag) => {
            if (tag.textContent.trim() === item.textContent.trim()) {
              tagExists = true;
            }
          });
          // If the tag already exists, return
          if (tagExists) {
            return;
          }
        }
        // If the tag does not exist, create a new tag
        const newTag = new Tag(item.textContent.trim());
        newTag.createTag();
      });
    });
  });
  }
}
