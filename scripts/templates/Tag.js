export default class Tag {
  constructor(data) {
    this.tag = data;
  }

  createTag() {
    const tagsContainer = document.getElementById("tags");
    tagsContainer.innerHTML += `
                <span class="tag d-flex justify-content-between align-items-center nowrap gap-1 badge rounded-pill fs-6 m-0" aria-label="Tag ${this.tag}">
                ${this.tag}
                <button class="btn z-index-100 p-0 m-0 btn-deleteTag" type="button">
                <img src="/assets/icons/delete-icon.svg" height="12px">
              </button>
                </span>
        `;

    // Get the delete button to remove the tag
    const deleteTag = document.querySelectorAll(".btn-deleteTag");
    deleteTag.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const tag = btn.parentElement;
        tag.remove();
      });
    });
  }
}
