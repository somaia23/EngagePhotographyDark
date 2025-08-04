// const filterButtons = document.querySelectorAll(".filter-btn");
// const albumItems = document.querySelectorAll(".album-item");

// filterButtons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     filterButtons.forEach((b) => b.classList.remove("active"));
//     btn.classList.add("active");

//     const filter = btn.getAttribute("data-filter");

//     albumItems.forEach((item) => {
//       const shouldShow = filter === "all" || item.classList.contains(filter);

//       if (shouldShow) {
//         item.style.display = "block";

//         setTimeout(() => {
//           item.classList.remove("hide");
//         }, 10);
//       } else {
//         item.classList.add("hide");

//         setTimeout(() => {
//           item.style.display = "none";
//         }, 500);
//       }
//     });
//   });
// });

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