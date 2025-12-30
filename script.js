// Portfolio JavaScript - Ines Ben Jemaa
document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenu.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !mobileMenu.contains(e.target)) {
            navList.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== ACTIVE NAVIGATION ==========
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial call and scroll listener
    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);
    
    // ========== TYPEWRITER EFFECT ==========
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words') || '["Cybersecurity Engineer"]');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function typeWriter() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(typeWriter, 1500);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeWriter, 500);
            } else {
                const speed = isDeleting ? 50 : 100;
                setTimeout(typeWriter, isEnd ? speed / 2 : speed);
            }
        }
        
        // Start typewriter after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // ========== SKILLS TABS ==========
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Animate skill bars when switching to their tab
            if (tabId === 'development' || tabId === 'security' || tabId === 'cloud') {
                animateSkillBars();
            }
        });
    });
    
    // ========== ANIMATE SKILL BARS ==========
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Animate skill bars on page load
    setTimeout(animateSkillBars, 500);
    
    // ========== PROJECTS FILTER ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========== PROJECT MODALS ==========
    const projectViewButtons = document.querySelectorAll('.project-view');
    const modalsContainer = document.getElementById('modals-container');
    
    // Project data
    const projectsData = {
        1: {
            title: "Automated SOAR System",
            category: "Cybersecurity • Automation",
            description: "Complete Security Orchestration, Automation and Response (SOAR) system integrating multiple security tools for automated threat detection and response. The system enriches alerts with threat intelligence and automates response actions.",
            details: "This system integrates FortiGate for network security, Wazuh for SIEM capabilities, n8n for workflow automation, and VirusTotal for threat intelligence. It automatically triages alerts, enriches them with contextual information, and executes predefined response playbooks.",
            technologies: ["Python", "Docker", "Wazuh", "TheHive", "n8n", "VirusTotal API", "REST APIs"],
            features: [
                "Real-time threat detection and alerting",
                "Automated threat intelligence enrichment",
                "Custom response playbooks",
                "Incident tracking and reporting",
                "Integration with multiple security tools"
            ],
            github: "#",
            demo: "#"
        },
        2: {
            title: "SOC Automation Platform",
            category: "Cybersecurity",
            description: "Complete Security Operations Center (SOC) automation platform with Wazuh, TheHive, and Cortex for centralized log management, threat detection, and incident response.",
            details: "This platform provides a centralized view of security events across the organization. It includes log collection, correlation, alerting, and incident management capabilities with automated workflows.",
            technologies: ["Wazuh", "TheHive", "Cortex", "ELK Stack", "Python", "Docker"],
            features: [
                "Centralized log management",
                "Real-time threat detection",
                "Incident management system",
                "Automated alert triage",
                "Comprehensive reporting"
            ],
            github: "#",
            demo: null
        },
        3: {
            title: "Phishing Detection ML Pipeline",
            category: "Cybersecurity • Machine Learning",
            description: "Machine learning pipeline for detecting phishing websites using HTML content analysis and feature extraction with multiple classification models.",
            details: "This system analyzes website HTML content to extract features related to phishing indicators. Multiple ML models are trained and evaluated to achieve optimal detection rates.",
            technologies: ["Python", "Scikit-learn", "Pandas", "BeautifulSoup", "Flask", "NumPy"],
            features: [
                "HTML feature extraction",
                "Multiple ML models comparison",
                "Real-time classification",
                "API endpoint for integration",
                "Model performance monitoring"
            ],
            github: "#",
            demo: null
        },
        4: {
            title: "Vulnerability Orchestration App (VOC)",
            category: "Automation • AI",
            description: "AI-powered vulnerability management application using local LLM (OLLAMA) for automated vulnerability assessment and prioritization.",
            details: "This application integrates with vulnerability scanners and uses AI to analyze and prioritize vulnerabilities based on contextual risk factors.",
            technologies: ["Python", "FastAPI", "OLLAMA", "React", "Docker", "PostgreSQL"],
            features: [
                "Local AI processing",
                "Automated vulnerability assessment",
                "Risk-based prioritization",
                "Integration with scanners",
                "Dashboard and reporting"
            ],
            github: "#",
            demo: null
        },
        5: {
            title: "Secure AWS Cloud Architecture",
            category: "Cloud Security",
            description: "Enterprise-grade AWS cloud architecture designed for SMEs with security best practices, compliance, and cost optimization.",
            details: "This architecture implements security by design principles with multiple layers of protection, monitoring, and compliance controls.",
            technologies: ["AWS", "Terraform", "CloudFormation", "WAF", "CloudTrail", "CloudWatch"],
            features: [
                "Multi-account structure",
                "Network segmentation",
                "Centralized logging",
                "Automated compliance checks",
                "Cost optimization"
            ],
            github: null,
            demo: null
        },
        6: {
            title: "ISO 27001 Compliance Solution",
            category: "Cybersecurity • Compliance",
            description: "Open-source solution for achieving and maintaining ISO 27001 compliance with automated controls monitoring and reporting.",
            details: "This solution provides continuous monitoring of security controls required by ISO 27001 with automated evidence collection and reporting.",
            technologies: ["Wazuh", "Suricata", "OpenSCAP", "Linux", "Bash", "Python"],
            features: [
                "Automated compliance scanning",
                "Control monitoring",
                "Evidence collection",
                "Reporting dashboard",
                "Remediation tracking"
            ],
            github: null,
            demo: null
        }
    };
    
    projectViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = button.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });
    
    function showProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;
        
        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h3>${project.title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-category">${project.category}</div>
                        <div class="modal-description">
                            <h4>Description</h4>
                            <p>${project.description}</p>
                        </div>
                        <div class="modal-details">
                            <h4>Details</h4>
                            <p>${project.details}</p>
                        </div>
                        <div class="modal-features">
                            <h4>Key Features</h4>
                            <ul>
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-technologies">
                            <h4>Technologies</h4>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> View Code</a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        modalsContainer.innerHTML = modalHTML;
        document.body.classList.add('modal-open');
        
        // Add event listeners for modal
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalClose = document.querySelector('.modal-close');
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        
        modalClose.addEventListener('click', closeModal);
        
        // Close modal with Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
    
    function closeModal() {
        document.querySelector('.modal-overlay')?.remove();
        document.body.classList.remove('modal-open');
    }
    
    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real implementation, you would send the form data to a server
                // For now, we'll just show a success message
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== LAZY LOADING FOR IMAGES ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    // ========== PARALLAX EFFECT ==========
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // ========== THEME TOGGLE (FOR FUTURE USE) ==========
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // ========== FORM INPUT ANIMATIONS ==========
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check
    animateOnScroll();
    
    // ========== CV DOWNLOAD ==========
    window.downloadCV = function() {
        showNotification('Preparing your download...', 'info');
        
        // In a real implementation, this would trigger a file download
        // For now, we'll simulate it
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'cv/ines-ben-jemaa-cv.pdf'; // Update this path
            link.download = 'Ines-Ben-Jemaa-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('CV download started!', 'success');
        }, 1000);
    };
    
    // ========== INITIALIZE EVERYTHING ==========
    console.log('Portfolio loaded successfully! 🚀');
});

