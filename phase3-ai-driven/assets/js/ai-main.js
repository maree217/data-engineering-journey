// Phase 3: AI-Driven Data Systems - Interactive JavaScript

// Global Variables
let searchResults = [];
let knowledgeGraph = null;
let vectorSpace = null;
let agentWorkflow = null;
let memorySystem = null;
let memoryCharts = {};

// Sample data for AI demonstrations
const aiDataSamples = {
    documents: [
        {
            id: 1,
            title: "Machine Learning Fundamentals",
            content: "Machine learning is a powerful subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.",
            embedding: [0.2, -0.8, 0.5, 0.1, -0.3, 0.7, 0.9, -0.1],
            category: "AI/ML",
            similarity: 0
        },
        {
            id: 2,
            title: "Deep Learning and Neural Networks",
            content: "Deep learning utilizes artificial neural networks with multiple layers to model and understand complex patterns in data, revolutionizing fields like computer vision and natural language processing.",
            embedding: [0.3, -0.6, 0.4, 0.2, -0.4, 0.8, 0.7, -0.2],
            category: "AI/ML",
            similarity: 0
        },
        {
            id: 3,
            title: "Data Processing Pipelines",
            content: "Efficient data processing pipelines are essential for handling large-scale data transformation, cleaning, and preparation for analysis and machine learning workflows.",
            embedding: [0.1, -0.4, 0.6, 0.3, -0.2, 0.5, 0.8, 0.1],
            category: "Data Engineering",
            similarity: 0
        },
        {
            id: 4,
            title: "Cloud Computing Architecture",
            content: "Modern cloud computing provides scalable infrastructure for deploying AI applications, offering services like auto-scaling, load balancing, and distributed computing.",
            embedding: [-0.1, -0.2, 0.3, 0.4, 0.1, 0.6, 0.4, 0.3],
            category: "Cloud",
            similarity: 0
        },
        {
            id: 5,
            title: "Advanced Analytics and Insights",
            content: "Advanced analytics combines statistical analysis, machine learning, and data mining techniques to discover hidden patterns and generate actionable business insights.",
            embedding: [0.4, -0.5, 0.2, 0.1, -0.1, 0.9, 0.6, -0.3],
            category: "Analytics",
            similarity: 0
        }
    ],
    
    knowledgeNodes: [
        { id: 1, label: 'Alice Johnson', type: 'customer', group: 1 },
        { id: 2, label: 'Bob Smith', type: 'customer', group: 1 },
        { id: 3, label: 'Laptop Pro', type: 'product', group: 2 },
        { id: 4, label: 'Smartphone X', type: 'product', group: 2 },
        { id: 5, label: 'Electronics', type: 'category', group: 3 }
    ],
    
    knowledgeEdges: [
        { from: 1, to: 3, label: 'PURCHASED', color: '#7b61ff' },
        { from: 2, to: 4, label: 'PURCHASED', color: '#7b61ff' },
        { from: 3, to: 5, label: 'BELONGS_TO', color: '#10b981' },
        { from: 4, to: 5, label: 'BELONGS_TO', color: '#10b981' }
    ],
    
    memoryLayers: {
        shortTerm: {
            context: "User is asking about machine learning courses",
            sessionId: "sess_123",
            timestamp: new Date(),
            relevantTerms: ["machine learning", "courses", "deep learning"]
        },
        mediumTerm: {
            userProfile: {
                interests: ["AI", "data science", "programming"],
                skillLevel: "intermediate",
                recentTopics: ["neural networks", "python", "algorithms"]
            }
        },
        longTerm: {
            domainKnowledge: {
                "machine learning": {
                    concepts: ["supervised", "unsupervised", "reinforcement"],
                    applications: ["computer vision", "NLP", "recommendation systems"],
                    prerequisites: ["linear algebra", "statistics", "programming"]
                }
            }
        }
    }
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAIInterface();
});

function initializeAIInterface() {
    setupVectorSearch();
    setupKnowledgeGraph();
    setupAIAgents();
    setupMemorySystem();
    setupVectorVisualization();
    initializeMemoryCharts();
    setupCypherPlayground();
}

// Vector Search Implementation
function setupVectorSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('semantic-search');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSemanticSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSemanticSearch();
            }
        });
    }
    
    // Vector space controls
    const rotateBtn = document.getElementById('rotate-vectors');
    const clusterBtn = document.getElementById('cluster-vectors');
    const resetBtn = document.getElementById('reset-vectors');
    
    if (rotateBtn) rotateBtn.addEventListener('click', rotateVectorSpace);
    if (clusterBtn) clusterBtn.addEventListener('click', clusterVectors);
    if (resetBtn) resetBtn.addEventListener('click', resetVectorSpace);
}

