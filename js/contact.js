     // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Form submission
        const form = document.querySelector('form');
        const successMessage = document.querySelector('.success-message');
        const contactForm = document.querySelector('.contact-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            successMessage.classList.add('show');
            contactForm.classList.add('hidden');
            
            // Reset after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                contactForm.classList.remove('hidden');
                form.reset();
            }, 3000);
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('focus', () => {
            if (window.innerWidth > 768) {
                searchInput.style.width = '250px';
            } else if (window.innerWidth > 480) {
                searchInput.style.width = '180px';
            } else {
                searchInput.style.width = '150px';
            }
        });
        
        searchInput.addEventListener('blur', () => {
            if (searchInput.value === '') {
                if (window.innerWidth > 768) {
                    searchInput.style.width = '200px';
                } else if (window.innerWidth > 480) {
                    searchInput.style.width = '150px';
                } else {
                    searchInput.style.width = '120px';
                }
            }
        });