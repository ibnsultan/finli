// Wallet-specific JavaScript functionality with ECharts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize wallet components
    initWalletCharts();
    initWalletComponents();
});

// Wallet chart initialization
function initWalletCharts() {
    // Money Flow Chart
    initMoneyFlowChart();
}

function initMoneyFlowChart() {
    const chartElement = document.getElementById('moneyFlowChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Money Flow',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Income', itemStyle: { color: '#3B82F6' } },
                    { value: 735, name: 'Expenses', itemStyle: { color: '#EF4444' } }
                ]
            }
        ]
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.moneyFlowChart = chart;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

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
