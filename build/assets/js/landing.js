// Finli Landing Page Universal Scripts

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking on links
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Smooth scrolling for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Account for fixed header height + some padding
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive Dashboard Preview
    initializeDashboardPreview();
});

// Add navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/98');
            nav.classList.remove('bg-white/95');
        } else {
            nav.classList.add('bg-white/95');
            nav.classList.remove('bg-white/98');
        }
    }
});

// Interactive Dashboard Preview Function
function initializeDashboardPreview() {
    const dashboardPreview = document.getElementById('dashboard-preview');
    const balanceAmount = document.getElementById('balance-amount');
    const incomeAmount = document.getElementById('income-amount');
    const expensesAmount = document.getElementById('expenses-amount');
    const statusDot = document.getElementById('status-dot');
    const quickActions = document.getElementById('quick-actions');
    const growthIndicator = document.getElementById('growth-indicator');

    if (!dashboardPreview) return;

    // Sample data for dynamic updates
    const sampleData = [
        { balance: '$24,850.32', income: '$5,420', expenses: '$3,240', growth: '+12.5%' },
        { balance: '$25,120.45', income: '$5,890', expenses: '$3,105', growth: '+15.2%' },
        { balance: '$24,650.18', income: '$5,200', expenses: '$3,380', growth: '+9.8%' },
        { balance: '$26,340.92', income: '$6,120', expenses: '$2,950', growth: '+18.7%' }
    ];

    let currentDataIndex = 0;

    // Dashboard hover effects
    dashboardPreview.addEventListener('mouseenter', () => {
        quickActions?.classList.remove('opacity-0', 'translate-y-4');
        quickActions?.classList.add('opacity-100', 'translate-y-0');
        
        const bgElement = dashboardPreview.querySelector('.absolute.inset-0');
        bgElement?.classList.remove('opacity-0');
        bgElement?.classList.add('opacity-100');
        
        const liveIndicator = statusDot?.nextElementSibling;
        liveIndicator?.classList.remove('opacity-0');
        liveIndicator?.classList.add('opacity-100');
    });

    dashboardPreview.addEventListener('mouseleave', () => {
        quickActions?.classList.add('opacity-0', 'translate-y-4');
        quickActions?.classList.remove('opacity-100', 'translate-y-0');
        
        const bgElement = dashboardPreview.querySelector('.absolute.inset-0');
        bgElement?.classList.add('opacity-0');
        bgElement?.classList.remove('opacity-100');
        
        const liveIndicator = statusDot?.nextElementSibling;
        liveIndicator?.classList.add('opacity-0');
        liveIndicator?.classList.remove('opacity-100');
    });

    // Click to cycle through data
    dashboardPreview.addEventListener('click', () => {
        currentDataIndex = (currentDataIndex + 1) % sampleData.length;
        const newData = sampleData[currentDataIndex];
        
        // Animate number changes
        [balanceAmount, incomeAmount, expensesAmount].forEach(el => {
            if (el) el.style.transform = 'scale(0.95)';
        });
        
        setTimeout(() => {
            if (balanceAmount) balanceAmount.textContent = newData.balance;
            if (incomeAmount) incomeAmount.textContent = newData.income;
            if (expensesAmount) expensesAmount.textContent = newData.expenses;
            if (growthIndicator) {
                growthIndicator.innerHTML = growthIndicator.innerHTML.replace(/\+[\d.]+%/, newData.growth);
            }
            
            [balanceAmount, incomeAmount, expensesAmount].forEach(el => {
                if (el) el.style.transform = 'scale(1)';
            });
        }, 150);

        // Flash effect
        dashboardPreview.style.boxShadow = '0 0 30px rgba(53, 95, 229, 0.3)';
        setTimeout(() => {
            dashboardPreview.style.boxShadow = '';
        }, 300);
    });

    // Add tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 transition-opacity duration-300 pointer-events-none z-10';
    tooltip.textContent = 'Click to explore different scenarios';
    dashboardPreview.appendChild(tooltip);

    dashboardPreview.addEventListener('mouseenter', () => {
        setTimeout(() => {
            tooltip.classList.remove('opacity-0');
            tooltip.classList.add('opacity-100');
        }, 1000);
    });

    dashboardPreview.addEventListener('mouseleave', () => {
        tooltip.classList.add('opacity-0');
        tooltip.classList.remove('opacity-100');
    });

    // Simulated live updates
    setInterval(() => {
        if (statusDot && !dashboardPreview.matches(':hover')) {
            statusDot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusDot.style.transform = 'scale(1)';
            }, 200);
        }
    }, 5000);
}