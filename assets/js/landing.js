// Landing Page JavaScript for Data Engineering Journey

document.addEventListener('DOMContentLoaded', function() {
    initializeLandingPage();
});

function initializeLandingPage() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupNavbarScroll();
    setupParticleAnimation();
    setupCounterAnimation();
    setupPhasePreview();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.overview-card, .phase-card, .feature-card, .launch-option');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Navbar scroll behavior
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Enhanced particle animation
function setupParticleAnimation() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    // Create additional particles
    for (let i = 6; i <= 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 60 + 20; // 20-80px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's'; // 15-25s
        
        particlesContainer.appendChild(particle);
    }
}

// Counter animation for stats
function setupCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    
    if (!statsSection) return;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.disconnect(); // Run only once
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
    
    function animateCounters() {
        statNumbers.forEach(numberElement => {
            const finalValue = numberElement.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            
            let currentValue = 0;
            const increment = numericValue / 50; // 50 steps
            const duration = 2000; // 2 seconds
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= numericValue) {
                    numberElement.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    const displayValue = Math.floor(currentValue);
                    numberElement.textContent = isPercentage ? displayValue + '%' : displayValue + (finalValue.includes('+') ? '+' : '');
                }
            }, stepTime);
        });
    }
}

// Phase preview functionality
function setupPhasePreview() {
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach(card => {
        const phaseBtn = card.querySelector('.phase-btn');
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click tracking
        if (phaseBtn) {
            phaseBtn.addEventListener('click', function(e) {
                const phaseName = this.closest('.phase-card').querySelector('h3').textContent;
                console.log(`Phase clicked: ${phaseName}`);
                
                // Add loading state
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 1000);
            });
        }
    });
}

// Enhanced scroll progress indicator
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollProgress + '%';
    });
}

// Interactive elements enhancement
function setupInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-hero, .phase-btn, .option-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background: rgba(255, 255, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled <= window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing effect for hero title
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 500);
}

// Mobile menu toggle (if needed)
function setupMobileMenu() {
    // Add mobile menu button if nav items are hidden on mobile
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #667eea;
            cursor: pointer;
        `;
        
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        navContainer.appendChild(menuToggle);
    }
}

// Performance monitoring
function setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track user interactions
        let interactions = 0;
        document.addEventListener('click', () => {
            interactions++;
            console.log(`User interactions: ${interactions}`);
        });
    });
}

// Initialize additional features
function initializeEnhancements() {
    setupScrollProgress();
    setupInteractiveElements();
    setupParallaxEffect();
    setupMobileMenu();
    setupPerformanceMonitoring();
    
    // Add smooth transitions to all interactive elements
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
        }
        
        .phase-card, .feature-card, .launch-option {
            will-change: transform;
        }
        
        .btn-primary, .btn-hero, .btn-secondary, .phase-btn, .option-btn {
            will-change: transform, box-shadow;
        }
    `;
    document.head.appendChild(style);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Landing page error:', e.error);
});

// Initialize enhancements after DOM load
document.addEventListener('DOMContentLoaded', initializeEnhancements);

// Console welcome message
console.log('%c🚀 Data Engineering Journey - Landing Page Loaded!', 
    'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cReady to transform your career with AI-driven data engineering?', 
    'color: #64748b; font-size: 12px;');