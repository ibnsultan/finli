// Analytics-specific JavaScript functionality with ECharts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics components
    initAnalyticsCharts();
    initAnalyticsComponents();
});

// Analytics chart initialization
function initAnalyticsCharts() {
    // Analytics Expense vs Income Chart
    initAnalyticsExpenseIncomeChart();
    
    // Spending Chart
    initSpendingChart();
}

function initAnalyticsExpenseIncomeChart() {
    const chartElement = document.getElementById('analyticsExpenseIncomeChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 12; i++) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        xAxisData.push(months[i]);
        data1.push((Math.sin(i / 3) * (i / 3 - 5) + i / 3) * 1000 + 2000);
        data2.push((Math.cos(i / 3) * (i / 3 - 5) + i / 3) * 800 + 1500);
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
                    type: ['line', 'bar', 'stack']
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
                name: 'Expenses',
                type: 'bar',
                data: data1,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#EF4444'
                }
            },
            {
                name: 'Income',
                type: 'bar',
                data: data2,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: '#10B981'
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.analyticsExpenseIncomeChart = chart;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

function initSpendingChart() {
    const chartElement = document.getElementById('spendingChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Spending',
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 800, name: 'Food & Dining', itemStyle: { color: '#3B82F6' } },
                    { value: 343, name: 'Transportation', itemStyle: { color: '#EF4444' } },
                    { value: 232, name: 'Shopping', itemStyle: { color: '#F59E0B' } }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.spendingChart = chart;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Analytics-specific components
function initAnalyticsComponents() {
    // Initialize analytics-specific interactive components
    initTimeRangeSelectors();
    initSavingsGoals();
    initUpgradePrompt();
}

function initTimeRangeSelectors() {
    // Handle time range selection
    const timeRangeSelectors = document.querySelectorAll('.time-range-selector');
    timeRangeSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            // Add time range logic here
            console.log('Time range changed:', this.value);
            // Refresh charts based on new time range
        });
    });
}

function initSavingsGoals() {
    // Handle savings goals interaction
    const savingsItems = document.querySelectorAll('.savings-item');
    savingsItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add savings goal logic here
            console.log('Savings goal clicked:', this.textContent.trim());
        });
    });
}

function initUpgradePrompt() {
    // Handle upgrade to PRO button
    const upgradeBtn = document.querySelector('.upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add upgrade logic here
            console.log('Upgrade to PRO clicked');
        });
    }
}
