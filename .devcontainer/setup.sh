#!/bin/bash

# Data Engineering Course - Complete Setup Script
echo "🚀 Setting up Data Engineering Journey - All Phases"

# Update system
sudo apt-get update

# Install global Node.js packages
npm install -g live-server nodemon concurrently

# Install Python dependencies
echo "📦 Installing Python packages..."
pip install -r requirements.txt

# Install PostgreSQL and pgvector dependencies
echo "🐘 Setting up PostgreSQL with pgvector..."
sudo apt-get install -y postgresql-client libpq-dev

# Install Redis for memory systems
echo "🔴 Setting up Redis..."
sudo apt-get install -y redis-tools

# Create necessary directories
mkdir -p data/{databases,exports,logs}
mkdir -p scripts/{automation,deployment}

# Set up database connection files
echo "🔧 Creating configuration files..."

# Create environment file
cat > .env << EOF
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=data_course
POSTGRES_USER=course_user
POSTGRES_PASSWORD=secure_password

# Redis Configuration  
REDIS_HOST=localhost
REDIS_PORT=6379

# Azure Configuration (to be filled by user)
AZURE_SUBSCRIPTION_ID=
AZURE_RESOURCE_GROUP=
AZURE_REGION=eastus

# OpenAI Configuration (for AI features)
OPENAI_API_KEY=

# Course Environment
COURSE_PHASE=all
DEBUG_MODE=true
EOF

# Create launch scripts for all phases
echo "📜 Creating launch scripts..."

# Phase 1 launcher
cat > launch-phase1.sh << 'EOF'
#!/bin/bash
echo "🏛️ Launching Phase 1: Traditional Data Systems"
cd phase1-traditional/html-dashboard
live-server --port=3000 --open=/index.html
EOF

# Phase 2 launcher  
cat > launch-phase2.sh << 'EOF'
#!/bin/bash
echo "☁️ Launching Phase 2: Modern Data Engineering"
cd phase2-modern/mlops-pipeline
live-server --port=3001 --open=/index.html
EOF

# Phase 3 launcher
cat > launch-phase3.sh << 'EOF'
#!/bin/bash  
echo "🤖 Launching Phase 3: AI-Driven Data Systems"
cd phase3-ai-driven/vector-search
live-server --port=3002 --open=/index.html
EOF

# Complete course launcher
cat > launch-all.sh << 'EOF'
#!/bin/bash
echo "🎯 Launching Complete Data Engineering Course"
echo "🚀 Starting all phases simultaneously..."

# Launch Phase 1 in background
cd phase1-traditional/html-dashboard && live-server --port=3000 --no-browser &
P1_PID=$!

# Launch Phase 2 in background  
cd ../../phase2-modern/mlops-pipeline && live-server --port=3001 --no-browser &
P2_PID=$!

# Launch Phase 3 in background
cd ../../phase3-ai-driven/vector-search && live-server --port=3002 --no-browser &
P3_PID=$!

# Launch Jupyter Lab
jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root &
JUPYTER_PID=$!

echo "✅ All services started!"
echo "📊 Phase 1 (Traditional): http://localhost:3000"
echo "☁️ Phase 2 (Modern): http://localhost:3001"  
echo "🤖 Phase 3 (AI-Driven): http://localhost:3002"
echo "🔬 Jupyter Lab: http://localhost:8888"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap "echo 'Stopping all services...'; kill $P1_PID $P2_PID $P3_PID $JUPYTER_PID 2>/dev/null; exit" INT
wait
EOF

# Make scripts executable
chmod +x launch-*.sh

# Set up sample data
echo "📄 Creating sample data files..."

# Create sample CSV for Phase 1
cat > data/sample_customers.csv << 'EOF'
id,name,email,age,city,purchase_amount,registration_date
1,Alice Johnson,alice@email.com,28,New York,1250.00,2023-01-15
2,Bob Smith,bob@email.com,35,Los Angeles,890.50,2023-02-20
3,Carol Davis,carol@email.com,42,Chicago,2100.75,2023-03-10
4,David Wilson,david@email.com,31,Houston,675.25,2023-04-05
5,Emma Brown,emma@email.com,29,Phoenix,1450.00,2023-05-12
EOF

# Create sample JSON for API testing
cat > data/api_sample.json << 'EOF'
{
  "customers": [
    {"id": 1, "name": "Alice Johnson", "segment": "Premium"},
    {"id": 2, "name": "Bob Smith", "segment": "Standard"}  
  ],
  "products": [
    {"id": 101, "name": "Laptop Pro", "category": "Electronics", "price": 999.99},
    {"id": 102, "name": "Wireless Mouse", "category": "Electronics", "price": 49.99}
  ]
}
EOF

# Create database initialization script
cat > scripts/init_databases.sql << 'EOF'
-- Data Engineering Course Database Setup

-- Create main database
CREATE DATABASE IF NOT EXISTS data_course;
USE data_course;

-- Create customers table
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT,
    city VARCHAR(50),
    purchase_amount DECIMAL(10,2),
    registration_date DATE
);

-- Create products table  
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2),
    stock INT
);

-- Create orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    order_date DATE,
    quantity INT,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample data
INSERT INTO customers VALUES 
(1, 'Alice Johnson', 'alice@email.com', 28, 'New York', 1250.00, '2023-01-15'),
(2, 'Bob Smith', 'bob@email.com', 35, 'Los Angeles', 890.50, '2023-02-20'),
(3, 'Carol Davis', 'carol@email.com', 42, 'Chicago', 2100.75, '2023-03-10');

