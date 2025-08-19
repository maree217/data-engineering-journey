// Phase 2: Modern Data Engineering - Interactive JavaScript

// Global variables
let pipelineInterval = null;
let streamingInterval = null;
let streamingChart = null;
let currentStep = 0;
let isStreaming = false;
let totalEvents = 0;
let eventsPerSecond = 0;
let streamingData = [];

// Initialize Mermaid
mermaid.initialize({ 
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1f2937',
        primaryBorderColor: '#2563eb',
        lineColor: '#6b7280',
        secondaryColor: '#e5e7eb',
        tertiaryColor: '#f3f4f6'
    }
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeModernInterface();
});

function initializeModernInterface() {
    setupArchitectureControls();
    setupMLOpsPipeline();
    setupDataLakeDemo();
    setupStreamingDemo();
    setupAzureIntegration();
    setupCostCalculator();
    initializeCharts();
}

// Architecture Controls
function setupArchitectureControls() {
    const buttons = document.querySelectorAll('.arch-button');
    const serviceCards = document.querySelectorAll('.service-card');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const action = this.id;
            highlightArchitectureComponent(action);
        });
    });
}

function highlightArchitectureComponent(action) {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Reset all cards
    serviceCards.forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Highlight specific components based on action
    switch(action) {
        case 'show-ingestion':
            highlightService('ingestion');
            break;
        case 'show-storage':
            highlightService('storage');
            break;
        case 'show-processing':
            highlightService('processing');
            break;
        case 'show-analytics':
            highlightService('analytics');
            break;
        case 'show-complete':
            // Highlight all services in sequence
            animateCompleteArchitecture();
            break;
    }
}

function highlightService(service) {
    const serviceCard = document.querySelector(`[data-service="${service}"]`);
    if (serviceCard) {
        serviceCard.classList.add('highlighted');
    }
}

function animateCompleteArchitecture() {
    const services = ['ingestion', 'storage', 'processing', 'analytics'];
    
    services.forEach((service, index) => {
        setTimeout(() => {
            highlightService(service);
            setTimeout(() => {
                const card = document.querySelector(`[data-service="${service}"]`);
                if (card) card.classList.remove('highlighted');
            }, 1000);
        }, index * 500);
    });
}

// MLOps Pipeline
function setupMLOpsPipeline() {
    const startBtn = document.getElementById('start-pipeline');
    const stopBtn = document.getElementById('stop-pipeline');
    const logsBtn = document.getElementById('view-logs');
    
    if (startBtn) {
        startBtn.addEventListener('click', startMLOpsPipeline);
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', stopMLOpsPipeline);
    }
    
    if (logsBtn) {
        logsBtn.addEventListener('click', toggleLogs);
    }
}

function startMLOpsPipeline() {
    if (pipelineInterval) return; // Already running
    
    currentStep = 0;
    const steps = ['data-prep', 'training', 'validation', 'deployment'];
    const stepNames = ['Data Preparation', 'Model Training', 'Model Validation', 'Deployment'];
    
    logMessage('🚀 Starting MLOps pipeline...', 'info');
    
    pipelineInterval = setInterval(() => {
        if (currentStep >= steps.length) {
            completePipeline();
            return;
        }
        
        const stepId = steps[currentStep];
        const stepName = stepNames[currentStep];
        
        // Update status
        updateStepStatus(stepId, 'running');
        logMessage(`⚙️ Starting ${stepName}...`, 'info');
        
        // Simulate step completion after random time
        setTimeout(() => {
            updateStepStatus(stepId, 'completed');
            logMessage(`✅ ${stepName} completed successfully`, 'success');
            
            // Update metrics during training step
            if (stepId === 'training') {
                updateModelMetrics();
            }
            
            currentStep++;
        }, Math.random() * 3000 + 2000); // 2-5 seconds
        
    }, 5000); // Start next step after 5 seconds
}