// Add CSS for new components
const style = document.createElement('style');
style.textContent = `
    /* Modal Styles */
    .modal-open {
        overflow: hidden;
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal {
        background-color: white;
        border-radius: var(--border-radius);
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease-out;
    }
    
    .modal-header {
        padding: 25px 30px;
        border-bottom: 1px solid var(--gray-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 1;
    }
    
    .modal-header h3 {
        font-size: 1.8rem;
        color: var(--primary-color);
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--gray-color);
        cursor: pointer;
        line-height: 1;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        background-color: var(--gray-light);
        color: var(--danger-color);
    }
    
    .modal-body {
        padding: 30px;
    }
    
    .modal-category {
        color: var(--accent-color);
        font-weight: 600;
        margin-bottom: 20px;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .modal-body h4 {
        font-size: 1.2rem;
        color: var(--primary-color);
        margin: 25px 0 15px;
    }
    
    .modal-body h4:first-child {
        margin-top: 0;
    }
    
    .modal-body p {
        color: var(--gray-color);
        line-height: 1.7;
        margin-bottom: 15px;
    }
    
    .modal-features ul {
        list-style: none;
        margin-bottom: 20px;
    }
    
    .modal-features li {
        color: var(--gray-color);
        margin-bottom: 10px;
        padding-left: 20px;
        position: relative;
    }
    
    .modal-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-color);
        font-weight: bold;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
    }
    
    .tech-tags span {
        font-size: 0.85rem;
        padding: 6px 12px;
        background-color: rgba(0, 180, 216, 0.1);
        color: var(--accent-color);
        border-radius: 20px;
    }
    
    .modal-footer {
        padding: 20px 30px;
        border-top: 1px solid var(--gray-light);
        display: flex;
        gap: 15px;
        justify-content: flex-end;
    }
    
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 30px;
        right: 30px;
        background-color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow-hover);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        max-width: 400px;
        transform: translateX(150%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 3000;
        border-left: 4px solid var(--accent-color);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: var(--success-color);
    }
    
    .notification-error {
        border-left-color: var(--danger-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
    
    .notification-success .notification-content i {
        color: var(--success-color);
    }
    
    .notification-error .notification-content i {
        color: var(--danger-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--gray-color);
        cursor: pointer;
        line-height: 1;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .notification-close:hover {
        background-color: var(--gray-light);
        color: var(--danger-color);
    }
    
    /* Theme Toggle */
    .theme-toggle {
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--accent-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .theme-toggle:hover {
        background-color: var(--secondary-color);
        transform: translateY(-3px) rotate(15deg);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    
    /* Dark Theme */
    .dark-theme {
        --primary-color: #121212;
        --secondary-color: #1e3a5f;
        --light-color: #1e1e1e;
        --dark-color: #0a0a0a;
        --gray-light: #2d2d2d;
        color: #e0e0e0;
        background-color: #121212;
    }
    
    .dark-theme .skill-category,
    .dark-theme .experience-item,
    .dark-theme .project-card,
    .dark-theme .info-card,
    .dark-theme .download-card,
    .dark-theme .skills-tabs,
    .dark-theme .contact-form,
    .dark-theme .modal,
    .dark-theme .notification {
        background-color: #1e1e1e;
        border-color: #2d2d2d;
        color: #e0e0e0;
    }
    
    .dark-theme h1,
    .dark-theme h2,
    .dark-theme h3,
    .dark-theme h4,
    .dark-theme h5,
    .dark-theme h6 {
        color: #ffffff;
    }
    
    .dark-theme p,
    .dark-theme .timeline-description,
    .dark-theme .project-description {
        color: #b0b0b0;
    }
    
    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Responsive Modal */
    @media (max-width: 768px) {
        .modal {
            max-height: 80vh;
        }
        
        .modal-header {
            padding: 20px;
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .modal-footer {
            padding: 15px 20px;
            flex-direction: column;
        }
        
        .modal-footer .btn {
            width: 100%;
        }
        
        .notification {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }
    
    /* Form Focus States */
    .form-group.focused label {
        color: var(--accent-color);
        transform: translateY(-5px);
        font-size: 0.85rem;
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: var(--accent-color);
    }
    
    /* Animate on Scroll */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

// Service Worker Registration (Optional - for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => {
                console.log('ServiceWorker registration successful');
            },
            err => {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}
