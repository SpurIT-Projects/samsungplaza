// Samsung Plaza - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();
    
    // Scroll to top functionality
    initScrollToTop();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Header scroll effects
    initHeaderEffects();
    
    // Product cards animations
    initAnimations();
});

// Mobile menu initialization
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    // Function to lock/unlock body scroll
    function toggleBodyScroll(lock = true) {
        if (lock) {
            // Calculate scrollbar width to prevent layout shift
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            // Lock scroll
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollbarWidth + 'px';
        } else {
            // Unlock scroll
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }
    
    // Function to update menu icon (correct logic)
    function updateMenuIcon(isOpen) {
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (isOpen) {
                // Menu is open - show close (X) icon
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                // Menu is closed - show hamburger icon
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isMenuActive = navMenu.classList.contains('active');
            
            navMenu.classList.toggle('active');
            
            // Toggle body scroll lock
            if (!isMenuActive) {
                // Menu is opening - lock scroll
                toggleBodyScroll(true);
                updateMenuIcon(true);
            } else {
                // Menu is closing - unlock scroll
                toggleBodyScroll(false);
                updateMenuIcon(false);
            }
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                
                // Unlock scroll and update icon
                toggleBodyScroll(false);
                updateMenuIcon(false);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                
                // Unlock scroll and update icon
                toggleBodyScroll(false);
                updateMenuIcon(false);
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Unlock scroll and update icon
                toggleBodyScroll(false);
                updateMenuIcon(false);
            }
        });
    }
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    let scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
}

// Update active navigation based on current section
function updateActiveNavigation(activeId) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('active');
        }
    });
}

// Header scroll effects
function initHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Initialize animations and interactions
function initAnimations() {
    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and other elements
    const animatedElements = document.querySelectorAll('.card, .product-card, .hero');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility function for page navigation (when multiple pages exist)
function navigateToPage(page) {
    // For future use when multiple pages are implemented
    console.log('Navigate to:', page);
    
    // Scroll to top when changing pages
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Form submission handler (for contact forms, etc.)
function handleFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            showNotification('Спасибо! Ваше сообщение отправлено.', 'success');
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
        color: 'white',
        borderRadius: '4px',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Initialize forms when document is ready
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.classList.contains('contact-form') || form.classList.contains('callback-form')) {
            handleFormSubmission(form);
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
`;
document.head.appendChild(style);