function stopMLOpsPipeline() {
    if (pipelineInterval) {
        clearInterval(pipelineInterval);
        pipelineInterval = null;
        currentStep = 0;
        
        // Reset all steps to idle
        const steps = ['data-prep', 'training', 'validation', 'deployment'];
        steps.forEach(step => updateStepStatus(step, 'idle'));
        
        logMessage('⏹️ Pipeline stopped by user', 'warning');
    }
}

function completePipeline() {
    if (pipelineInterval) {
        clearInterval(pipelineInterval);
        pipelineInterval = null;
    }
    
    logMessage('🎉 MLOps pipeline completed successfully!', 'success');
    logMessage('📊 Model deployed to production endpoint', 'success');
    logMessage('🔗 Endpoint: https://ml-model-prod.azurewebsites.net/predict', 'info');
}

function updateStepStatus(stepId, status) {
    const statusElement = document.querySelector(`#${stepId}-status .status-indicator`);
    if (statusElement) {
        statusElement.className = `status-indicator ${status}`;
        statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    }
}

function updateModelMetrics() {
    const metrics = {
        accuracy: Math.random() * 0.15 + 0.82, // 82-97%
        precision: Math.random() * 0.12 + 0.85, // 85-97%
        recall: Math.random() * 0.10 + 0.88, // 88-98%
        f1: Math.random() * 0.08 + 0.87 // 87-95%
    };
    
    Object.keys(metrics).forEach(metric => {
        const element = document.getElementById(`${metric}-metric`);
        if (element) {
            element.textContent = `${(metrics[metric] * 100).toFixed(2)}%`;
            
            // Update mini chart
            updateMiniChart(`${metric}-chart`, metrics[metric]);
        }
    });
}

function updateMiniChart(canvasId, value) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Simple line chart simulation
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < width; i += 5) {
        const y = height - (value * height) + (Math.random() - 0.5) * 10;
        if (i === 0) {
            ctx.moveTo(i, y);
        } else {
            ctx.lineTo(i, y);
        }
    }
    ctx.stroke();
}

function logMessage(message, type = 'info') {
    const logConsole = document.getElementById('log-console');
    if (!logConsole) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    logConsole.appendChild(logEntry);
    logConsole.scrollTop = logConsole.scrollHeight;
    
    // Keep only last 20 entries
    while (logConsole.children.length > 20) {
        logConsole.removeChild(logConsole.firstChild);
    }
}

function toggleLogs() {
    const logs = document.getElementById('pipeline-logs');
    if (logs) {
        logs.style.display = logs.style.display === 'none' ? 'block' : 'none';
    }
}

// Data Lake Demo
function setupDataLakeDemo() {
    const etlBtn = document.getElementById('simulate-etl');
    const eltBtn = document.getElementById('simulate-elt');
    
    if (etlBtn) {
        etlBtn.addEventListener('click', () => simulateDataProcessing('etl'));
    }
    
    if (eltBtn) {
        eltBtn.addEventListener('click', () => simulateDataProcessing('elt'));
    }
}

function simulateDataProcessing(type) {
    const dataFlow = document.getElementById('data-flow');
    const stats = {
        'etl': {
            time: '45 minutes',
            volume: '2.5 GB',
            cost: '$12.50'
        },
        'elt': {
            time: '12 minutes',
            volume: '2.5 GB',
            cost: '$4.80'
        }
    };
    
    if (dataFlow) {
        dataFlow.innerHTML = `
            <div class="process-animation ${type}">
                <div class="data-source">📊 Raw Data</div>
                <div class="arrow">→</div>
                <div class="process-step">${type.toUpperCase()}</div>
                <div class="arrow">→</div>
                <div class="destination">${type === 'etl' ? '🏢 Warehouse' : '🏞️ Data Lake'}</div>
            </div>
        `;
    }
    
    // Animate processing stats
    setTimeout(() => {
        updateProcessingStats(stats[type]);
    }, 1000);
}

function updateProcessingStats(stats) {
    const elements = {
        'processing-time': stats.time,
        'data-volume': stats.volume,
        'processing-cost': stats.cost
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
            element.style.color = '#059669';
            element.style.fontWeight = 'bold';
        }
    });
}

