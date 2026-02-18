document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    function showSlide(index) {
        if (index >= totalSlides) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = totalSlides - 1;
        else currentSlideIndex = index;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlideIndex].classList.add('active');
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active');
        }
    }

    // Optimize: Make functions global if needed for inline onclick, or attach listeners
    window.moveSlide = function (n) {
        showSlide(currentSlideIndex + n);
    };

    window.currentSlide = function (n) {
        showSlide(n);
    };

    // Auto play
    let slideInterval = setInterval(() => {
        moveSlide(1);
    }, 6000);

    // Pause on hover
    const slider = document.getElementById('hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => moveSlide(1), 6000);
        });
    }
});