function performSemanticSearch() {
    const query = document.getElementById('semantic-search').value.trim();
    const searchType = document.getElementById('search-type').value;
    const showSimilarity = document.getElementById('similarity-threshold').checked;
    
    if (!query) {
        showToast('Please enter a search query', 'warning');
        return;
    }
    
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '<div class="loading"></div> Performing semantic search...';
    
    // Simulate search delay
    setTimeout(() => {
        const results = simulateVectorSearch(query, searchType);
        displaySearchResults(results, showSimilarity);
        updateVectorVisualization(query);
    }, 1000);
}

function simulateVectorSearch(query, searchType) {
    const queryEmbedding = generateEmbedding(query);
    let results;
    
    if (searchType === 'semantic') {
        // Calculate semantic similarity
        results = aiDataSamples.documents.map(doc => {
            const similarity = calculateCosineSimilarity(queryEmbedding, doc.embedding);
            return { ...doc, similarity };
        }).sort((a, b) => b.similarity - a.similarity);
    } else {
        // Traditional keyword search
        const queryLower = query.toLowerCase();
        results = aiDataSamples.documents.filter(doc => 
            doc.title.toLowerCase().includes(queryLower) || 
            doc.content.toLowerCase().includes(queryLower)
        ).map(doc => ({ ...doc, similarity: 0.8 }));
    }
    
    return results.slice(0, 5);
}

function generateEmbedding(text) {
    // Simplified embedding generation for demo
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(8).fill(0);
    
    words.forEach((word, index) => {
        const hash = simpleHash(word);
        embedding[index % 8] += (hash % 200 - 100) / 100;
    });
    
    return embedding.map(val => Math.max(-1, Math.min(1, val)));
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function calculateCosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, a, i) => sum + a * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, a) => sum + a * a, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, a) => sum + a * a, 0));
    
    return dotProduct / (magnitude1 * magnitude2);
}

function displaySearchResults(results, showSimilarity) {
    const container = document.getElementById('search-results');
    
    if (results.length === 0) {
        container.innerHTML = '<p>No results found. Try different keywords.</p>';
        return;
    }
    
    let html = '<div class="search-results-list">';
    
    results.forEach((result, index) => {
        const similarityDisplay = showSimilarity ? 
            `<span class="similarity-score">${(result.similarity * 100).toFixed(1)}%</span>` : '';
        
        html += `
            <div class="result-item" style="animation-delay: ${index * 0.1}s">
                <h4>${result.title} ${similarityDisplay}</h4>
                <p>${result.content}</p>
                <div class="result-meta">
                    <span class="category">${result.category}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Add animation class
    container.querySelectorAll('.result-item').forEach(item => {
        item.style.animation = 'slideInUp 0.6s ease-out forwards';
    });
}

// Vector Space Visualization
function setupVectorVisualization() {
    const vectorSpace = document.getElementById('vector-space');
    if (!vectorSpace) return;
    
    initializeVectorPoints();
}

function initializeVectorPoints() {
    const vectorSpace = document.getElementById('vector-space');
    vectorSpace.innerHTML = '';
    
    aiDataSamples.documents.forEach((doc, index) => {
        const point = document.createElement('div');
        point.className = 'vector-point';
        point.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            background: linear-gradient(45deg, #7b61ff, #a855f7);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s;
            left: ${20 + (doc.embedding[0] + 1) * 160}px;
            top: ${20 + (doc.embedding[1] + 1) * 160}px;
            box-shadow: 0 2px 8px rgba(123, 97, 255, 0.3);
        `;
        
        point.addEventListener('mouseenter', () => showVectorTooltip(point, doc));
        point.addEventListener('mouseleave', hideVectorTooltip);
        
        vectorSpace.appendChild(point);
    });
}

function updateVectorVisualization(query) {
    const vectorSpace = document.getElementById('vector-space');
    const queryEmbedding = generateEmbedding(query);
    
    // Add query point
    const queryPoint = document.createElement('div');
    queryPoint.className = 'query-point';
    queryPoint.style.cssText = `
        position: absolute;
        width: 16px;
        height: 16px;
        background: linear-gradient(45deg, #ef4444, #dc2626);
        border-radius: 50%;
        left: ${20 + (queryEmbedding[0] + 1) * 160}px;
        top: ${20 + (queryEmbedding[1] + 1) * 160}px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        z-index: 10;
        animation: pulse 2s infinite;
    `;
    
    vectorSpace.appendChild(queryPoint);
    
    setTimeout(() => {
        if (queryPoint.parentNode) {
            queryPoint.parentNode.removeChild(queryPoint);
        }
    }, 5000);
}

