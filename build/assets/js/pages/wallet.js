// Wallet-specific JavaScript functionality with ECharts

document.addEventListener('DOMContentLoaded', function() {
    initWalletComponents();
});

// Wallet-specific components
function initWalletComponents() {
    // Initialize wallet-specific interactive components
    initQuickLinks();
    initCurrencyConverter();
    initCardManagement();
}

function initQuickLinks() {
    // Handle quick link buttons
    const quickLinkButtons = document.querySelectorAll('.quick-link-btn');
    quickLinkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your quick link logic here
            console.log('Quick link clicked:', this.textContent.trim());
        });
    });
}

function initCurrencyConverter() {
    // Handle currency conversion
    const conversionInputs = document.querySelectorAll('.conversion-input');
    conversionInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Add currency conversion logic here
            console.log('Currency conversion:', this.value);
        });
    });
}

function initCardManagement() {
    // Handle card management
    const manageCardBtn = document.querySelector('.manage-card-btn');
    if (manageCardBtn) {
        manageCardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add card management logic here
            console.log('Manage card clicked');
        });
    }

    const withdrawBtn = document.querySelector('.withdraw-btn');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add withdraw logic here
            console.log('Withdraw all earning clicked');
        });
    }
}
