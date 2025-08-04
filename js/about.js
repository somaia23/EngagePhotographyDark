    function showTab(tabId, btn) {
      const contents = document.querySelectorAll('.tab-content');
      const buttons = document.querySelectorAll('.tabs button');

      contents.forEach(content => content.classList.remove('active'));
      buttons.forEach(button => button.classList.remove('active'));

      document.getElementById(tabId).classList.add('active');
      btn.classList.add('active');
    }

    document.addEventListener("DOMContentLoaded", () => {
      const mobileToggle = document.querySelector(".mobile-toggle");
      const navMenu = document.querySelector(".nav-menu");

      if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
          mobileToggle.classList.toggle("active");
          navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach((link) => {
          link.addEventListener("click", () => {
            mobileToggle.classList.remove("active");
            navMenu.classList.remove("active");
          });
        });
      }

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