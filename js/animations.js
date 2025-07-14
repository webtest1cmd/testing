(function() {
    'use strict';
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        console.log('User prefers reduced motion, animations minimized');
        return; // Exit and don't initialize animations
    }
    
    // Wait for document to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all animation libraries
        // initTypeIt(); - Removed TypeIt initialization
        initAOS();
        initRoughNotation();
        initAnimeJS();
        initScrollReveal();
        initFaqAccordion(); // Initialize the FAQ accordion
        checkAboutSectionPadding(); // Add check for About section padding
    });
    
    // TypeIt.js function removed
    
    // 2. AOS.js for element animations
    function initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: window.innerWidth < 768 ? true : false
        });
    }
    
    // 3. Rough Notation for highlighting key terms
    function initRoughNotation() {
        // Wait a bit to ensure elements are visible
        setTimeout(() => {
            const annotationElements = document.querySelectorAll('.highlight-text');
            if (!annotationElements.length) return;
            
            // Check if device is mobile
            const isMobile = window.innerWidth < 640;
            
            const annotations = Array.from(annotationElements).map(el => {
                // Get notation type and color from data attributes
                const notationType = el.dataset.notationType || 'highlight';
                const notationColor = el.dataset.notationColor || '#f721d3';
                
                // Adjust settings based on device type
                return RoughNotation.annotate(el, {
                    type: notationType,
                    color: notationColor,
                    animationDuration: isMobile ? 600 : 800, // Faster animation on mobile
                    padding: isMobile ? 1 : 3, // Reduced padding on mobile
                    strokeWidth: isMobile ? 2 : 3, // Thinner lines on mobile
                    iterations: isMobile ? 1 : 2 // Fewer iterations on mobile for cleaner look
                });
            });
            
            // Show annotations when they enter viewport with adjusted threshold for mobile
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Array.from(annotationElements).indexOf(entry.target);
                        if (index !== -1) annotations[index].show();
                    }
                });
            }, { 
                threshold: isMobile ? 0.3 : 0.5, // Lower threshold on mobile to trigger earlier
                rootMargin: isMobile ? '0px 0px -10% 0px' : '0px' // Adjust viewing area on mobile
            });
            
            annotationElements.forEach(el => observer.observe(el));
            
            // Handle resize events for responsive behavior
            window.addEventListener('resize', () => {
                const newIsMobile = window.innerWidth < 640;
                if (newIsMobile !== isMobile) {
                    // If screen size category changes, reload to reinitialize annotations
                    location.reload();
                }
            });
        }, isMobile ? 800 : 1000); // Shorter delay on mobile devices
    }
    
    // 4. Anime.js for hover effects
    function initAnimeJS() {
        // Button hover effects
        const buttons = document.querySelectorAll('.section-btn, .appointment-btn a');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            btn.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
        
        // Doctor card hover effects
        const doctorCards = document.querySelectorAll('.team-thumb');
        doctorCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    translateY: -10,
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    translateY: 0,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
        
        // Social icon hover effects
        const socialIcons = document.querySelectorAll('.social-icon li a');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.2,
                    rotate: '5deg',
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            icon.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    rotate: '0deg',
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
        
        // FAQ accordion animation
        const faqItems = document.querySelectorAll('.faq-item .faq-title');
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isOpen = this.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.nextElementSibling;
                        anime({
                            targets: otherContent,
                            height: 0,
                            opacity: 0,
                            duration: 300,
                            easing: 'easeOutQuad',
                            complete: function() {
                                otherContent.classList.remove('active');
                            }
                        });
                    }
                });
                
                // Toggle current FAQ item
                anime({
                    targets: content,
                    height: isOpen ? 0 : content.scrollHeight,
                    opacity: isOpen ? 0 : 1,
                    duration: 300,
                    easing: 'easeOutQuad',
                    complete: function() {
                        if (!isOpen) {
                            content.style.height = 'auto';
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    }
                });
                
                this.classList.toggle('active');
            });
        });
        
        // Form focus animations
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                anime({
                    targets: this,
                    scale: 1.02,
                    borderColor: '#f721d3',
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
            
            input.addEventListener('blur', function() {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
    
    // 5. ScrollReveal for scroll-triggered animations
    function initScrollReveal() {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            delay: 200,
            easing: 'ease-in-out',
            reset: false
        });
        
        // Apply to different sections with varied settings
        sr.reveal('.section-title', { delay: 100 });
        sr.reveal('.about-info', { origin: 'left' });
        sr.reveal('.team-thumb', { interval: 200 });
        sr.reveal('.news-thumb', { interval: 200 });
        sr.reveal('.appointment-form', { origin: 'right' });
        sr.reveal('.contact-info', { delay: 300 });
        sr.reveal('.footer-thumb', { interval: 100 });
        
        // Custom animations for specific elements
        sr.reveal('.phone-icon, .date-icon, .email-icon', {
            origin: 'top',
            distance: '20px',
            interval: 100
        });
        
        sr.reveal('.navbar-brand', {
            origin: 'left',
            distance: '50px',
            delay: 300
        });
    }
    
    // 6. FAQ Accordion functionality
    function initFaqAccordion() {
        console.log('Initializing FAQ accordion');
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (!faqItems.length) {
            console.warn('⚠️ No FAQ items found with class .faq-item');
            return;
        }
        
        console.log('Found', faqTitles.length, 'FAQ items');
        
        // Remove any existing event listeners (in case of duplicate initialization)
        faqTitles.forEach(title => {
            // Clone and replace to remove existing listeners
            const newTitle = title.cloneNode(true);
            title.parentNode.replaceChild(newTitle, title);
        });
        
        // Get fresh references after cloning
        const freshFaqTitles = document.querySelectorAll('.faq-title');
        
        // Initialize all FAQ contents to height 0
        document.querySelectorAll('.faq-content').forEach(content => {
            content.style.height = '0';
            content.classList.remove('active');
        });
        
        // Add click handlers to each FAQ title
        faqItems.forEach((item, index) => {
            const title = item.querySelector('.faq-title');
            const content = item.querySelector('.faq-content');
            
            if (!title || !content) {
                console.error('❌ Missing title or content element in FAQ item', index);
                return;
            }
            
            // Remove existing click listeners if any
            const newTitle = title.cloneNode(true);
            title.parentNode.replaceChild(newTitle, title);
            
            // Add click event with debugging
            newTitle.addEventListener('click', function(e) {
                console.log(`FAQ #${index + 1} clicked:`, this.textContent.trim());
                e.preventDefault();
                e.stopPropagation(); // Stop event bubbling
                
                // Toggle active class on the title
                this.classList.toggle('active');
                
                // Toggle the content visibility with forced reflow
                if (this.classList.contains('active')) {
                    // Force a reflow before setting height
                    void content.offsetWidth;
                    content.classList.add('active');
                    content.style.height = content.scrollHeight + 'px';
                    console.log('Opening FAQ, height:', content.scrollHeight);
                } else {
                    content.style.height = '0';
                    setTimeout(() => {
                        content.classList.remove('active');
                    }, 300); // Match the transition time
                    console.log('Closing FAQ');
                }
                
                // Close other FAQs
                faqItems.forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index) {
                        const otherTitle = otherItem.querySelector('.faq-title');
                        const otherContent = otherItem.querySelector('.faq-content');
                        
                        if (otherTitle && otherContent && otherTitle.classList.contains('active')) {
                            otherTitle.classList.remove('active');
                            otherContent.style.height = '0';
                            setTimeout(() => {
                                otherContent.classList.remove('active');
                            }, 300);
                        }
                    }
                });
            });
        });
        
        // Make the first FAQ item open by default on desktop
        if (window.innerWidth > 768 && faqItems.length > 0) {
            setTimeout(() => {
                const firstTitle = faqItems[0].querySelector('.faq-title');
                if (firstTitle) {
                    firstTitle.click();
                    console.log('Auto-opening first FAQ item');
                }
            }, 500);
        }
        
        // Add window resize handler for responsive behavior
        window.addEventListener('resize', () => {
            document.querySelectorAll('.faq-content.active').forEach(content => {
                content.style.height = content.scrollHeight + 'px';
            });
        });
        
        console.log('✅ FAQ accordion initialization complete');
    }
    
    // Additional utility functions
    function addPulseEffect(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            setInterval(() => {
                anime({
                    targets: el,
                    scale: [1, 1.05, 1],
                    duration: 2000,
                    easing: 'easeInOutSine'
                });
            }, 5000);
        });
    }
    
    // Add pulse effect to important CTAs
    setTimeout(() => {
        addPulseEffect('.appointment-btn a');
    }, 3000);
    
    // New function to check and fix About section padding
    function checkAboutSectionPadding() {
        console.log('Checking About section padding');
        const aboutInfoElements = document.querySelectorAll('.about-info');
        
        if (!aboutInfoElements.length) {
            console.warn('⚠️ No About info elements found with class .about-info');
            return;
        }
        
        aboutInfoElements.forEach((element, index) => {
            // Check if element has inline style for padding
            if (element.style.padding) {
                console.log(`Found inline padding style on About info element #${index + 1}:`, element.style.padding);
                
                // Remove the inline style to allow CSS to take effect
                element.style.padding = '';
                console.log(`Removed inline padding style from About info element #${index + 1} to use CSS default`);
            }
            
            // Ensure the element has the correct padding from CSS
            const computedStyle = window.getComputedStyle(element);
            const currentPadding = computedStyle.padding;
            
            console.log(`About info element #${index + 1} padding is now:`, currentPadding);
            
            // If padding is still not 50px, force it
            if (currentPadding !== '50px' && !currentPadding.includes('50px')) {
                element.style.padding = '50px';
                console.log(`Fixed padding for About info element #${index + 1} to 50px`);
            }
        });
        
        console.log('✅ About section padding check complete');
    }
})();