document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll reveal animations
    const scrollReveal = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 1000,
        reset: true
    });
    
    scrollReveal.reveal('.home-title, .home-subtitle, .home-description, .cta-button', { 
        delay: 200,
        interval: 200
    });
    
    scrollReveal.reveal('.logo-item', {
        delay: 300,
        interval: 100
    });
    
    scrollReveal.reveal('.section-header, .about-text, .about-image', {
        delay: 200,
        interval: 200
    });
    
    scrollReveal.reveal('.skill-item, .project-card, .contact-info, .contact-form', {
        delay: 200,
        interval: 200
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    window.addEventListener('scroll', animateSkills);
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            }
        });
    }
    
    // Load more projects
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, you would fetch more projects here
            alert('More projects would be loaded here in a real implementation!');
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log({ name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize skill bars with 0 width and then animate them
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Trigger initial animations
    animateSkills();
});

// Simple ScrollReveal implementation for vanilla JS
function ScrollReveal(options) {
    const defaults = {
        origin: 'bottom',
        distance: '20px',
        duration: 500,
        delay: 0,
        interval: 0,
        reset: false
    };
    
    const settings = Object.assign({}, defaults, options);
    const elements = document.querySelectorAll('[class*="reveal"]');
    
    function init() {
        elements.forEach((el, index) => {
            if (el.classList.contains('reveal')) {
                const delay = settings.delay + (index * settings.interval);
                animateElement(el, delay);
            }
        });
        
        if (settings.reset) {
            window.addEventListener('scroll', handleScroll);
        }
    }
    
    function animateElement(el, delay) {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = `all ${settings.duration}ms ease-out`;
        }, delay);
    }
    
    function handleScroll() {
        elements.forEach((el, index) => {
            const elTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elTop < windowHeight - 100) {
                const delay = settings.delay + (index * settings.interval);
                animateElement(el, delay);
            }
        });
    }
    
    return {
        reveal: function(selectors, customOptions) {
            const revealOptions = Object.assign({}, settings, customOptions);
            const targetElements = document.querySelectorAll(selectors);
            
            targetElements.forEach((el, index) => {
                el.style.opacity = '0';
                
                if (revealOptions.origin === 'top') {
                    el.style.transform = `translateY(-${revealOptions.distance})`;
                } else if (revealOptions.origin === 'bottom') {
                    el.style.transform = `translateY(${revealOptions.distance})`;
                } else if (revealOptions.origin === 'left') {
                    el.style.transform = `translateX(-${revealOptions.distance})`;
                } else if (revealOptions.origin === 'right') {
                    el.style.transform = `translateX(${revealOptions.distance})`;
                }
                
                const delay = revealOptions.delay + (index * revealOptions.interval);
                
                if (revealOptions.reset) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setTimeout(() => {
                                    entry.target.style.opacity = '1';
                                    entry.target.style.transform = 'translate(0)';
                                    entry.target.style.transition = `all ${revealOptions.duration}ms ease-out`;
                                }, delay);
                            } else if (revealOptions.reset) {
                                entry.target.style.opacity = '0';
                                if (revealOptions.origin === 'top') {
                                    entry.target.style.transform = `translateY(-${revealOptions.distance})`;
                                } else if (revealOptions.origin === 'bottom') {
                                    entry.target.style.transform = `translateY(${revealOptions.distance})`;
                                }
                            }
                        });
                    });
                    
                    observer.observe(el);
                } else {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translate(0)';
                        el.style.transition = `all ${revealOptions.duration}ms ease-out`;
                    }, delay);
                }
            });
        }
    };
}