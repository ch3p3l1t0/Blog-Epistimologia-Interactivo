document.addEventListener('DOMContentLoaded', () => {
    const sections = ['hero', 'intro', 'desarrollo', 'discursos', 'recursos', 'conclusiones', 'biblio'];
    let currentSectionIndex = 0;
    let lastScrollTop = 0;

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('.main-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const nav = document.querySelector('nav');

    // Initialize
    updateNavigation();

    // Add scroll listener to all sections for smart header
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('scroll', handleScroll);
        }
    });

    // Hamburger Menu Toggle
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Event Listeners
    startBtn.addEventListener('click', () => {
        navigateTo(1); // Go to Intro
    });

    nextBtn.addEventListener('click', () => {
        if (currentSectionIndex < sections.length - 1) {
            navigateTo(currentSectionIndex + 1);
        } else {
            navigateTo(0); // Loop back to hero
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetIndex = sections.indexOf(targetId);
            if (targetIndex !== -1) {
                navigateTo(targetIndex);
                // Close mobile menu on navigation
                nav.classList.remove('active');
            }
        });
    });

    // Image Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('img01');
    const timelineImg = document.getElementById('timeline-img');
    const closeModal = document.querySelector('.close-modal');

    if (timelineImg) {
        timelineImg.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = timelineImg.src;
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    function navigateTo(index) {
        if (index === currentSectionIndex) return;

        const currentSectionId = sections[currentSectionIndex];
        const targetSectionId = sections[index];

        const currentEl = document.getElementById(currentSectionId);
        const targetEl = document.getElementById(targetSectionId);

        // Handle Exit of current section
        currentEl.classList.remove('active');
        currentEl.classList.add('exit');

        // Handle Entry of target section
        targetEl.classList.add('active');
        targetEl.classList.remove('exit');

        // Clean up previous exit after animation completes
        setTimeout(() => {
            currentEl.classList.remove('exit');
        }, 800); // Matches transition duration

        currentSectionIndex = index;
        
        // Reset scroll position and header state on navigation
        lastScrollTop = 0;
        header.classList.remove('header-hidden');
        
        updateNavigation();
    }

    function updateNavigation() {
        // Show/Hide navigation controls based on section
        if (currentSectionIndex === 0) {
            document.body.classList.remove('show-controls');
        } else {
            document.body.classList.add('show-controls');
        }

        // Update active class in menu
        navLinks.forEach(link => {
            const targetId = link.getAttribute('data-target');
            if (targetId === sections[currentSectionIndex]) {
                link.style.color = 'var(--primary)';
                link.style.borderBottom = '2px solid var(--secondary)';
            } else {
                link.style.color = 'var(--text-dark)';
                link.style.borderBottom = 'none';
            }
        });

        // Update next button icon/title on last section
        if (currentSectionIndex === sections.length - 1) {
            nextBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
            nextBtn.setAttribute('title', 'Volver al inicio');
        } else {
            nextBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
            nextBtn.setAttribute('title', 'Siguiente sección');
        }
    }

    function handleScroll(e) {
        const scrollTop = e.target.scrollTop;
        
        // Only trigger if moved significantly
        if (Math.abs(scrollTop - lastScrollTop) < 10) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past header
            header.classList.add('header-hidden');
            nav.classList.remove('active'); // Close menu if open
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop;
    }
});
