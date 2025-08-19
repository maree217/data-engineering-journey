// Phase 4: End-to-End Agent Automation - Main JavaScript

// Global state management
const AgenticState = {
    currentScenario: null,
    currentDemo: null,
    workflows: [],
    knowledgeGraphs: [],
    searchQueries: []
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAgenticSystems();
    setupEventListeners();
    startFloatingAgentsAnimation();
});

// Initialize all agentic systems
function initializeAgenticSystems() {
    console.log('🤖 Initializing Agentic AI Systems...');
    
    // Initialize floating agents animation
    animateFloatingAgents();
    
    // Setup smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Initialize scenario cards
    initializeScenarioCards();
    
    // Initialize demo cards
    initializeDemoCards();
    
    console.log('✅ Agentic systems initialized successfully');
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // Scenario buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const scenario = this.closest('.scenario-card').dataset.scenario;
            openScenario(scenario);
        });
    });
    
    // Demo buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Extract demo type from onclick attribute or data attribute
            const demoType = this.onclick ? 
                this.onclick.toString().match(/openDemo\(['"]([^'"]+)['"]\)/)?.[1] :
                this.dataset.demo;
            if (demoType) {
                openDemo(demoType);
            }
        });
    });
    
    // CTA buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('[onclick*="startLearningPath"]')) {
            e.preventDefault();
            startLearningPath();
        }
        if (e.target.matches('[onclick*="exploreAllScenarios"]')) {
            e.preventDefault();
            exploreAllScenarios();
        }
    });
}

// Floating agents animation
function startFloatingAgentsAnimation() {
    const agents = document.querySelectorAll('.agent-particle');
    
    agents.forEach((agent, index) => {
        // Set initial position
        agent.style.animationDelay = `${-index * 1.6}s`;
        
        // Add click interaction
        agent.addEventListener('click', function() {
            showAgentInfo(this.dataset.agent);
        });
        
        // Add hover effect
        agent.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.zIndex = '10';
        });
        
        agent.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
}

