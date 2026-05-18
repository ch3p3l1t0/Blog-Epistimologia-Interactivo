document.addEventListener('DOMContentLoaded', () => {
    const sections = ['hero', 'intro', 'desarrollo', 'discursos', 'recursos', 'conclusiones', 'biblio'];
    let currentSectionIndex = 0;

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Initialize
    updateNavigation();

    // Event Listeners
    startBtn.addEventListener('click', () => {
        navigateTo(1); // Go to Intro
    });

    nextBtn.addEventListener('click', () => {
        if (currentSectionIndex < sections.length - 1) {
            navigateTo(currentSectionIndex + 1);
        } else {
            // Loop back to start or just stay? Let's stay or loop.
            navigateTo(0); // Loop back to hero for now
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetIndex = sections.indexOf(targetId);
            if (targetIndex !== -1) {
                navigateTo(targetIndex);
            }
        });
    });

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
});
