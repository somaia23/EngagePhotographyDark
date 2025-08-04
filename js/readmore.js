document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.querySelector(".comment-form");
  const commentList = document.querySelector(".comments-section");
  const textarea = commentForm.querySelector("textarea");
  const nameInput = commentForm.querySelector('input[type="text"]');
  const emailInput = commentForm.querySelector('input[type="email"]');

  // تحديد مفتاح خاص بالصفحة الحالية لتخزين التعليقات
  const pageName = window.location.pathname.split("/").pop().replace(".html", "");
  const storageKey = `comments-${pageName}`;

  // تحميل التعليقات من localStorage (تجاهل أول تعليق)
  const loadComments = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      JSON.parse(saved).forEach(comment => {
        addComment(comment.name, comment.text, comment.date);
      });
    }
  };

  // حفظ التعليقات في localStorage (تجاهل أول تعليق الثابت)
  const saveComments = () => {
    const comments = [];
    const allComments = document.querySelectorAll(".comment");
    allComments.forEach((comment, index) => {
      if (index === 0) return;
      const name = comment.querySelector(".comment-author").textContent;
      const text = comment.querySelector(".comment-text").textContent;
      const date = comment.querySelector(".comment-date").textContent;
      comments.push({ name, text, date });
    });
    localStorage.setItem(storageKey, JSON.stringify(comments));
  };

  // حذف تعليق (لا يحذف أول تعليق)
  const deleteComment = (commentElement) => {
    const comments = document.querySelectorAll(".comment");
    if (commentElement === comments[0]) return;
    commentElement.remove();
    saveComments();
  };

  // إضافة تعليق جديد في DOM
  const addComment = (name, text, date = new Date().toLocaleDateString()) => {
    const commentBox = document.createElement("div");
    commentBox.className = "comment";
    commentBox.innerHTML = `
      <div class="comment-avatar">${name.charAt(0).toUpperCase()}</div>
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-author">${name}</span>
          <span class="comment-date">${date}</span>
          <button class="delete-btn" title="Delete comment">Delete</button>
        </div>
        <div class="comment-text">${text}</div>
      </div>
    `;

    const deleteBtn = commentBox.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      commentBox.style.transition = "all 0.3s ease-out";
      commentBox.style.transform = "translateX(-100%)";
      commentBox.style.opacity = "0";
      setTimeout(() => deleteComment(commentBox), 300);
    });

    commentList.insertBefore(commentBox, commentForm);
  };

  // عند إرسال نموذج التعليق
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const text = textarea.value.trim();
    if (!name || !text) return;
    addComment(name, text);
    saveComments();
    nameInput.value = "";
    emailInput.value = "";
    textarea.value = "";
  });

  loadComments();
});

// قائمة الهاتف والبحث
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
