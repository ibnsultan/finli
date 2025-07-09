// Finli JavaScript functionality with ECharts

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Initialize charts
    initCharts();
    
    // Initialize other components
    initComponents();
});

// Navigation system
function initNavigation() {
    const navLinks = document.querySelectorAll('[id^="nav-"]');
    const pageViews = document.querySelectorAll('.page-view');
    const pageTitle = document.getElementById('page-title');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(nav => {
                nav.classList.remove('bg-blue-600', 'text-white');
                nav.classList.add('text-gray-300', 'hover:text-white', 'hover:bg-gray-700');
            });
            
            // Add active class to clicked nav
            this.classList.remove('text-gray-300', 'hover:text-white', 'hover:bg-gray-700');
            this.classList.add('bg-blue-600', 'text-white');
            
            // Hide all page views
            pageViews.forEach(view => {
                view.classList.add('hidden');
            });
            
            // Show selected page view
            const targetPage = this.id.replace('nav-', '') + '-view';
            const targetView = document.getElementById(targetPage);
            
            if (targetView) {
                targetView.classList.remove('hidden');
                // Update page title
                const pageName = this.querySelector('span').textContent;
                pageTitle.textContent = pageName;
                
                // Resize charts when switching views
                setTimeout(() => {
                    resizeAllCharts();
                }, 100);
            }
        });
    });
}

// Chart initialization with ECharts
function initCharts() {
    // Expense vs Income Chart (Dashboard)
    initExpenseIncomeChart();
    
    // Analytics Expense vs Income Chart
    initAnalyticsExpenseIncomeChart();
    
    // Monthly Overview Chart (Analytics)
    initMonthlyOverviewChart();
    
    // Money Flow Chart (Wallet)
    initMoneyFlowChart();
    
    // Spending Chart (Analytics)
    initSpendingChart();
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
            // y: 'bottom',
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
}

function initAnalyticsExpenseIncomeChart() {
    const chartElement = document.getElementById('analyticsExpenseIncomeChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'transparent',
            textStyle: {
                color: '#fff'
            },
            formatter: function(params) {
                let result = params[0].name + '<br/>';
                params.forEach(param => {
                    result += `<span style="color:${param.color}">●</span> ${param.seriesName}: $${param.value.toLocaleString()}<br/>`;
                });
                return result;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9CA3AF',
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9CA3AF',
                fontSize: 12,
                formatter: function(value) {
                    return '$' + (value / 1000) + 'k';
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        },
        series: [
            {
                name: 'Income',
                type: 'bar',
                barWidth: '40%',
                data: [25000, 28000, 26000, 31000, 29000, 33000],
                itemStyle: {
                    color: '#355FE5',
                    borderRadius: [4, 4, 0, 0]
                }
            },
            {
                name: 'Expenses',
                type: 'bar',
                barWidth: '40%',
                data: [18000, 19000, 17500, 21000, 20000, 22000],
                itemStyle: {
                    color: '#EF4444',
                    borderRadius: [4, 4, 0, 0]
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.analyticsExpenseIncomeChart = chart;
}

function initMonthlyOverviewChart() {
    const chartElement = document.getElementById('monthlyOverviewChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'transparent',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9CA3AF',
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9CA3AF',
                fontSize: 12,
                formatter: function(value) {
                    return '$' + (value / 1000) + 'k';
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        },
        series: [
            {
                name: 'Net Income',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#10B981'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
                        { offset: 1, color: 'rgba(16, 185, 129, 0.05)' }
                    ])
                },
                data: [7000, 9000, 8500, 11000],
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#10B981'
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.monthlyOverviewChart = chart;
}

function initMoneyFlowChart() {
    const chartElement = document.getElementById('moneyFlowChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'transparent',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9CA3AF',
                fontSize: 11
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#9CA3AF',
                fontSize: 11,
                formatter: function(value) {
                    return '$' + (value / 1000) + 'k';
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        },
        series: [
            {
                name: 'Income',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 2,
                    color: '#355FE5'
                },
                data: [8000, 8400, 8200, 8600],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#355FE5'
                }
            },
            {
                name: 'Expenses',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 2,
                    color: '#EF4444'
                },
                data: [5000, 5300, 5100, 5400],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#EF4444'
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.moneyFlowChart = chart;
}

function initSpendingChart() {
    const chartElement = document.getElementById('spendingChart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'transparent',
            textStyle: {
                color: '#fff'
            },
            formatter: '{a} <br/>{b}: ${c} ({d}%)'
        },
        series: [
            {
                name: 'Spending',
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 800, name: 'Food & Dining', itemStyle: { color: '#355FE5' } },
                    { value: 343, name: 'Transportation', itemStyle: { color: '#EF4444' } },
                    { value: 232, name: 'Shopping', itemStyle: { color: '#F97316' } }
                ]
            }
        ]
    };
    
    chart.setOption(option);
    
    // Store chart instance for resizing
    window.spendingChart = chart;
}

// Resize all charts
function resizeAllCharts() {
    const charts = [
        window.expenseIncomeChart,
        window.analyticsExpenseIncomeChart,
        window.monthlyOverviewChart,
        window.moneyFlowChart,
        window.spendingChart
    ];
    
    charts.forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
}

// Initialize other components
function initComponents() {
    // Quick Transfer functionality
    initQuickTransfer();
    
    // Search functionality
    initSearch();
    
    // Theme toggle (if implemented)
    initThemeToggle();
    
    // Form interactions
    initFormInteractions();
}

function initQuickTransfer() {
    // Find the Send Money button by looking for buttons with that text content
    const buttons = document.querySelectorAll('button');
    let sendMoneyBtn = null;
    
    buttons.forEach(btn => {
        if (btn.textContent.trim() === 'Send Money') {
            sendMoneyBtn = btn;
        }
    });
    
    const amountInput = document.querySelector('input[placeholder="Enter Amount"]');
    
    if (sendMoneyBtn && amountInput) {
        sendMoneyBtn.addEventListener('click', function() {
            const amount = amountInput.value;
            if (amount) {
                // Simulate transfer
                showNotification(`Sending $${amount}`, 'success');
                amountInput.value = '';
            } else {
                showNotification('Please enter an amount', 'error');
            }
        });
    }
}

function initSearch() {
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search functionality here
            console.log('Searching for:', searchTerm);
        });
    }
}

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            document.body.classList.toggle('dark-theme');
        });
    }
}