INSERT INTO products VALUES
(101, 'Laptop Pro', 'Electronics', 999.99, 50),
(102, 'Wireless Mouse', 'Electronics', 49.99, 200),
(103, 'USB-C Hub', 'Electronics', 89.99, 75);
EOF

# Create Python utility scripts
echo "🐍 Creating Python utilities..."

cat > scripts/data_generator.py << 'EOF'
#!/usr/bin/env python3
"""
Data Engineering Course - Sample Data Generator
Generates realistic sample data for all phases of the course.
"""

import json
import csv
import random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

def generate_customers(count=100):
    """Generate sample customer data"""
    customers = []
    cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego']
    segments = ['Premium', 'Standard', 'Basic', 'VIP']
    
    for i in range(1, count + 1):
        customer = {
            'id': i,
            'name': fake.name(),
            'email': fake.email(),
            'age': random.randint(25, 65),
            'city': random.choice(cities),
            'segment': random.choice(segments),
            'purchase_amount': round(random.uniform(50, 3000), 2),
            'registration_date': fake.date_between(start_date='-2y', end_date='today').isoformat()
        }
        customers.append(customer)
    
    return customers

def generate_products(count=50):
    """Generate sample product data"""
    products = []
    categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Toys']
    
    for i in range(1, count + 1):
        product = {
            'id': i + 100,
            'name': fake.catch_phrase(),
            'category': random.choice(categories),
            'price': round(random.uniform(10, 1000), 2),
            'stock': random.randint(0, 500),
            'rating': round(random.uniform(1, 5), 1)
        }
        products.append(product)
    
    return products

def save_to_csv(data, filename):
    """Save data to CSV file"""
    if not data:
        return
    
    with open(f'data/{filename}', 'w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

def save_to_json(data, filename):
    """Save data to JSON file"""
    with open(f'data/{filename}', 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2)

if __name__ == "__main__":
    print("🔄 Generating sample data...")
    
    # Generate data
    customers = generate_customers(100)
    products = generate_products(50)
    
    # Save to files
    save_to_csv(customers, 'customers.csv')
    save_to_csv(products, 'products.csv')
    save_to_json({'customers': customers, 'products': products}, 'complete_dataset.json')
    
    print(f"✅ Generated {len(customers)} customers and {len(products)} products")
    print("📁 Data saved to data/ directory")
EOF

# Create requirements.txt with all dependencies
cat > requirements.txt << 'EOF'
# Core Data Analysis
pandas>=2.0.0
numpy>=1.24.0
scipy>=1.10.0

# Database Connectivity
sqlalchemy>=2.0.0
psycopg2-binary>=2.9.5
pyodbc>=4.0.35
redis>=4.5.0
neo4j>=5.8.0

# Vector Database Support
sentence-transformers>=2.2.0
chromadb>=0.3.0
faiss-cpu>=1.7.0

# Data Visualization
matplotlib>=3.7.0
seaborn>=0.12.0
plotly>=5.14.0
bokeh>=3.0.0
graphviz>=0.20.0

# Machine Learning
scikit-learn>=1.3.0
tensorflow>=2.13.0
torch>=2.0.0
transformers>=4.30.0

# Jupyter Environment
jupyter>=1.0.0
jupyterlab>=4.0.0
ipykernel>=6.21.0
nbformat>=5.7.0
ipywidgets>=8.0.0

# Web Framework
fastapi>=0.95.0
uvicorn>=0.21.0
flask>=2.2.0
streamlit>=1.23.0

# Data Processing
openpyxl>=3.1.0
xlrd>=2.0.1
python-dateutil>=2.8.2
pytz>=2023.3

# Cloud Integration
azure-storage-blob>=12.14.0
azure-identity>=1.12.0
azure-keyvault-secrets>=4.6.0
azure-cosmos>=4.4.0
boto3>=1.26.0

# Development Tools
black>=23.1.0
pylint>=2.17.0
pytest>=7.2.0
requests>=2.28.0
python-dotenv>=1.0.0

# Text Processing & AI
nltk>=3.8
textblob>=0.17.1
openai>=0.27.0
langchain>=0.0.200

# Data Generation
faker>=18.10.0

# Monitoring & Logging
prometheus-client>=0.16.0

# Progress Bars
tqdm>=4.65.0

# Configuration Management
pydantic>=1.10.0
click>=8.1.0

# Data Quality
great-expectations>=0.16.0
pandera>=0.15.0
EOF

# Install Python packages
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Final setup messages
echo ""
echo "✅ Setup complete! Data Engineering Journey is ready."
echo ""
echo "🎯 Quick Start Commands:"
echo "  ./launch-all.sh      - Launch all phases simultaneously"
echo "  ./launch-phase1.sh   - Launch Phase 1 only"  
echo "  ./launch-phase2.sh   - Launch Phase 2 only"
echo "  ./launch-phase3.sh   - Launch Phase 3 only"
echo ""
echo "📊 Available Services:"
echo "  Port 3000: Phase 1 - Traditional Data Systems"
echo "  Port 3001: Phase 2 - Modern Data Engineering" 
echo "  Port 3002: Phase 3 - AI-Driven Data Systems"
echo "  Port 8888: Jupyter Lab for data analysis"
echo ""
echo "📁 Project Structure:"
echo "  data/          - Sample datasets and exports"
echo "  scripts/       - Automation and utility scripts"  
echo "  .env           - Environment configuration"
echo ""
echo "🚀 Ready to start your Data Engineering Journey!"

# Make the data generator executable and run it
chmod +x scripts/data_generator.py
python3 scripts/data_generator.py

echo "🎉 All setup tasks completed successfully!"