function animateFloatingAgents() {
    const agents = document.querySelectorAll('.agent-particle');
    
    setInterval(() => {
        agents.forEach((agent, index) => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomRotate = Math.random() * 20 - 10;
            
            agent.style.transform += ` translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            
            // Reset after animation
            setTimeout(() => {
                agent.style.transform = '';
            }, 2000);
        });
    }, 8000);
}

// Smooth scrolling setup
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Initialize scenario cards with hover effects
function initializeScenarioCards() {
    const scenarioCards = document.querySelectorAll('.scenario-card');
    
    scenarioCards.forEach(card => {
        const scenario = card.dataset.scenario;
        
        // Add hover animation for pipeline flow
        card.addEventListener('mouseenter', function() {
            const pipelineSteps = this.querySelectorAll('.pipeline-step');
            pipelineSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.background = getScenarioColor(scenario);
                    step.style.color = 'white';
                    step.style.transform = 'scale(1.05)';
                }, index * 200);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const pipelineSteps = this.querySelectorAll('.pipeline-step');
            pipelineSteps.forEach(step => {
                step.style.background = '#f1f5f9';
                step.style.color = '#475569';
                step.style.transform = 'scale(1)';
            });
        });
    });
}

// Initialize demo cards with preview animations
function initializeDemoCards() {
    const demoCards = document.querySelectorAll('.demo-card');
    
    demoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Animate workflow preview
            const workflowNodes = this.querySelectorAll('.workflow-node');
            workflowNodes.forEach((node, index) => {
                setTimeout(() => {
                    node.style.transform = 'scale(1.1)';
                    node.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }, index * 150);
            });
            
            // Animate graph preview
            const graphNodes = this.querySelectorAll('.node');
            graphNodes.forEach((node, index) => {
                setTimeout(() => {
                    node.setAttribute('r', parseFloat(node.getAttribute('r')) * 1.2);
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset workflow nodes
            const workflowNodes = this.querySelectorAll('.workflow-node');
            workflowNodes.forEach(node => {
                node.style.transform = 'scale(1)';
                node.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            });
            
            // Reset graph nodes
            const graphNodes = this.querySelectorAll('.node');
            graphNodes.forEach(node => {
                const originalR = node.dataset.originalR || node.getAttribute('r');
                node.setAttribute('r', originalR);
                if (!node.dataset.originalR) {
                    node.dataset.originalR = originalR;
                }
            });
        });
    });
}

// Get scenario-specific colors
function getScenarioColor(scenario) {
    const colors = {
        'customer360': '#3b82f6',
        'supply-chain': '#10b981',
        'fraud-detection': '#ef4444',
        'marketing': '#f59e0b',
        'healthcare': '#8b5cf6'
    };
    return colors[scenario] || '#667eea';
}

// Open business scenario
function openScenario(scenarioType) {
    console.log(`🏢 Opening ${scenarioType} scenario...`);
    
    AgenticState.currentScenario = scenarioType;
    
    // Show loading animation
    showScenarioLoader(scenarioType);
    
    // Simulate scenario loading
    setTimeout(() => {
        // For now, show a demo modal
        // In a real implementation, this would navigate to the specific scenario page
        showScenarioModal(scenarioType);
    }, 2000);
}

// Open demo tool
function openDemo(demoType) {
    console.log(`🛠️ Opening ${demoType} demo...`);
    
    AgenticState.currentDemo = demoType;
    
    // Show loading animation
    showDemoLoader(demoType);
    
    // Simulate demo loading
    setTimeout(() => {
        // For now, show a demo modal
        // In a real implementation, this would navigate to the specific demo page
        showDemoModal(demoType);
    }, 1500);
}

// Show scenario loading animation
function showScenarioLoader(scenarioType) {
    const modal = createModal();
    const scenarioNames = {
        'customer360': 'Customer 360 Intelligence',
        'supply-chain': 'Supply Chain Optimization',
        'fraud-detection': 'Financial Fraud Detection',
        'marketing': 'Marketing Attribution',
        'healthcare': 'Healthcare Care Coordination'
    };
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="loader-container">
                <div class="scenario-loader">
                    <div class="loader-icon">🤖</div>
                    <h3>Initializing ${scenarioNames[scenarioType]}</h3>
                    <p>Setting up agent workflows and knowledge graphs...</p>
                    <div class="progress-bar">
                        <div class="progress-fill" id="scenario-progress"></div>
                    </div>
                    <div class="loader-steps">
                        <div class="step active">🔍 Analyzing business requirements</div>
                        <div class="step">⚙️ Configuring agent pipelines</div>
                        <div class="step">🕸️ Building knowledge graph</div>
                        <div class="step">📊 Preparing visualizations</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Animate progress
    let progress = 0;
    const progressBar = modal.querySelector('#scenario-progress');
    const steps = modal.querySelectorAll('.step');
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        
        // Activate steps
        const activeStep = Math.floor((progress / 100) * steps.length);
        steps.forEach((step, index) => {
            if (index <= activeStep) {
                step.classList.add('active');
            }
        });
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 200);
}

// Show demo loading animation
function showDemoLoader(demoType) {
    const modal = createModal();
    const demoNames = {
        'workflow-designer': 'Agent Workflow Designer',
        'graph-explorer': 'Knowledge Graph Explorer',
        'hybrid-search': 'Hybrid Vector-Graph Search'
    };
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="loader-container">
                <div class="demo-loader">
                    <div class="loader-icon">🛠️</div>
                    <h3>Loading ${demoNames[demoType]}</h3>
                    <p>Preparing interactive tools and simulations...</p>
                    <div class="demo-animation">
                        <div class="loading-agents">
                            <div class="agent-dot">📥</div>
                            <div class="agent-dot">⚙️</div>
                            <div class="agent-dot">🧠</div>
                            <div class="agent-dot">📊</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Animate loading agents
    const agentDots = modal.querySelectorAll('.agent-dot');
    agentDots.forEach((dot, index) => {
        dot.style.animation = `bounce 1s infinite ${index * 0.2}s`;
    });
}

// Show scenario modal with demo content
function showScenarioModal(scenarioType) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();
    
    const modal = createModal();
    const scenarioData = getScenarioData(scenarioType);
    
    modal.innerHTML = `
        <div class="modal-content scenario-modal">
            <div class="modal-header">
                <h2>${scenarioData.icon} ${scenarioData.name}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="scenario-overview">
                    <p>${scenarioData.description}</p>
                </div>
                
                <div class="scenario-features">
                    <h3>🎯 Key Features</h3>
                    <div class="features-grid">
                        ${scenarioData.features.map(feature => `
                            <div class="feature-item">
                                <span class="feature-icon">${feature.icon}</span>
                                <div>
                                    <strong>${feature.name}</strong>
                                    <p>${feature.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="scenario-demo">
                    <h3>🚀 Interactive Demo</h3>
                    <p>This is a preview of the ${scenarioData.name} system. In the full implementation, you would have access to:</p>
                    <ul>
                        <li>Real-time data visualization</li>
                        <li>Interactive agent workflows</li>
                        <li>Knowledge graph exploration</li>
                        <li>Automated decision making</li>
                    </ul>
                    <div class="demo-placeholder">
                        <div class="demo-visual">
                            <div class="demo-graph">
                                <div class="graph-node central">${scenarioData.icon}</div>
                                <div class="graph-connections">
                                    <div class="connection-line"></div>
                                    <div class="connection-line"></div>
                                    <div class="connection-line"></div>
                                    <div class="connection-line"></div>
                                </div>
                                <div class="graph-node satellite">📊</div>
                                <div class="graph-node satellite">🤖</div>
                                <div class="graph-node satellite">🔍</div>
                                <div class="graph-node satellite">⚡</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeModal()">Close</button>
                <button class="btn-primary" onclick="startScenarioTutorial('${scenarioType}')">Start Tutorial</button>
            </div>
        </div>
    `;
    
    // Add close functionality
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Animate demo graph
    animateDemoGraph(modal);
}

// Show demo modal with interactive content
function showDemoModal(demoType) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();
    
    const modal = createModal();
    const demoData = getDemoData(demoType);
    
    modal.innerHTML = `
        <div class="modal-content demo-modal">
            <div class="modal-header">
                <h2>${demoData.icon} ${demoData.name}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="demo-overview">
                    <p>${demoData.description}</p>
                </div>
                
                <div class="demo-interface">
                    <h3>🎛️ Interactive Interface</h3>
                    ${demoData.interface}
                </div>
                
                <div class="demo-capabilities">
                    <h3>⚡ Capabilities</h3>
                    <div class="capabilities-list">
                        ${demoData.capabilities.map(cap => `
                            <div class="capability-item">
                                <span class="capability-icon">${cap.icon}</span>
                                <span>${cap.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeModal()">Close</button>
                <button class="btn-primary" onclick="launchDemo('${demoType}')">Launch Full Demo</button>
            </div>
        </div>
    `;
    
    // Add close functionality
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Initialize demo interface
    initializeDemoInterface(demoType, modal);
}

// Get scenario data
function getScenarioData(scenarioType) {
    const scenarios = {
        'customer360': {
            name: 'Customer 360 Intelligence',
            icon: '👥',
            description: 'Complete customer lifecycle management with automated insights, churn prediction, and personalized recommendations using graph traversal instead of ML models.',
            features: [
                { icon: '🔍', name: 'Customer Journey Mapping', description: 'Visualize complete customer paths through graph analysis' },
                { icon: '⚠️', name: 'Churn Prediction', description: 'Identify at-risk customers using graph centrality measures' },
                { icon: '🎯', name: 'Personalization', description: 'Graph-based recommendations without ML training' },
                { icon: '💰', name: 'Revenue Optimization', description: 'Automated upsell and cross-sell opportunities' }
            ]
        },
        'supply-chain': {
            name: 'Supply Chain Optimization',
            icon: '🏭',
            description: 'End-to-end supply chain visibility with predictive insights, route optimization, and risk assessment using graph algorithms for real-time decision making.',
            features: [
                { icon: '🚚', name: 'Route Optimization', description: 'Graph-based shortest path algorithms for logistics' },
                { icon: '⚠️', name: 'Risk Assessment', description: 'Supply network vulnerability analysis' },
                { icon: '📦', name: 'Inventory Management', description: 'Demand prediction through supplier networks' },
                { icon: '💰', name: 'Cost Reduction', description: 'Automated cost optimization across the chain' }
            ]
        },
        'fraud-detection': {
            name: 'Financial Fraud Detection',
            icon: '🛡️',
            description: 'Real-time fraud prevention with automated compliance checking, pattern detection, and investigation reports using transaction network analysis.',
            features: [
                { icon: '⚡', name: 'Real-time Detection', description: 'Instant fraud pattern recognition in transaction graphs' },
                { icon: '📋', name: 'AML Compliance', description: 'Automated anti-money laundering checks' },
                { icon: '🔍', name: 'Pattern Analysis', description: 'Complex fraud ring detection through graph clustering' },
                { icon: '📊', name: 'Investigation Automation', description: 'Automated case building and reporting' }
            ]
        },
        'marketing': {
            name: 'Marketing Attribution',
            icon: '🎯',
            description: 'Multi-channel marketing effectiveness with automated campaign optimization, attribution modeling, and ROI analysis using customer journey graphs.',
            features: [
                { icon: '🌐', name: 'Cross-Channel Attribution', description: 'Graph-based customer journey reconstruction' },
                { icon: '🎯', name: 'Campaign Optimization', description: 'Real-time budget allocation using graph insights' },
                { icon: '💰', name: 'Budget Allocation', description: 'Automated spend optimization across channels' },
                { icon: '📈', name: 'ROI Measurement', description: 'Comprehensive marketing performance tracking' }
            ]
        },
        'healthcare': {
            name: 'Healthcare Care Coordination',
            icon: '🏥',
            description: 'Integrated patient care with predictive health insights, treatment recommendations, and care coordination using medical knowledge graphs.',
            features: [
                { icon: '💊', name: 'Drug Interactions', description: 'Medical knowledge graph for safety checking' },
                { icon: '🩺', name: 'Treatment Recommendations', description: 'Evidence-based care suggestions' },
                { icon: '🤝', name: 'Care Coordination', description: 'Automated care team communication' },
                { icon: '📊', name: 'Outcome Prediction', description: 'Patient journey outcome forecasting' }
            ]
        }
    };
    
    return scenarios[scenarioType];
}

// Get demo data
function getDemoData(demoType) {
    const demos = {
        'workflow-designer': {
            name: 'Agent Workflow Designer',
            icon: '🔧',
            description: 'Drag-and-drop interface for creating multi-agent workflows with real-time monitoring and performance analytics.',
            interface: `
                <div class="workflow-canvas">
                    <div class="workflow-toolbar">
                        <button class="tool-btn" title="Add Data Agent">📥</button>
                        <button class="tool-btn" title="Add Process Agent">⚙️</button>
                        <button class="tool-btn" title="Add Analysis Agent">🧠</button>
                        <button class="tool-btn" title="Add Visualization Agent">📊</button>
                    </div>
                    <div class="canvas-area">
                        <div class="canvas-grid"></div>
                        <div class="workflow-sample">
                            <div class="agent-node" style="left: 50px; top: 50px;">📥 Data Ingestion</div>
                            <div class="agent-node" style="left: 200px; top: 50px;">⚙️ Processing</div>
                            <div class="agent-node" style="left: 350px; top: 50px;">📊 Visualization</div>
                            <svg class="connection-svg">
                                <line x1="150" y1="70" x2="200" y2="70" stroke="#667eea" stroke-width="2"></line>
                                <line x1="300" y1="70" x2="350" y2="70" stroke="#667eea" stroke-width="2"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            `,
            capabilities: [
                { icon: '🎨', name: 'Visual Workflow Builder' },
                { icon: '🤖', name: 'Agent Templates' },
                { icon: '📊', name: 'Real-time Monitoring' },
                { icon: '📈', name: 'Performance Analytics' }
            ]
        },
        'graph-explorer': {
            name: 'Knowledge Graph Explorer',
            icon: '🕸️',
            description: 'Interactive graph visualization with advanced querying, algorithm exploration, and business insight generation.',
            interface: `
                <div class="graph-interface">
                    <div class="graph-controls">
                        <input type="text" placeholder="Enter Cypher query..." class="query-input">
                        <button class="query-btn">▶️ Run</button>
                    </div>
                    <div class="graph-viewport">
                        <div class="graph-sample">
                            <div class="graph-node customer" style="left: 100px; top: 100px;">Customer</div>
                            <div class="graph-node product" style="left: 250px; top: 50px;">Product</div>
                            <div class="graph-node order" style="left: 250px; top: 150px;">Order</div>
                            <div class="graph-edge" style="left: 130px; top: 90px; width: 100px; transform: rotate(-15deg);"></div>
                            <div class="graph-edge" style="left: 130px; top: 110px; width: 100px; transform: rotate(15deg);"></div>
                        </div>
                    </div>
                    <div class="graph-algorithms">
                        <button class="algo-btn">🎯 Centrality</button>
                        <button class="algo-btn">🔗 Communities</button>
                        <button class="algo-btn">📏 Shortest Path</button>
                    </div>
                </div>
            `,
            capabilities: [
                { icon: '🎨', name: 'Interactive Visualization' },
                { icon: '💻', name: 'Cypher Queries' },
                { icon: '🧮', name: 'Graph Algorithms' },
                { icon: '💡', name: 'Business Insights' }
            ]
        },
        'hybrid-search': {
            name: 'Hybrid Vector-Graph Search',
            icon: '🔍',
            description: 'Next-generation search combining vector embeddings with graph relationships for unprecedented accuracy and explainability.',
            interface: `
                <div class="search-interface">
                    <div class="search-box-container">
                        <input type="text" placeholder="Search for anything..." class="hybrid-search-input">
                        <button class="search-btn">🔍 Search</button>
                    </div>
                    <div class="search-options">
                        <label><input type="checkbox" checked> Vector Similarity</label>
                        <label><input type="checkbox" checked> Graph Relationships</label>
                        <label><input type="checkbox"> Semantic Context</label>
                    </div>
                    <div class="search-results-preview">
                        <div class="result-item">
                            <div class="result-score">95%</div>
                            <div class="result-content">
                                <strong>Customer Analytics Dashboard</strong>
                                <p>Found through: Vector similarity + Customer→Analytics relationship</p>
                            </div>
                        </div>
                        <div class="result-item">
                            <div class="result-score">87%</div>
                            <div class="result-content">
                                <strong>Revenue Optimization Model</strong>
                                <p>Found through: Semantic context + Revenue→Optimization path</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            capabilities: [
                { icon: '🧠', name: 'Semantic Understanding' },
                { icon: '🕸️', name: 'Relationship Context' },
                { icon: '💡', name: 'Explainable Results' },
                { icon: '⚡', name: 'Real-time Updates' }
            ]
        }
    };
    
    return demos[demoType];
}

// Create modal element
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-backdrop"></div>';
    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-content {
                background: white;
                border-radius: 16px;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: modalSlideIn 0.3s ease-out;
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #64748b;
                padding: 0.5rem;
                border-radius: 4px;
            }
            
            .modal-close:hover {
                background: #f1f5f9;
                color: #1e293b;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-footer {
                padding: 1rem 2rem 2rem;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                border-top: 1px solid #e2e8f0;
            }
            
            /* Loader styles */
            .loader-container {
                padding: 3rem;
                text-align: center;
            }
            
            .loader-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                margin: 2rem 0;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(135deg, #667eea, #764ba2);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .loader-steps {
                text-align: left;
                margin-top: 2rem;
            }
            
            .step {
                padding: 0.5rem 0;
                opacity: 0.5;
                transition: opacity 0.3s ease;
            }
            
            .step.active {
                opacity: 1;
                font-weight: 600;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    return modal;
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Show agent info
function showAgentInfo(agentType) {
    const agentInfo = {
        'extractor': { name: 'Data Extractor Agent', description: 'Intelligently harvests data from multiple sources' },
        'processor': { name: 'Data Processor Agent', description: 'Transforms and cleans data in real-time' },
        'analyzer': { name: 'Analysis Agent', description: 'Applies graph algorithms for insights' },
        'visualizer': { name: 'Visualization Agent', description: 'Creates dynamic dashboards and reports' },
        'orchestrator': { name: 'Orchestrator Agent', description: 'Coordinates all agents and workflows' }
    };
    
    const info = agentInfo[agentType];
    if (info) {
        // Create a small tooltip or notification
        const tooltip = document.createElement('div');
        tooltip.className = 'agent-tooltip';
        tooltip.innerHTML = `
            <strong>${info.name}</strong><br>
            ${info.description}
        `;
        
        // Position and show tooltip
        document.body.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 3000);
    }
}

// Start learning path
function startLearningPath() {
    console.log('🎯 Starting Customer 360 learning path...');
    openScenario('customer360');
}

// Explore all scenarios
function exploreAllScenarios() {
    console.log('🌟 Exploring all scenarios...');
    
    // Scroll to scenarios section
    const scenariosSection = document.querySelector('#business-scenarios');
    if (scenariosSection) {
        scenariosSection.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight all scenario cards
        const cards = document.querySelectorAll('.scenario-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
                
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 1000);
            }, index * 200);
        });
    }
}

