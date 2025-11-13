// equipment.js

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const equipmentItems = document.querySelectorAll(".equipment-item");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      equipmentItems.forEach(item => {
        const name = item.querySelector("h3").innerText.toLowerCase();
        item.style.display = name.includes(query) ? "block" : "none";
      });
    });
  }
});


