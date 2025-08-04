  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const searchTerm = searchInput.value.trim();
          if (searchTerm) {
            console.log("Searching for:", searchTerm);
          }
        }
      });
    }
  });