// Start scenario tutorial
function startScenarioTutorial(scenarioType) {
    console.log(`🎓 Starting tutorial for ${scenarioType}...`);
    closeModal();
    
    // In a real implementation, this would launch the interactive tutorial
    // For now, show a success message
    showSuccessMessage(`Tutorial for ${scenarioType} will be available in the full implementation!`);
}

// Launch demo
function launchDemo(demoType) {
    console.log(`🚀 Launching ${demoType} demo...`);
    closeModal();
    
    // In a real implementation, this would navigate to the full demo page
    // For now, show a success message
    showSuccessMessage(`Full ${demoType} demo will be available in the complete system!`);
}

// Show success message
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Add notification styles
    const styles = `
        .success-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Animate demo graph
function animateDemoGraph(modal) {
    const centralNode = modal.querySelector('.graph-node.central');
    const satelliteNodes = modal.querySelectorAll('.graph-node.satellite');
    const connections = modal.querySelectorAll('.connection-line');
    
    if (centralNode && satelliteNodes.length && connections.length) {
        // Animate central node
        centralNode.style.animation = 'pulse 2s infinite';
        
        // Animate satellite nodes
        satelliteNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'bounce 1s infinite';
            }, index * 200);
        });
        
        // Animate connections
        connections.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.animation = 'glow 2s infinite';
            }, index * 300);
        });
    }
}

// Initialize demo interface
function initializeDemoInterface(demoType, modal) {
    switch (demoType) {
        case 'workflow-designer':
            initializeWorkflowDesigner(modal);
            break;
        case 'graph-explorer':
            initializeGraphExplorer(modal);
            break;
        case 'hybrid-search':
            initializeHybridSearch(modal);
            break;
    }
}

// Initialize workflow designer interface
function initializeWorkflowDesigner(modal) {
    const toolButtons = modal.querySelectorAll('.tool-btn');
    const canvasArea = modal.querySelector('.canvas-area');
    
    toolButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add visual feedback
            this.style.background = '#667eea';
            this.style.color = 'white';
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
            }, 200);
        });
    });
    
    // Make sample nodes draggable (basic implementation)
    const sampleNodes = modal.querySelectorAll('.agent-node');
    sampleNodes.forEach(node => {
        node.style.cursor = 'move';
        node.addEventListener('mousedown', function(e) {
            // Basic drag implementation would go here
            this.style.opacity = '0.7';
            this.style.transform = 'scale(1.1)';
        });
        
        node.addEventListener('mouseup', function() {
            this.style.opacity = '';
            this.style.transform = '';
        });
    });
}

// Initialize graph explorer interface
function initializeGraphExplorer(modal) {
    const queryBtn = modal.querySelector('.query-btn');
    const queryInput = modal.querySelector('.query-input');
    const algoButtons = modal.querySelectorAll('.algo-btn');
    
    if (queryBtn) {
        queryBtn.addEventListener('click', function() {
            const query = queryInput?.value || '';
            console.log('Running Cypher query:', query);
            
            // Animate query execution
            this.innerHTML = '⏳ Running...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '▶️ Run';
                this.disabled = false;
                
                // Show sample results
                showQueryResults(modal, query);
            }, 1500);
        });
    }
    
    algoButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const algorithm = this.textContent.trim();
            console.log('Running algorithm:', algorithm);
            
            // Visual feedback
            this.style.background = '#10b981';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
            }, 1000);
        });
    });
}

// Initialize hybrid search interface
function initializeHybridSearch(modal) {
    const searchBtn = modal.querySelector('.search-btn');
    const searchInput = modal.querySelector('.hybrid-search-input');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput?.value || '';
            console.log('Running hybrid search:', query);
            
            // Animate search
            this.innerHTML = '🔍 Searching...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '🔍 Search';
                this.disabled = false;
                
                // Update results preview
                updateSearchResults(modal, query);
            }, 1000);
        });
    }
    
    // Handle search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn?.click();
            }
        });
        
        searchInput.addEventListener('input', function() {
            // Real-time search preview could go here
            if (this.value.length > 2) {
                // Show search suggestions
            }
        });
    }
}

// Show query results
function showQueryResults(modal, query) {
    // This would show actual Cypher query results in a real implementation
    console.log('Query results for:', query);
}

// Update search results
function updateSearchResults(modal, query) {
    const resultsContainer = modal.querySelector('.search-results-preview');
    if (resultsContainer && query) {
        // Update with new search results based on query
        console.log('Updated search results for:', query);
    }
}

// Export functions for global access
window.openScenario = openScenario;
window.openDemo = openDemo;
window.startLearningPath = startLearningPath;
window.exploreAllScenarios = exploreAllScenarios;
window.startScenarioTutorial = startScenarioTutorial;
window.launchDemo = launchDemo;
window.closeModal = closeModal;