// Streaming Demo
function setupStreamingDemo() {
    const startBtn = document.getElementById('start-stream');
    const pauseBtn = document.getElementById('pause-stream');
    const stopBtn = document.getElementById('stop-stream');
    const rateSlider = document.getElementById('event-rate');
    const rateDisplay = document.getElementById('rate-display');
    
    if (startBtn) startBtn.addEventListener('click', startStreaming);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseStreaming);
    if (stopBtn) stopBtn.addEventListener('click', stopStreaming);
    
    if (rateSlider && rateDisplay) {
        rateSlider.addEventListener('input', function() {
            rateDisplay.textContent = this.value;
        });
    }
}

function startStreaming() {
    if (isStreaming) return;
    
    isStreaming = true;
    const rateSlider = document.getElementById('event-rate');
    let currentRate = rateSlider ? parseInt(rateSlider.value) : 10;
    
    streamingInterval = setInterval(() => {
        if (!isStreaming) return;
        
        // Generate events
        for (let i = 0; i < currentRate; i++) {
            generateStreamEvent();
        }
        
        // Update metrics
        totalEvents += currentRate;
        eventsPerSecond = currentRate;
        updateStreamingMetrics();
        updateStreamingChart();
        
        // Update rate if slider changed
        if (rateSlider) {
            currentRate = parseInt(rateSlider.value);
        }
    }, 1000);
}

function pauseStreaming() {
    isStreaming = !isStreaming;
    const pauseBtn = document.getElementById('pause-stream');
    if (pauseBtn) {
        pauseBtn.textContent = isStreaming ? '⏸️ Pause' : '▶️ Resume';
    }
}

function stopStreaming() {
    if (streamingInterval) {
        clearInterval(streamingInterval);
        streamingInterval = null;
    }
    isStreaming = false;
    totalEvents = 0;
    eventsPerSecond = 0;
    streamingData = [];
    
    updateStreamingMetrics();
    
    const pauseBtn = document.getElementById('pause-stream');
    if (pauseBtn) {
        pauseBtn.textContent = '⏸️ Pause';
    }
    
    const eventLog = document.getElementById('event-log');
    if (eventLog) {
        eventLog.innerHTML = '';
    }
}

function generateStreamEvent() {
    const eventTypes = ['user_click', 'page_view', 'purchase', 'signup', 'logout'];
    const users = ['user_123', 'user_456', 'user_789', 'user_101', 'user_202'];
    
    const event = {
        timestamp: new Date().toISOString(),
        event_type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        user_id: users[Math.floor(Math.random() * users.length)],
        value: Math.round(Math.random() * 1000)
    };
    
    // Add to event log
    const eventLog = document.getElementById('event-log');
    if (eventLog) {
        const eventEntry = document.createElement('div');
        eventEntry.className = 'event-entry';
        eventEntry.textContent = `${event.timestamp} | ${event.event_type} | ${event.user_id} | $${event.value}`;
        
        eventLog.insertBefore(eventEntry, eventLog.firstChild);
        
        // Keep only last 10 entries
        while (eventLog.children.length > 10) {
            eventLog.removeChild(eventLog.lastChild);
        }
    }
    
    return event;
}

function updateStreamingMetrics() {
    const metrics = {
        'total-events': totalEvents.toLocaleString(),
        'events-per-second': eventsPerSecond,
        'processing-lag': Math.floor(Math.random() * 50) + 'ms'
    };
    
    Object.keys(metrics).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = metrics[id];
        }
    });
}

function updateStreamingChart() {
    if (!streamingChart) return;
    
    const now = new Date();
    streamingData.push({
        x: now,
        y: eventsPerSecond
    });
    
    // Keep only last 60 seconds of data
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    streamingData = streamingData.filter(point => point.x > oneMinuteAgo);
    
    streamingChart.data.datasets[0].data = streamingData;
    streamingChart.update('none');
}

// Azure Integration
function setupAzureIntegration() {
    const triggerButtons = document.querySelectorAll('.trigger-btn');
    
    triggerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const serviceBox = this.closest('.service-box');
            triggerAzureService(action, serviceBox);
        });
    });
}

