// Dashboard-specific JavaScript functionality with ECharts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initDashboardCharts();
    initDashboardComponents();
});

// Dashboard chart initialization
function initDashboardCharts() {
    // Expense vs Income Chart
    initExpenseIncomeChart();
}

function initExpenseIncomeChart() {
    const chartElement = document.getElementById('expenseIncomeChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
        xAxisData.push('A' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    
    const option = {
        title: {
            text: null
        },
        legend: {
            data: ['Expenses', 'Income']
        },
        toolbox: {
            feature: {
                magicType: {
                    type: ['stack']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            splitLine: {
                show: false
            }
        },
        yAxis: {},
        series: [
            {
                name: 'Expense',
                type: 'bar',
                data: data1,
                emphasis: {
                    focus: 'series'
                },
                animationDelay: function (idx) {
                    return idx * 10;
                }
            },
            {
                name: 'Income',
                type: 'bar',
                data: data2,
                emphasis: {
                    focus: 'series'
                },
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                }
            }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.expenseIncomeChart = chart;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Dashboard-specific components
function initDashboardComponents() {
    // Initialize any dashboard-specific interactive components
    initQuickActions();
    initQuickTransfer();
}

function initQuickActions() {
    // Handle quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your quick action logic here
            console.log('Quick action clicked:', this.textContent.trim());
        });
    });
}

function initQuickTransfer() {
    // Handle quick transfer functionality
    const sendMoneyBtn = document.querySelector('.send-money-btn');
    if (sendMoneyBtn) {
        sendMoneyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add send money logic here
            console.log('Send money clicked');
        });
    }
}
