// Sample data for demonstrations
const sampleCustomers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@email.com', age: 28, city: 'New York', purchase_amount: 1250.00 },
    { id: 2, name: 'Bob Smith', email: 'bob@email.com', age: 35, city: 'Los Angeles', purchase_amount: 890.50 },
    { id: 3, name: 'Carol Davis', email: 'carol@email.com', age: 42, city: 'Chicago', purchase_amount: 2100.75 },
    { id: 4, name: 'David Wilson', email: 'david@email.com', age: 31, city: 'Houston', purchase_amount: 675.25 },
    { id: 5, name: 'Emma Brown', email: 'emma@email.com', age: 29, city: 'Phoenix', purchase_amount: 1450.00 }
];

let mainChart = null;
let customerData = [...sampleCustomers];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    setupTabs();
    populateCustomerTable();
    setupInteractiveElements();
    setupVisualization();
    displaySemiStructuredData();
    setupSQLPlayground();
    setupTextAnalysis();
    setupSchemaInteraction();
}

// Navigation Setup
function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Start Journey Button
    const startButton = document.getElementById('start-journey');
    if (startButton) {
        startButton.addEventListener('click', function() {
            document.getElementById('overview').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Tab System Setup
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetType = this.getAttribute('data-type');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetType);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Customer Table Population
function populateCustomerTable() {
    const tableBody = document.getElementById('customer-data');
    if (!tableBody) return;

    function renderCustomerData() {
        tableBody.innerHTML = '';
        customerData.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.age}</td>
                <td>${customer.city}</td>
                <td>$${customer.purchase_amount.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderCustomerData();

    // Add Customer Button
    const addButton = document.getElementById('add-customer');
    if (addButton) {
        addButton.addEventListener('click', function() {
            const newCustomer = generateRandomCustomer();
            customerData.push(newCustomer);
            renderCustomerData();
            updateVisualizationData();
        });
    }
}

function generateRandomCustomer() {
    const names = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Sarah Williams', 'Robert Davis', 'Emily Wilson', 'James Brown', 'Lisa Garcia'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
    
    const name = names[Math.floor(Math.random() * names.length)];
    const id = Math.max(...customerData.map(c => c.id)) + 1;
    
    return {
        id: id,
        name: name,
        email: name.toLowerCase().replace(' ', '.') + '@email.com',
        age: Math.floor(Math.random() * 40) + 25,
        city: cities[Math.floor(Math.random() * cities.length)],
        purchase_amount: Math.round((Math.random() * 2000 + 500) * 100) / 100
    };
}

// Semi-structured Data Display
function displaySemiStructuredData() {
    const jsonData = {
        "customer": {
            "id": 12345,
            "personal_info": {
                "name": "Alice Johnson",
                "email": "alice.johnson@email.com",
                "age": 28
            },
            "address": {
                "street": "123 Main St",
                "city": "New York",
                "state": "NY",
                "zip": "10001"
            },
            "orders": [
                {
                    "order_id": "ORD-001",
                    "date": "2024-01-15",
                    "total": 1250.00,
                    "items": ["Laptop", "Mouse", "Keyboard"]
                },
                {
                    "order_id": "ORD-002",
                    "date": "2024-02-20",
                    "total": 75.50,
                    "items": ["USB Cable", "Power Adapter"]
                }
            ]
        }
    };

    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<customer id="12345">
    <personal_info>
        <name>Alice Johnson</name>
        <email>alice.johnson@email.com</email>
        <age>28</age>
    </personal_info>
    <address>
        <street>123 Main St</street>
        <city>New York</city>
        <state>NY</state>
        <zip>10001</zip>
    </address>
    <orders>
        <order id="ORD-001" date="2024-01-15" total="1250.00">
            <items>
                <item>Laptop</item>
                <item>Mouse</item>
                <item>Keyboard</item>
            </items>
        </order>
    </orders>
</customer>`;

    const jsonElement = document.getElementById('json-data');
    const xmlElement = document.getElementById('xml-data');

    if (jsonElement) {
        jsonElement.textContent = JSON.stringify(jsonData, null, 2);
    }

    if (xmlElement) {
        xmlElement.textContent = xmlData;
    }
}

// Interactive Elements Setup
function setupInteractiveElements() {
    // Add interactive hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('interactive-element');
    });
}

// Text Analysis Setup
function setupTextAnalysis() {
    const analyzeButton = document.getElementById('analyze-text');
    const textInput = document.getElementById('text-input');
    const resultsDiv = document.getElementById('text-results');

    if (analyzeButton && textInput && resultsDiv) {
        analyzeButton.addEventListener('click', function() {
            const text = textInput.value.trim();
            if (!text) {
                resultsDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
                return;
            }

            // Simple text analysis
            const words = text.split(/\s+/).filter(word => word.length > 0);
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            const avgWordsPerSentence = words.length / sentences.length;
            
            // Sentiment analysis (simplified)
            const positiveWords = ['positive', 'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'outstanding', 'exceeded', 'satisfied'];
            const negativeWords = ['negative', 'bad', 'terrible', 'awful', 'horrible', 'disappointing', 'failed', 'poor'];
            
            let sentiment = 'Neutral';
            const textLower = text.toLowerCase();
            const positiveCount = positiveWords.filter(word => textLower.includes(word)).length;
            const negativeCount = negativeWords.filter(word => textLower.includes(word)).length;
            
            if (positiveCount > negativeCount) sentiment = 'Positive';
            else if (negativeCount > positiveCount) sentiment = 'Negative';

            resultsDiv.innerHTML = `
                <h4>Text Analysis Results:</h4>
                <p><strong>Word Count:</strong> ${words.length}</p>
                <p><strong>Sentence Count:</strong> ${sentences.length}</p>
                <p><strong>Average Words per Sentence:</strong> ${avgWordsPerSentence.toFixed(1)}</p>
                <p><strong>Estimated Sentiment:</strong> ${sentiment}</p>
                <p><strong>Character Count:</strong> ${text.length}</p>
            `;
        });
    }
}

// SQL Playground Setup
function setupSQLPlayground() {
    const querySelect = document.getElementById('predefined-queries');
    const queryTextarea = document.getElementById('sql-query');
    const runButton = document.getElementById('run-query');
    const resultsDiv = document.getElementById('query-results');

    const predefinedQueries = {
        'basic-select': 'SELECT name, age, city FROM customers WHERE age > 30;',
        'join-query': `SELECT c.name, o.order_date, o.total
FROM customers c
JOIN orders o ON c.id = o.customer_id
ORDER BY o.total DESC;`,
        'aggregation': `SELECT city, COUNT(*) as customer_count, AVG(purchase_amount) as avg_purchase
FROM customers
GROUP BY city
ORDER BY avg_purchase DESC;`,
        'filtering': `SELECT * FROM customers 
WHERE purchase_amount > 1000 
   AND age BETWEEN 25 AND 40
ORDER BY purchase_amount DESC, age ASC;`
    };

    if (querySelect && queryTextarea) {
        querySelect.addEventListener('change', function() {
            const selectedQuery = this.value;
            if (selectedQuery && predefinedQueries[selectedQuery]) {
                queryTextarea.value = predefinedQueries[selectedQuery];
            }
        });
    }

    if (runButton && resultsDiv) {
        runButton.addEventListener('click', function() {
            const query = queryTextarea.value.trim();
            if (!query) {
                resultsDiv.innerHTML = '<p>Please enter a SQL query.</p>';
                return;
            }

            // Simulate SQL execution
            resultsDiv.innerHTML = '<div class="loading"></div> Executing query...';
            
            setTimeout(() => {
                // Simple query simulation based on keywords
                let simulatedResults = '';
                
                if (query.toLowerCase().includes('select') && query.toLowerCase().includes('customers')) {
                    if (query.toLowerCase().includes('group by city')) {
                        simulatedResults = `
                            <h4>Query Results:</h4>
                            <table>
                                <tr><th>City</th><th>Customer Count</th><th>Avg Purchase</th></tr>
                                <tr><td>New York</td><td>2</td><td>$1,350.00</td></tr>
                                <tr><td>Chicago</td><td>1</td><td>$2,100.75</td></tr>
                                <tr><td>Los Angeles</td><td>1</td><td>$890.50</td></tr>
                                <tr><td>Houston</td><td>1</td><td>$675.25</td></tr>
                            </table>
                        `;
                    } else {
                        simulatedResults = `
                            <h4>Query Results:</h4>
                            <table>
                                <tr><th>Name</th><th>Age</th><th>City</th><th>Purchase Amount</th></tr>
                                ${customerData.slice(0, 3).map(c => 
                                    `<tr><td>${c.name}</td><td>${c.age}</td><td>${c.city}</td><td>$${c.purchase_amount}</td></tr>`
                                ).join('')}
                            </table>
                            <p><em>Showing first 3 results...</em></p>
                        `;
                    }
                } else {
                    simulatedResults = '<p>Query executed successfully. This is a simulation - in a real environment, you would see actual database results.</p>';
                }
                
                resultsDiv.innerHTML = simulatedResults;
            }, 1000);
        });
    }

    // Python Analysis Simulation
    const runPythonButton = document.getElementById('run-python');
    const pythonResults = document.getElementById('python-results');

    if (runPythonButton && pythonResults) {
        runPythonButton.addEventListener('click', function() {
            pythonResults.innerHTML = '<div class="loading"></div> Running Python analysis...';
            
            setTimeout(() => {
                pythonResults.innerHTML = `
                    <h4>Python Analysis Output:</h4>
                    <pre>
Customer Data Summary:
                    age  purchase_amount
count      5.000000         5.000000
mean      33.000000      1273.300000
std        5.567764       581.234567
min       28.000000       675.250000
25%       29.000000       890.500000
50%       31.000000      1250.000000
75%       35.000000      1450.000000
max       42.000000      2100.750000

City Analysis:
                 mean        sum  count
city                              
Chicago      2100.75    2100.75      1
Houston       675.25     675.25      1
Los Angeles   890.50     890.50      1
New York     1350.00    2700.00      2
Phoenix      1450.00    1450.00      1
</pre>
                `;
            }, 1500);
        });
    }
}

// Database Schema Interaction
function setupSchemaInteraction() {
    const schemaDiagram = document.getElementById('schema-diagram');
    const schemaButtons = document.querySelectorAll('.schema-controls button');

    if (!schemaDiagram) return;

    // Create SVG for schema diagram
    const svg = d3.select('#schema-diagram')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 800 400');

    const tables = {
        customers: { x: 50, y: 50, width: 200, height: 150, 
                    fields: ['id (PK)', 'name', 'email', 'age', 'city'] },
        orders: { x: 300, y: 50, width: 200, height: 150,
                 fields: ['id (PK)', 'customer_id (FK)', 'order_date', 'total'] },
        products: { x: 550, y: 50, width: 200, height: 150,
                   fields: ['id (PK)', 'name', 'price', 'category'] }
    };

    function drawTable(tableName, tableData, highlight = false) {
        const group = svg.append('g').attr('class', `table-${tableName}`);
        
        // Table rectangle
        group.append('rect')
            .attr('x', tableData.x)
            .attr('y', tableData.y)
            .attr('width', tableData.width)
            .attr('height', tableData.height)
            .attr('fill', highlight ? '#667eea' : 'white')
            .attr('stroke', '#333')
            .attr('stroke-width', 2);

        // Table name
        group.append('text')
            .attr('x', tableData.x + tableData.width/2)
            .attr('y', tableData.y + 25)
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold')
            .attr('font-size', '16px')
            .attr('fill', highlight ? 'white' : '#333')
            .text(tableName.toUpperCase());

        // Fields
        tableData.fields.forEach((field, i) => {
            group.append('text')
                .attr('x', tableData.x + 10)
                .attr('y', tableData.y + 50 + (i * 20))
                .attr('font-size', '12px')
                .attr('fill', highlight ? 'white' : '#666')
                .text(field);
        });
    }

    function clearDiagram() {
        svg.selectAll('*').remove();
    }

    function showRelationships() {
        // Draw all tables first
        Object.entries(tables).forEach(([name, data]) => {
            drawTable(name, data);
        });

        // Draw relationships
        const customerToOrder = svg.append('line')
            .attr('x1', tables.customers.x + tables.customers.width)
            .attr('y1', tables.customers.y + tables.customers.height/2)
            .attr('x2', tables.orders.x)
            .attr('y2', tables.orders.y + tables.orders.height/2)
            .attr('stroke', '#ff6b6b')
            .attr('stroke-width', 2);

        // Add relationship label
        svg.append('text')
            .attr('x', (tables.customers.x + tables.customers.width + tables.orders.x) / 2)
            .attr('y', tables.customers.y + tables.customers.height/2 - 10)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', '#ff6b6b')
            .text('1:N');
    }

    schemaButtons.forEach(button => {
        button.addEventListener('click', function() {
            clearDiagram();
            const action = this.id;

            switch(action) {
                case 'show-customers':
                    drawTable('customers', tables.customers, true);
                    break;
                case 'show-orders':
                    drawTable('orders', tables.orders, true);
                    break;
                case 'show-products':
                    drawTable('products', tables.products, true);
                    break;
                case 'show-relationships':
                    showRelationships();
                    break;
            }
        });
    });

    // Show all tables by default
    showRelationships();
}

// Visualization Setup
function setupVisualization() {
    const ctx = document.getElementById('main-chart');
    if (!ctx) return;

    // Initialize chart
    mainChart = new Chart(ctx, {
        type: 'bar',
        data: getChartData('sales'),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales by Region'
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart controls
    const refreshButton = document.getElementById('refresh-data');
    const chartTypeSelect = document.getElementById('chart-type');
    const dataMetricSelect = document.getElementById('data-metric');

    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            updateChart();
            updateKPIs();
        });
    }

    if (chartTypeSelect) {
        chartTypeSelect.addEventListener('change', function() {
            mainChart.config.type = this.value;
            mainChart.update();
        });
    }

    if (dataMetricSelect) {
        dataMetricSelect.addEventListener('change', function() {
            const newData = getChartData(this.value);
            mainChart.data = newData;
            mainChart.update();
        });
    }

    // Initial KPI update
    updateKPIs();
}

function getChartData(metric) {
    const datasets = {
        sales: {
            labels: ['North', 'South', 'East', 'West', 'Central'],
            datasets: [{
                label: 'Sales ($000)',
                data: [120, 190, 300, 500, 200],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(255, 107, 107, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 193, 7, 1)'
                ],
                borderWidth: 2
            }]
        },
        customers: {
            labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
            datasets: [{
                label: 'Customer Count',
                data: [150, 300, 250, 180, 120],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ]
            }]
        },
        products: {
            labels: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
            datasets: [{
                label: 'Revenue ($000)',
                data: [450, 200, 150, 300, 180],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ]
            }]
        }
    };

    return datasets[metric] || datasets.sales;
}

function updateChart() {
    if (!mainChart) return;

    // Simulate data refresh with random variations
    const currentData = mainChart.data.datasets[0].data;
    const newData = currentData.map(value => {
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        return Math.round(value * (1 + variation));
    });

    mainChart.data.datasets[0].data = newData;
    mainChart.update('active');
}

function updateVisualizationData() {
    // Update chart with new customer data
    if (mainChart) {
        updateChart();
        updateKPIs();
    }
}

function updateKPIs() {
    const totalRevenue = customerData.reduce((sum, customer) => sum + customer.purchase_amount, 0);
    const totalCustomers = customerData.length;
    const avgOrderValue = totalRevenue / totalCustomers;

    const revenueElement = document.getElementById('kpi-revenue');
    const customersElement = document.getElementById('kpi-customers');
    const aovElement = document.getElementById('kpi-aov');

    if (revenueElement) {
        revenueElement.textContent = `$${totalRevenue.toLocaleString()}`;
    }

    if (customersElement) {
        customersElement.textContent = totalCustomers.toLocaleString();
    }

    if (aovElement) {
        aovElement.textContent = `$${avgOrderValue.toFixed(2)}`;
    }
}

// Utility Functions
function animateValue(element, start, end, duration) {
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;

    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        element.textContent = value;
        
        if (value === end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

// Scroll animations
function handleScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(handleScrollAnimations, 100);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Console welcome message
console.log('%c🚀 Welcome to the Data Engineering Journey!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cThis interactive demo showcases traditional data engineering concepts.', 'color: #666; font-size: 12px;');
console.log('%cOpen the browser developer tools to explore the code and learn how it works!', 'color: #666; font-size: 12px;');