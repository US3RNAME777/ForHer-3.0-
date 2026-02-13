// js/script.js

// Global variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Function to handle smooth scrolling (used in home page CTA button)
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function for fade-in animations on scroll (for photo/video galleries)
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Lightbox functionality for videos (used in videos.html)
function openLightbox(videoSrc) {
    const lightbox = document.getElementById('lightbox');
    const video = document.getElementById('lightbox-video');
    video.src = videoSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const video = document.getElementById('lightbox-video');
    video.pause();
    video.src = '';
    lightbox.style.display = 'none';
}

// Slideshow functionality for her-photos.html
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    showSlide(currentSlide);
}

// Typewriter effect for the letter page
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Countdown timer for the home page (to October 18, 2025)
function updateCountdown() {
    const targetDate = new Date('October 18, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById('countdown-timer').innerHTML = 'Happy Birthday!';
    }
}

// Music player toggle (optional, for home page)
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const button = document.getElementById('music-toggle');
    if (audio.paused) {
        audio.play();
        button.textContent = 'Pause Music';
    } else {
        audio.pause();
        button.textContent = 'Play Music';
    }
}

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animations
    fadeInOnScroll();

    // Countdown timer (only on home page)
    if (document.getElementById('countdown-timer')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Music player (only on home page)
    if (document.getElementById('music-toggle')) {
        document.getElementById('music-toggle').addEventListener('click', toggleMusic);
    }

    // Typewriter effect (only on letter page)
    const letterText = document.getElementById('letter-text');
    if (letterText) {
        const fullText = letterText.textContent;
        typewriterEffect(letterText, fullText);
    }

    // Slideshow initialization (only on her-photos page)
    if (slides.length > 0) {
        showSlide(currentSlide);
        // Auto-slide every 5 seconds (optional)
        setInterval(() => changeSlide(1), 5000);
    }
});