function initFormInteractions() {
    // Save Changes button - find by text content
    const buttons = document.querySelectorAll('button');
    let saveBtn = null;
    let discardBtn = null;
    
    buttons.forEach(btn => {
        if (btn.textContent.trim() === 'Save Changes') {
            saveBtn = btn;
        } else if (btn.textContent.trim() === 'Discard') {
            discardBtn = btn;
        }
    });
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulate saving
            this.textContent = 'Saving...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Saved!';
                showNotification('Changes saved successfully!', 'success');
                setTimeout(() => {
                    this.textContent = 'Save Changes';
                    this.disabled = false;
                }, 1000);
            }, 1500);
        });
    }
    
    if (discardBtn) {
        discardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Clear all form inputs
            const inputs = document.querySelectorAll('#settings-view input');
            inputs.forEach(input => {
                if (input.type !== 'file') {
                    input.value = '';
                }
            });
            showNotification('Changes discarded', 'info');
        });
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (difference * progress);
        element.textContent = formatCurrency(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.w-64');
    sidebar.classList.toggle('open');
}

// Notification handling
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Resize handler
window.addEventListener('resize', resizeAllCharts);

// Export functions for global access
window.Finli = {
    showNotification,
    formatCurrency,
    animateNumber,
    toggleMobileMenu,
    resizeAllCharts
};

// Initialize other components
function initComponents() {
    // Quick Transfer functionality
    initQuickTransfer();
    
    // Search functionality
    initSearch();
    
    // Theme toggle (if implemented)
    initThemeToggle();
    
    // Form interactions
    initFormInteractions();
}

function initQuickTransfer() {
    // Find the Send Money button by looking for buttons with that text content
    const buttons = document.querySelectorAll('button');
    let sendMoneyBtn = null;
    
    buttons.forEach(btn => {
        if (btn.textContent.trim() === 'Send Money') {
            sendMoneyBtn = btn;
        }
    });
    
    const amountInput = document.querySelector('input[placeholder="Enter Amount"]');
    
    if (sendMoneyBtn && amountInput) {
        sendMoneyBtn.addEventListener('click', function() {
            const amount = amountInput.value;
            if (amount) {
                // Simulate transfer
                alert(`Sending $${amount}`);
                amountInput.value = '';
            } else {
                alert('Please enter an amount');
            }
        });
    }
}

function initSearch() {
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search functionality here
            console.log('Searching for:', searchTerm);
        });
    }
}

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            document.body.classList.toggle('dark-theme');
        });
    }
}

function initFormInteractions() {
    // Save Changes button - find by text content
    const buttons = document.querySelectorAll('button');
    let saveBtn = null;
    let discardBtn = null;
    
    buttons.forEach(btn => {
        if (btn.textContent.trim() === 'Save Changes') {
            saveBtn = btn;
        } else if (btn.textContent.trim() === 'Discard') {
            discardBtn = btn;
        }
    });
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulate saving
            this.textContent = 'Saving...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Saved!';
                setTimeout(() => {
                    this.textContent = 'Save Changes';
                    this.disabled = false;
                }, 1000);
            }, 1500);
        });
    }
    
    if (discardBtn) {
        discardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Clear all form inputs
            const inputs = document.querySelectorAll('#settings-view input');
            inputs.forEach(input => {
                if (input.type !== 'file') {
                    input.value = '';
                }
            });
        });
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (difference * progress);
        element.textContent = formatCurrency(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.w-64');
    sidebar.classList.toggle('open');
}

// Notification handling
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Resize handler
window.addEventListener('resize', function() {
    // Redraw charts on resize
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.resize();
    });
});

// Export functions for global access
window.Finli = {
    showNotification,
    formatCurrency,
    animateNumber,
    toggleMobileMenu
};