function rotateVectorSpace() {
    const points = document.querySelectorAll('.vector-point');
    points.forEach(point => {
        const currentTransform = point.style.transform || '';
        const currentRotation = currentTransform.includes('rotate') ? 
            parseInt(currentTransform.match(/rotate\((\d+)deg\)/)[1]) : 0;
        point.style.transform = `rotate(${currentRotation + 90}deg)`;
    });
    showToast('Vector space rotated', 'info');
}

function clusterVectors() {
    const points = document.querySelectorAll('.vector-point');
    points.forEach((point, index) => {
        const cluster = index % 3;
        const clusterX = 50 + cluster * 120;
        const clusterY = 150 + (index % 2) * 80;
        
        point.style.left = clusterX + 'px';
        point.style.top = clusterY + 'px';
        point.style.background = cluster === 0 ? 
            'linear-gradient(45deg, #7b61ff, #a855f7)' :
            cluster === 1 ?
            'linear-gradient(45deg, #10b981, #059669)' :
            'linear-gradient(45deg, #f59e0b, #d97706)';
    });
    showToast('Vectors clustered by similarity', 'success');
}

function resetVectorSpace() {
    initializeVectorPoints();
    showToast('Vector space reset', 'info');
}

function showVectorTooltip(element, doc) {
    const tooltip = document.createElement('div');
    tooltip.className = 'vector-tooltip';
    tooltip.innerHTML = `
        <strong>${doc.title}</strong><br>
        Category: ${doc.category}<br>
        Embedding: [${doc.embedding.map(v => v.toFixed(2)).join(', ')}]
    `;
    tooltip.style.cssText = `
        position: fixed;
        background: #1e293b;
        color: white;
        padding: 0.75rem;
        border-radius: 8px;
        font-size: 0.85rem;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        max-width: 250px;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.right + 10 + 'px';
    tooltip.style.top = rect.top - 10 + 'px';
}

function hideVectorTooltip() {
    const tooltip = document.querySelector('.vector-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Knowledge Graph Implementation
function setupKnowledgeGraph() {
    initializeKnowledgeGraph();
    setupGraphControls();
}

function initializeKnowledgeGraph() {
    const container = document.getElementById('knowledge-graph');
    if (!container) return;
    
    const nodes = new vis.DataSet(aiDataSamples.knowledgeNodes);
    const edges = new vis.DataSet(aiDataSamples.knowledgeEdges);
    
    const data = { nodes, edges };
    const options = {
        nodes: {
            shape: 'dot',
            size: 30,
            font: { color: '#343434' },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            arrows: 'to',
            font: { align: 'middle' },
            smooth: { type: 'continuous' }
        },
        physics: {
            stabilization: { iterations: 100 }
        },
        groups: {
            1: { color: { background: '#7b61ff', border: '#5b46cc' } },
            2: { color: { background: '#10b981', border: '#059669' } },
            3: { color: { background: '#f59e0b', border: '#d97706' } }
        }
    };
    
    knowledgeGraph = new vis.Network(container, data, options);
    
    knowledgeGraph.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const node = nodes.get(nodeId);
            showNodeDetails(node);
        }
    });
    
    updateGraphStats();
}

function setupGraphControls() {
    const addCustomerBtn = document.getElementById('add-customer');
    const addProductBtn = document.getElementById('add-product');
    const addRelationshipBtn = document.getElementById('add-relationship');
    const findPatternsBtn = document.getElementById('find-patterns');
    const recommendBtn = document.getElementById('recommend');
    const resetGraphBtn = document.getElementById('reset-graph');
    
    if (addCustomerBtn) addCustomerBtn.addEventListener('click', () => addGraphNode('customer'));
    if (addProductBtn) addProductBtn.addEventListener('click', () => addGraphNode('product'));
    if (addRelationshipBtn) addRelationshipBtn.addEventListener('click', addGraphRelationship);
    if (findPatternsBtn) findPatternsBtn.addEventListener('click', findGraphPatterns);
    if (recommendBtn) recommendBtn.addEventListener('click', generateRecommendations);
    if (resetGraphBtn) resetGraphBtn.addEventListener('click', resetKnowledgeGraph);
}

function addGraphNode(type) {
    if (!knowledgeGraph) return;
    
    const names = type === 'customer' ? 
        ['Emma Wilson', 'James Garcia', 'Sophia Martinez', 'Michael Davis'] :
        ['Tablet Pro', 'Wireless Headphones', 'Smart Watch', 'Gaming Mouse'];
    
    const name = names[Math.floor(Math.random() * names.length)];
    const newId = Math.max(...aiDataSamples.knowledgeNodes.map(n => n.id)) + 1;
    const group = type === 'customer' ? 1 : 2;
    
    const newNode = { id: newId, label: name, type, group };
    aiDataSamples.knowledgeNodes.push(newNode);
    
    knowledgeGraph.setData({
        nodes: new vis.DataSet(aiDataSamples.knowledgeNodes),
        edges: new vis.DataSet(aiDataSamples.knowledgeEdges)
    });
    
    updateGraphStats();
    showToast(`Added ${type}: ${name}`, 'success');
}

function addGraphRelationship() {
    const customers = aiDataSamples.knowledgeNodes.filter(n => n.type === 'customer');
    const products = aiDataSamples.knowledgeNodes.filter(n => n.type === 'product');
    
    if (customers.length === 0 || products.length === 0) {
        showToast('Need at least one customer and one product', 'warning');
        return;
    }
    
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    const newEdge = {
        from: customer.id,
        to: product.id,
        label: 'PURCHASED',
        color: '#7b61ff'
    };
    
    aiDataSamples.knowledgeEdges.push(newEdge);
    
    knowledgeGraph.setData({
        nodes: new vis.DataSet(aiDataSamples.knowledgeNodes),
        edges: new vis.DataSet(aiDataSamples.knowledgeEdges)
    });
    
    updateGraphStats();
    showToast(`Connected ${customer.label} → ${product.label}`, 'success');
}

function findGraphPatterns() {
    // Simulate pattern finding
    const patterns = [
        "Found 3 customers who purchased Electronics",
        "Detected purchasing cluster: High-value tech products",
        "Pattern: Customers buying Laptops also buy Accessories",
        "Recommendation engine: 85% accuracy improvement"
    ];
    
    patterns.forEach((pattern, index) => {
        setTimeout(() => {
            showToast(pattern, 'info');
        }, index * 1000);
    });
    
    // Highlight pattern nodes
    const nodeUpdate = aiDataSamples.knowledgeNodes.map(node => ({
        ...node,
        color: node.type === 'customer' ? 
            { background: '#fbbf24', border: '#f59e0b' } : 
            { background: '#a78bfa', border: '#7c3aed' }
    }));
    
    setTimeout(() => {
        knowledgeGraph.setData({
            nodes: new vis.DataSet(nodeUpdate),
            edges: new vis.DataSet(aiDataSamples.knowledgeEdges)
        });
    }, 2000);
    
    setTimeout(() => {
        initializeKnowledgeGraph();
    }, 5000);
}

function generateRecommendations() {
    const recommendations = [
        "🎯 Alice Johnson → Recommend: Wireless Headphones (78% match)",
        "💡 Bob Smith → Recommend: Tablet Pro (82% match)",
        "🔍 Cross-sell opportunity: Gaming Mouse + Laptop Pro",
        "📈 Revenue impact: +23% from AI recommendations"
    ];
    
    recommendations.forEach((rec, index) => {
        setTimeout(() => {
            showToast(rec, 'success');
        }, index * 800);
    });
}

function resetKnowledgeGraph() {
    aiDataSamples.knowledgeNodes = aiDataSamples.knowledgeNodes.slice(0, 5);
    aiDataSamples.knowledgeEdges = aiDataSamples.knowledgeEdges.slice(0, 4);
    initializeKnowledgeGraph();
    showToast('Knowledge graph reset', 'info');
}

function updateGraphStats() {
    const nodeCountEl = document.getElementById('node-count');
    const edgeCountEl = document.getElementById('edge-count');
    const communityCountEl = document.getElementById('community-count');
    
    if (nodeCountEl) nodeCountEl.textContent = aiDataSamples.knowledgeNodes.length;
    if (edgeCountEl) edgeCountEl.textContent = aiDataSamples.knowledgeEdges.length;
    if (communityCountEl) communityCountEl.textContent = Math.ceil(aiDataSamples.knowledgeNodes.length / 3);
}

function showNodeDetails(node) {
    showToast(`Selected: ${node.label} (${node.type})`, 'info');
}

// Cypher Query Playground
function setupCypherPlayground() {
    const exampleQueries = document.querySelectorAll('.example-query');
    const runCypherBtn = document.getElementById('run-cypher');
    const cypherTextarea = document.getElementById('cypher-query');
    
    exampleQueries.forEach(button => {
        button.addEventListener('click', function() {
            const query = this.dataset.query;
            cypherTextarea.value = query;
        });
    });
    
    if (runCypherBtn) {
        runCypherBtn.addEventListener('click', runCypherQuery);
    }
}

function runCypherQuery() {
    const query = document.getElementById('cypher-query').value.trim();
    const resultsDiv = document.getElementById('cypher-results');
    
    if (!query) {
        resultsDiv.innerHTML = '<p style="color: #ef4444;">Please enter a Cypher query</p>';
        return;
    }
    
    resultsDiv.innerHTML = '<div class="loading"></div> Executing query...';
    
    setTimeout(() => {
        const mockResults = generateMockCypherResults(query);
        resultsDiv.innerHTML = mockResults;
    }, 1000);
}

function generateMockCypherResults(query) {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('match') && queryLower.includes('customer')) {
        return `
            <div class="query-success">
                <h5>Query Results (4 rows)</h5>
                <table style="width: 100%; margin-top: 1rem; border-collapse: collapse;">
                    <tr style="background: rgba(123, 97, 255, 0.1);">
                        <th style="padding: 0.5rem; text-align: left;">Customer</th>
                        <th style="padding: 0.5rem; text-align: left;">Product</th>
                    </tr>
                    <tr><td style="padding: 0.5rem;">Alice Johnson</td><td style="padding: 0.5rem;">Laptop Pro</td></tr>
                    <tr><td style="padding: 0.5rem;">Bob Smith</td><td style="padding: 0.5rem;">Smartphone X</td></tr>
                </table>
                <p style="margin-top: 1rem; color: #10b981;">✓ Query executed successfully in 23ms</p>
            </div>
        `;
    } else if (queryLower.includes('recommendation')) {
        return `
            <div class="query-success">
                <h5>Recommendation Results</h5>
                <ul style="margin-top: 1rem; color: #cbd5e1;">
                    <li>Emma Wilson (similarity: 0.89)</li>
                    <li>James Garcia (similarity: 0.76)</li>
                    <li>Sophia Martinez (similarity: 0.68)</li>
                </ul>
                <p style="margin-top: 1rem; color: #10b981;">✓ Found 3 similar customers</p>
            </div>
        `;
    } else {
        return `
            <div class="query-success">
                <h5>Query Results</h5>
                <p style="color: #cbd5e1;">Query executed successfully. In a real system, this would return structured data based on your graph database query.</p>
                <p style="margin-top: 1rem; color: #10b981;">✓ Query completed in 18ms</p>
            </div>
        `;
    }
}

// AI Agents Implementation
function setupAIAgents() {
    const startAnalysisBtn = document.getElementById('start-analysis');
    const simulateResearchBtn = document.getElementById('simulate-research');
    const optimizePipelineBtn = document.getElementById('optimize-pipeline');
    
    if (startAnalysisBtn) startAnalysisBtn.addEventListener('click', () => startAgentWorkflow('analysis'));
    if (simulateResearchBtn) simulateResearchBtn.addEventListener('click', () => startAgentWorkflow('research'));
    if (optimizePipelineBtn) optimizePipelineBtn.addEventListener('click', () => startAgentWorkflow('optimization'));
    
    setupMultiAgentSystem();
}

function startAgentWorkflow(type) {
    const workflowSteps = document.getElementById('workflow-steps');
    const agentConsole = document.getElementById('agent-console');
    
    const workflows = {
        analysis: [
            { name: 'Data Collection', icon: '📥', duration: 2000 },
            { name: 'Pattern Detection', icon: '🔍', duration: 3000 },
            { name: 'Statistical Analysis', icon: '📊', duration: 2500 },
            { name: 'Insight Generation', icon: '💡', duration: 1500 },
            { name: 'Report Creation', icon: '📄', duration: 1000 }
        ],
        research: [
            { name: 'Query Formulation', icon: '❓', duration: 1500 },
            { name: 'Source Discovery', icon: '🔍', duration: 3000 },
            { name: 'Content Extraction', icon: '📋', duration: 2000 },
            { name: 'Information Synthesis', icon: '🧠', duration: 2500 },
            { name: 'Summary Generation', icon: '📝', duration: 1000 }
        ],
        optimization: [
            { name: 'Performance Monitoring', icon: '📈', duration: 1000 },
            { name: 'Bottleneck Detection', icon: '🚧', duration: 2000 },
            { name: 'Solution Modeling', icon: '🧮', duration: 3000 },
            { name: 'Implementation', icon: '⚙️', duration: 2500 },
            { name: 'Validation', icon: '✅', duration: 1500 }
        ]
    };
    
    const steps = workflows[type] || workflows.analysis;
    
    // Clear previous workflow
    workflowSteps.innerHTML = '';
    agentConsole.innerHTML = '<p class="console-entry">🤖 Starting AI agent workflow...</p>';
    
    // Create workflow visualization
    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'workflow-step';
        stepElement.innerHTML = `
            <div class="step-icon">${step.icon}</div>
            <div class="step-name">${step.name}</div>
        `;
        workflowSteps.appendChild(stepElement);
    });
    
    // Execute workflow steps
    executeWorkflowSteps(steps, 0);
}

function executeWorkflowSteps(steps, currentIndex) {
    if (currentIndex >= steps.length) {
        logToConsole('✅ Workflow completed successfully!', 'success');
        generateWorkflowResults();
        return;
    }
    
    const step = steps[currentIndex];
    const stepElements = document.querySelectorAll('.workflow-step');
    
    // Activate current step
    stepElements[currentIndex].classList.add('active');
    logToConsole(`⚙️ Executing: ${step.name}`, 'info');
    
    setTimeout(() => {
        // Complete current step
        stepElements[currentIndex].classList.remove('active');
        stepElements[currentIndex].classList.add('completed');
        logToConsole(`✅ Completed: ${step.name}`, 'success');
        
        // Move to next step
        setTimeout(() => {
            executeWorkflowSteps(steps, currentIndex + 1);
        }, 500);
    }, step.duration);
}

function generateWorkflowResults() {
    const results = [
        "📊 Processed 10,000 data points",
        "🔍 Identified 15 key patterns",
        "💡 Generated 8 actionable insights",
        "📈 Predicted 23% improvement potential",
        "🎯 Confidence level: 94%"
    ];
    
    results.forEach((result, index) => {
        setTimeout(() => {
            logToConsole(result, 'result');
        }, index * 500);
    });
}

function setupMultiAgentSystem() {
    const startCollabBtn = document.getElementById('start-collaboration');
    const pauseCollabBtn = document.getElementById('pause-collaboration');
    const stopCollabBtn = document.getElementById('stop-collaboration');
    
    if (startCollabBtn) startCollabBtn.addEventListener('click', startMultiAgentCollaboration);
    if (pauseCollabBtn) pauseCollabBtn.addEventListener('click', pauseMultiAgentCollaboration);
    if (stopCollabBtn) stopCollabBtn.addEventListener('click', stopMultiAgentCollaboration);
}

let collaborationInterval = null;
let collaborationStep = 0;

function startMultiAgentCollaboration() {
    if (collaborationInterval) return;
    
    const agents = ['coordinator', 'collector', 'processor', 'analyst', 'reporter'];
    const agentNodes = document.querySelectorAll('.agent-node');
    
    collaborationStep = 0;
    
    collaborationInterval = setInterval(() => {
        if (collaborationStep >= agents.length) {
            // Reset and continue
            collaborationStep = 0;
            agentNodes.forEach(node => {
                node.querySelector('.agent-status').className = 'agent-status idle';
                node.querySelector('.agent-status').textContent = 'Idle';
            });
        }
        
        const currentAgent = agents[collaborationStep];
        const currentNode = document.querySelector(`[data-agent="${currentAgent}"]`);
        
        if (currentNode) {
            const statusEl = currentNode.querySelector('.agent-status');
            statusEl.className = 'agent-status active';
            statusEl.textContent = 'Active';
            
            // Previous agent back to idle
            if (collaborationStep > 0) {
                const prevAgent = agents[collaborationStep - 1];
                const prevNode = document.querySelector(`[data-agent="${prevAgent}"]`);
                if (prevNode) {
                    const prevStatus = prevNode.querySelector('.agent-status');
                    prevStatus.className = 'agent-status idle';
                    prevStatus.textContent = 'Idle';
                }
            }
        }
        
        collaborationStep++;
    }, 2000);
}

function pauseMultiAgentCollaboration() {
    if (collaborationInterval) {
        clearInterval(collaborationInterval);
        collaborationInterval = null;
        showToast('Multi-agent collaboration paused', 'warning');
    }
}

function stopMultiAgentCollaboration() {
    if (collaborationInterval) {
        clearInterval(collaborationInterval);
        collaborationInterval = null;
    }
    
    const agentNodes = document.querySelectorAll('.agent-node');
    agentNodes.forEach(node => {
        node.querySelector('.agent-status').className = 'agent-status idle';
        node.querySelector('.agent-status').textContent = 'Idle';
    });
    
    showToast('Multi-agent collaboration stopped', 'info');
}

function logToConsole(message, type = 'info') {
    const console = document.getElementById('agent-console');
    if (!console) return;
    
    const entry = document.createElement('p');
    entry.className = `console-entry ${type}`;
    entry.textContent = message;
    
    console.appendChild(entry);
    console.scrollTop = console.scrollHeight;
    
    // Keep only last 20 entries
    while (console.children.length > 20) {
        console.removeChild(console.firstChild);
    }
}

// Memory System Implementation
function setupMemorySystem() {
    const processMemoryBtn = document.getElementById('process-memory');
    
    if (processMemoryBtn) {
        processMemoryBtn.addEventListener('click', processMemoryLayers);
    }
}

function processMemoryLayers() {
    const userInput = document.getElementById('user-input').value.trim();
    
    if (!userInput) {
        showToast('Please enter a user message', 'warning');
        return;
    }
    
    // Reset all stages
    const stages = ['short-term-stage', 'medium-term-stage', 'long-term-stage'];
    stages.forEach(stageId => {
        const stage = document.getElementById(stageId);
        stage.classList.remove('processing');
        stage.querySelector('.processing-status').textContent = 'Processing...';
        stage.querySelector('.processing-status').className = 'processing-status active';
        stage.querySelector('.stage-output').innerHTML = '';
    });
    
    // Process through memory layers sequentially
    setTimeout(() => processShortTermMemory(userInput), 500);
    setTimeout(() => processMediumTermMemory(userInput), 2000);
    setTimeout(() => processLongTermMemory(userInput), 3500);
    setTimeout(() => generateFinalResponse(userInput), 5000);
}

function processShortTermMemory(input) {
    const stage = document.getElementById('short-term-stage');
    stage.classList.add('processing');
    
    setTimeout(() => {
        const analysis = analyzeUserInput(input);
        stage.querySelector('.processing-status').textContent = 'Complete';
        stage.querySelector('.processing-status').className = 'processing-status';
        stage.querySelector('.stage-output').innerHTML = `
            <div class="memory-result">
                <p><strong>Context:</strong> ${analysis.context}</p>
                <p><strong>Intent:</strong> ${analysis.intent}</p>
                <p><strong>Key Terms:</strong> ${analysis.terms.join(', ')}</p>
            </div>
        `;
    }, 1000);
}

function processMediumTermMemory(input) {
    const stage = document.getElementById('medium-term-stage');
    stage.classList.add('processing');
    
    setTimeout(() => {
        const profile = generateUserProfile(input);
        stage.querySelector('.processing-status').textContent = 'Complete';
        stage.querySelector('.processing-status').className = 'processing-status';
        stage.querySelector('.stage-output').innerHTML = `
            <div class="memory-result">
                <p><strong>User Profile:</strong> ${profile.type}</p>
                <p><strong>Skill Level:</strong> ${profile.skillLevel}</p>
                <p><strong>Recent Interests:</strong> ${profile.interests.join(', ')}</p>
            </div>
        `;
    }, 1000);
}

function processLongTermMemory(input) {
    const stage = document.getElementById('long-term-stage');
    stage.classList.add('processing');
    
    setTimeout(() => {
        const knowledge = retrieveKnowledge(input);
        stage.querySelector('.processing-status').textContent = 'Complete';
        stage.querySelector('.processing-status').className = 'processing-status';
        stage.querySelector('.stage-output').innerHTML = `
            <div class="memory-result">
                <p><strong>Domain:</strong> ${knowledge.domain}</p>
                <p><strong>Related Concepts:</strong> ${knowledge.concepts.join(', ')}</p>
                <p><strong>Prerequisites:</strong> ${knowledge.prerequisites.join(', ')}</p>
            </div>
        `;
    }, 1000);
}

function generateFinalResponse(input) {
    const responseDiv = document.getElementById('final-response');
    const responseContent = responseDiv.querySelector('.response-content');
    
    responseContent.innerHTML = '<div class="loading"></div> Generating AI response...';
    
    setTimeout(() => {
        const response = generateIntelligentResponse(input);
        responseContent.innerHTML = `
            <div class="ai-response">
                <h5>🤖 AI Assistant Response:</h5>
                <p>${response}</p>
                <div class="response-meta">
                    <small>Generated using multi-layer memory system | Confidence: 94%</small>
                </div>
            </div>
        `;
    }, 1500);
}

function analyzeUserInput(input) {
    const terms = input.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    return {
        context: "Educational query about machine learning",
        intent: "seeking_information",
        terms: terms.slice(0, 5)
    };
}

function generateUserProfile(input) {
    const hasAdvancedTerms = /deep learning|neural networks|algorithms|advanced/.test(input.toLowerCase());
    return {
        type: "Technical Learner",
        skillLevel: hasAdvancedTerms ? "Advanced" : "Intermediate",
        interests: ["machine learning", "data science", "programming"]
    };
}

function retrieveKnowledge(input) {
    return {
        domain: "Machine Learning",
        concepts: ["supervised learning", "neural networks", "deep learning"],
        prerequisites: ["linear algebra", "statistics", "python programming"]
    };
}

function generateIntelligentResponse(input) {
    const responses = [
        "Based on your interest in machine learning courses focusing on deep learning and neural networks, I recommend starting with foundational courses in linear algebra and statistics. Popular platforms like Coursera, edX, and Udacity offer excellent deep learning specializations. Key courses to consider include Andrew Ng's Machine Learning Course, Fast.ai's Practical Deep Learning, and Stanford's CS231n. For hands-on practice, TensorFlow and PyTorch are essential frameworks to master.",
        
        "For machine learning courses with a deep learning focus, I'd suggest a structured learning path: 1) Master Python programming fundamentals, 2) Study linear algebra and probability theory, 3) Complete Andrew Ng's Machine Learning course for foundations, 4) Dive into deep learning with Fast.ai or Coursera's Deep Learning Specialization, 5) Practice with real projects using TensorFlow or PyTorch. This progression builds solid theoretical understanding while providing practical experience.",
        
        "Given your query about machine learning and neural networks, here are top recommendations: Academic courses like MIT's 6.034 or Stanford's CS229 for theory, practical courses like Fast.ai for implementation, and specialized programs like Udacity's Machine Learning Engineer Nanodegree. Focus areas should include supervised/unsupervised learning, neural network architectures (CNNs, RNNs, Transformers), and optimization techniques. Supplement with hands-on projects using popular datasets from Kaggle."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Memory Analytics Charts
function initializeMemoryCharts() {
    initializeMemoryUsageChart();
    initializeQueryPatternsChart();
    initializeAccuracyChart();
}

function initializeMemoryUsageChart() {
    const ctx = document.getElementById('memory-usage-chart');
    if (!ctx) return;
    
    memoryCharts.usage = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Short-term', 'Medium-term', 'Long-term'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initializeQueryPatternsChart() {
    const ctx = document.getElementById('query-patterns-chart');
    if (!ctx) return;
    
    memoryCharts.patterns = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Query Volume',
                data: [12, 19, 15, 25, 22, 18, 24],
                borderColor: '#7b61ff',
                backgroundColor: 'rgba(123, 97, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function initializeAccuracyChart() {
    const ctx = document.getElementById('accuracy-chart');
    if (!ctx) return;
    
    memoryCharts.accuracy = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Accuracy %',
                data: [78, 85, 91, 94],
                backgroundColor: 'linear-gradient(135deg, #7b61ff, #a855f7)',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Utility Functions
function showToast(message, type = 'info') {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    const colors = {
        info: 'linear-gradient(135deg, #7b61ff, #a855f7)',
        success: 'linear-gradient(135deg, #10b981, #059669)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)'
    };
    
    toast.style.background = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

// Performance Monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
        }
    });
});

performanceObserver.observe({ entryTypes: ['navigation'] });

// Error Handling
window.addEventListener('error', function(e) {
    console.error('AI Systems JavaScript error:', e.error);
    showToast('An error occurred. Please refresh the page.', 'error');
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (collaborationInterval) {
        clearInterval(collaborationInterval);
    }
    
    Object.values(memoryCharts).forEach(chart => {
        if (chart) chart.destroy();
    });
});

// Console welcome message
console.log('%c🚀 Phase 3: AI-Driven Data Systems Loaded!', 
    'color: #7b61ff; font-size: 18px; font-weight: bold; background: linear-gradient(135deg, #7b61ff, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cExperience the future of data with vector search, knowledge graphs, and AI agents!', 
    'color: #a78bfa; font-size: 12px;');
console.log('%cInteractive features: Vector search, graph exploration, agent simulation, memory systems', 
    'color: #cbd5e1; font-size: 11px;');

// Initialize analytics
setTimeout(() => {
    console.log(`%c📊 System loaded: ${aiDataSamples.documents.length} documents, ${aiDataSamples.knowledgeNodes.length} graph nodes`, 
        'color: #10b981; font-size: 12px;');
}, 1000);