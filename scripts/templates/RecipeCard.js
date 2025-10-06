export default class RecipeCard {
  constructor(data) {
    this.data = data;
  }

  createRecipeCard() {
    const article = document.createElement("article");
    article.classList.add(
      "card",
      "rounded-full",
      "shadow-md",
      "position-relative",
      "recipe-card",
      "h-100",
      "w-100"
    );

    article.innerHTML = `
        <span class="badge rounded-pill position-absolute top-2 end-2 p-2 fs-6 m-0" id="badge">${
          this.data.time
        } min</span>
        <img class="card-img-top object-fit-cover" src="/assets/images/recipes/${
          this.data.image
        }" alt="recette de ${this.data.title}">
        <div class="card-body">
          <h2 class="card-title fw-bold fs-4 mb-4">${this.data.name}</h2>
          <h3 class="card-subtitle fw-bold fs-6 text-uppercase mb-4 text-secondary">Recette</h3>
          <p class="card-text mb-4 clamp-3">${this.data.description}</p>
          <h3 class="card-subtitle fw-bold fs-6 text-uppercase mb-4 text-secondary">Ingrédients</h3>
          <div class="container p-0 row">
            ${this.data.ingredients
              .map(
                (ingredient) => `
              <div class="col mb-2">
                <span>${ingredient.ingredient}</span><br>
                <span class="text-secondary">${ingredient.quantity || ""} ${
                  ingredient.unit || ""
                }</span>
              </div>`
              )
              .join("")}
          </div>
        </div>
      `;
    return article;
  }
}
