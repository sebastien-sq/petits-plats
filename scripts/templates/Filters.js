import {
  getAppliances,
  getIngredients,
  getUstensils,
} from "../utils/handleTags.js";
import Tag from "./Tag.js";
import { tagArray } from "../pages/homepage.js";
import { removeTagFromArray } from "../utils/updateTagArray.js";

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
              .map((item) => `<a class=\"dropdown-item\" href=\"#\">${item}</a>`)
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
      const text = item.textContent.trim();
      // Marquer visuellement les tags déjà sélectionnés
      if (tagArray.includes(text)) {
        item.classList.add("dropdown-item-selected", "fw-bold", "d-flex", "align-items-center");
        // Ajouter un bouton croix pour retirer (une seule fois)
        if (!item.querySelector(".btn-remove-selected")) {
          const removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-sm p-0 m-0 ms-auto btn-remove-selected";
          removeBtn.setAttribute("aria-label", `Retirer le tag ${text}`);
          removeBtn.innerHTML = `<img src="/assets/icons/delete-icon.svg" height="12" alt="retirer">`;
          item.appendChild(removeBtn);
          removeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeTagFromArray(text);
            // Retirer le badge correspondant du conteneur #tags
            const tagsContainer = document.getElementById("tags");
            if (tagsContainer) {
              const tagsList = tagsContainer.querySelectorAll(".tag");
              Array.from(tagsList).forEach((tagEl) => {
                if (tagEl.textContent.trim() === text) {
                  tagEl.remove();
                }
              });
            }
            // Nettoyer l'état visuel dans le dropdown
            item.classList.remove("dropdown-item-selected", "fw-bold", "d-flex", "align-items-center");
            const existingBtn = item.querySelector(".btn-remove-selected");
            if (existingBtn) existingBtn.remove();
          });
        }
      }

      // Ajout d'un tag au clic sur l'élément
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const tagText = item.firstChild ? item.firstChild.textContent.trim() : text;
        // Si déjà sélectionné, ne rien faire ici (le bouton croix gère la suppression)
        if (tagArray.includes(tagText)) return;

        // Vérifier qu'il n'existe pas déjà dans le conteneur visuel
        const tagsContainer = document.getElementById("tags");
        if (tagsContainer) {
          const tagsList = tagsContainer.querySelectorAll(".tag");
          let tagExists = false;
          Array.from(tagsList).forEach((tag) => {
            if (tag.textContent.trim() === tagText) {
              tagExists = true;
            }
          });
          if (tagExists) return;
        }

        // Créer seulement le tag visuel; l'ajout au tagArray est géré par Tag.createTag()
        const newTag = new Tag(tagText);
        newTag.createTag();
        // Marquer visuellement l'item et ajouter une unique croix à droite
        item.classList.add("dropdown-item-selected", "fw-bold", "d-flex", "align-items-center");
        if (!item.querySelector(".btn-remove-selected")) {
          const removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-sm p-0 m-0 ms-auto btn-remove-selected";
          removeBtn.setAttribute("aria-label", `Retirer le tag ${tagText}`);
          removeBtn.innerHTML = `<img src="/assets/icons/delete-icon.svg" height="12" alt="retirer">`;
          item.appendChild(removeBtn);
          removeBtn.addEventListener("click", (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            removeTagFromArray(tagText);
            const tagsContainer = document.getElementById("tags");
            if (tagsContainer) {
              const tagsList = tagsContainer.querySelectorAll(".tag");
              Array.from(tagsList).forEach((tagEl) => {
                if (tagEl.textContent.trim() === tagText) {
                  tagEl.remove();
                }
              });
            }
            item.classList.remove("dropdown-item-selected", "fw-bold", "d-flex", "align-items-center");
            const existingBtn = item.querySelector(".btn-remove-selected");
            if (existingBtn) existingBtn.remove();
          });
        }
      });
    });
  });
  }
}
