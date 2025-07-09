/**
 * Theme: Finli
 * Author: Abdulbasit Rubeya
 * Description: A modern and responsive financial dashboard template.
 * Version: 1.0.0
 * 
 * File: script.js
 * This file contains global JavaScript functions to initialize and manage various components of the Finli dashboard.
 */

// Mobile Layout Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('mobile-menu-overlay');

function toggleMobileMenu() {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu on window resize if desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.add('hidden');
    }
});