function triggerAzureService(action, serviceBox) {
    const statusElement = serviceBox.querySelector('.service-status');
    
    // Set to active
    statusElement.className = 'service-status active';
    statusElement.textContent = 'Active';
    serviceBox.classList.add('active');
    
    // Simulate service execution
    setTimeout(() => {
        statusElement.className = 'service-status inactive';
        statusElement.textContent = 'Inactive';
        serviceBox.classList.remove('active');
    }, 3000);
    
    // Log activity
    console.log(`Azure service triggered: ${action}`);
}

// Cost Calculator
function setupCostCalculator() {
    const calculateBtn = document.getElementById('calculate-cost');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateAzureCosts);
    }
}

function calculateAzureCosts() {
    const dataVolume = parseFloat(document.getElementById('data-volume-input')?.value || 1000);
    const processingHours = parseFloat(document.getElementById('processing-hours')?.value || 100);
    const userCount = parseFloat(document.getElementById('user-count')?.value || 10);
    
    // Azure pricing (simplified)
    const costs = {
        storage: dataVolume * 0.018, // $0.018 per GB
        synapse: processingHours * 1.20, // $1.20 per DWU hour
        ml: processingHours * 0.50, // $0.50 per compute hour
        powerbi: userCount * 10 // $10 per user per month
    };
    
    const total = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    
    // Update display
    document.getElementById('storage-cost').textContent = `$${costs.storage.toFixed(2)}`;
    document.getElementById('synapse-cost').textContent = `$${costs.synapse.toFixed(2)}`;
    document.getElementById('ml-cost').textContent = `$${costs.ml.toFixed(2)}`;
    document.getElementById('powerbi-cost').textContent = `$${costs.powerbi.toFixed(2)}`;
    document.getElementById('total-cost').textContent = `$${total.toFixed(2)}`;
    
    // Animate the results
    const costValues = document.querySelectorAll('.cost-value');
    costValues.forEach(element => {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#059669';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initialize Charts
function initializeCharts() {
    initializeStreamingChart();
}

function initializeStreamingChart() {
    const ctx = document.getElementById('streaming-chart');
    if (!ctx) return;
    
    streamingChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Events/Second',
                data: [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second',
                        displayFormats: {
                            second: 'HH:mm:ss'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Events/Second'
                    }
                }
            },
            animation: {
                duration: 0
            },
            interaction: {
                intersect: false
            }
        }
    });
}

// Utility Functions
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.round(current);
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            element.textContent = end;
        }
    }, 16);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add CSS for toast notifications
const toastStyles = `
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.toast.show {
    transform: translateX(0);
}

.toast-info {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.toast-success {
    background: linear-gradient(135deg, #10b981, #059669);
}

.toast-warning {
    background: linear-gradient(135deg, #f59e0b, #d97706);
}

.toast-error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}
`;

// Add toast styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause streaming when page is hidden
        if (isStreaming) {
            isStreaming = false;
        }
    } else {
        // Resume streaming when page becomes visible (if it was streaming before)
        if (streamingInterval && !isStreaming) {
            isStreaming = true;
        }
    }
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
        }
    });
});

performanceObserver.observe({ entryTypes: ['navigation'] });

// Console welcome message
console.log('%c🚀 Phase 2: Modern Data Engineering Dashboard Loaded!', 
    'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cExplore cloud-native architecture, MLOps pipelines, and real-time streaming!', 
    'color: #6b7280; font-size: 12px;');

// Error handling
window.addEventListener('error', function(e) {
    console.error('Phase 2 JavaScript error:', e.error);
    showToast('An error occurred. Check the console for details.', 'error');
});

// Initialize tooltips and help text
function initializeHelpers() {
    const helpElements = document.querySelectorAll('[data-help]');
    
    helpElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const helpText = this.dataset.help;
            showTooltip(this, helpText);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.classList.add('show'), 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => document.body.removeChild(tooltip), 200);
    }
}

// Initialize helpers when DOM is ready
document.addEventListener('DOMContentLoaded', initializeHelpers);