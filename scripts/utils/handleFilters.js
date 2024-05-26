export function handleFilters() {
  // Display the btn-delete when the input is focused
  const dropdownSearch = document.querySelectorAll(".dropdown-search");
  dropdownSearch.forEach((input) => {
    input.addEventListener("focus", () => {
      input.nextElementSibling.style.display = "block";
    });
  });

  // Delete the text in the search input
  const btnDelete = document.querySelectorAll("#btn-delete");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Prevent the dropdown from closing
      e.stopPropagation();
      // Get the input element and delete the text
      const input = btn.previousElementSibling;
      input.value = "";
    });
  });
}
