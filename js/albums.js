const filterButtons = document.querySelectorAll(".filter-btn");
const albumItems = document.querySelectorAll(".album-item");
const albumsGrid = document.querySelector(".albums-grid");

// Initialize: make sure all items are visible and don't have hide class
albumItems.forEach(item => {
  item.style.display = "block";
  item.classList.remove("hide");
  // Add initial animation state
  item.style.opacity = "1";
  item.style.transform = "scale(1) translateY(0)";
});

// Set initial grid height to prevent footer jumping
function setGridHeight() {
  const currentHeight = albumsGrid.offsetHeight;
  albumsGrid.style.minHeight = currentHeight + "px";
}

// Set initial height after page loads
setTimeout(setGridHeight, 100);

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach(b => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    // Maintain current grid height during transition
    const currentHeight = albumsGrid.offsetHeight;
    albumsGrid.style.height = currentHeight + "px";

    // Phase 1: Hide all items with staggered animation
    albumItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("hide");
        item.style.opacity = "0";
        item.style.transform = "scale(0.8) translateY(20px)";
      }, index * 50); // Stagger the hide animation
    });

    // Phase 2: After all animations complete, rearrange and show filtered items
    setTimeout(() => {
      // Get filtered items
      const filteredItems = Array.from(albumItems).filter(item => {
        const itemClasses = Array.from(item.classList).map(cls => cls.toLowerCase());
        const filterLower = filter.toLowerCase();
        return filter === "all" || itemClasses.includes(filterLower);
      });

      // Hide all items first
      albumItems.forEach(item => {
        item.style.display = "none";
        item.style.opacity = "0";
        item.style.transform = "scale(0.8) translateY(20px)";
      });

      // Clear the grid
      albumsGrid.innerHTML = "";

      // Add filtered items back to grid in order
      filteredItems.forEach((item, index) => {
        item.style.display = "block";
        item.classList.remove("hide");
        albumsGrid.appendChild(item);
        
        // Animate in with staggered effect
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1) translateY(0)";
        }, index * 80 + 100); // Stagger the show animation with delay
      });

      // Add remaining hidden items back to DOM (but keep them hidden)
      albumItems.forEach(item => {
        if (!filteredItems.includes(item)) {
          item.style.display = "none";
          item.classList.add("hide");
          albumsGrid.appendChild(item);
        }
      });

      // After all items are shown, adjust grid height smoothly
      setTimeout(() => {
        
        albumsGrid.style.height = "auto";
        const newHeight = albumsGrid.offsetHeight;
        albumsGrid.style.height = currentHeight + "px";
        
        // Smooth transition to new height
        setTimeout(() => {
          albumsGrid.style.transition = "height 0.5s ease";
          albumsGrid.style.height = newHeight + "px";
          
          // Remove fixed height after transition
          setTimeout(() => {
            albumsGrid.style.height = "auto";
            albumsGrid.style.transition = "";
          }, 500);
        }, 50);
      }, filteredItems.length * 80 + 200);

    }, albumItems.length * 50 + 300); // Wait for all hide animations to complete
  });
});

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