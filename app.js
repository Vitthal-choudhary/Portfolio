// Batman Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initTypingAnimation();
    initParticles();
    initScrollAnimations();
    initProjectModals();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');

    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');

        // Remove from DOM after fade out
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            scrollToSection(targetId);

            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollToSection('#about');
        });
    }
}

// Scroll to section function - Fixed implementation
function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const navbarHeight = 70;
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active nav link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'Hackathon Winner',
        'Full-Stack Developer',
        'Gen-AI Enthusiast',
        'Cybersecurity Specialist',
        'Machine Learning Engineer',
        'Data Scientist'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(typeText, typeSpeed);
    }

    if (typingElement) {
        typeText();
    }
}

// Particle animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';

    // Random animation duration
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

    container.appendChild(particle);
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Animate counters
                if (element.classList.contains('stat-number')) {
                    animateCounter(element);
                }

                // Add visible class for general animations
                element.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    document.querySelectorAll('.stat-number, .project-card, .achievement-card, .skill-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        element.textContent = Math.floor(current);

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Form validation
function validateForm(data) {
    return data.name && data.email && data.subject && data.message &&
           data.email.includes('@') && data.email.includes('.');
}

// Show form feedback
function showFormFeedback(type, message) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: var(--radius-base);
        font-weight: 500;
        animation: slideInFromBottom 0.3s ease-out;
    `;

    if (type === 'success') {
        feedback.style.background = 'rgba(0, 255, 0, 0.1)';
        feedback.style.color = '#00FF00';
        feedback.style.border = '1px solid rgba(0, 255, 0, 0.2)';
    } else {
        feedback.style.background = 'rgba(255, 0, 0, 0.1)';
        feedback.style.color = '#FF6B6B';
        feedback.style.border = '1px solid rgba(255, 0, 0, 0.2)';
    }

    feedback.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;

    // Insert feedback
    const contactForm = document.getElementById('contact-form');
    contactForm.appendChild(feedback);

    // Remove after 5 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 5000);
}

// Project modals - Fixed implementation
function initProjectModals() {
    // Project data
    const projects = {
        project1: {
            title: 'ReqAize - Automated Requirement Writing',
            description: 'This WebApp leverages Gen-AI to transform user Ideas into structure Business Requirement Documents, streamlining the requirement gathering process for businesses.',
            fullDescription: `
                <p>This WebApp leverages Gen-AI to transform user Ideas into structure Business Requirement Documents, streamlining the requirement gathering process for businesses. Also this WebApp has the ability to make user stories for JIRA and upload them directly to JIRA.</p>
                
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Key Features:</h4>
                <ul style="line-height: 1.8; color: var(--color-text-secondary);">
                    <li>Generate Business Requirement Documents</li>
                    <li>Authorization for users on different level</li>
                    <li>Generate User stories for JIRA and upload them directly</li>
                    <li>User can access the Jira portal directly from the webapp</li>
                </ul>
                
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Technical Implementation:</h4>
                <p style="color: var(--color-text-secondary); line-height: 1.8;">The WebApp uses NextJs and llm powered by Mistral API. When the user gives a prompt it analyzes it and asks the user for further details about the idea. the model then generates a structured BRD. The users can upload the BRD to the same WebApp and it can generate user stories for JIRA, which has been connected using FastAPI, and can be accessed directly from there.</p>
            `,
            tech: ['Next.js', 'Generative AI', 'TypeScript', 'Tailwind CSS', 'OAuth', 'JIRA API', 'Firebase'],
            status: 'Live',
            github: 'https://github.com/Vitthal-choudhary/ReqAize-Website',
            demo: 'https://reqai-website-de.vercel.app/'
        },
        project2: {
            title: 'Batman Portfolio Website',
            description: 'A stunning, responsive personal portfolio website featuring a Batman theme with advanced animations, interactive elements, and modern web technologies.',
            fullDescription: `
                <p>This portfolio website showcases the perfect blend of creativity and technical expertise. Inspired by the Dark Knight, it features a sophisticated dark theme with golden accents and smooth animations throughout.</p>
                
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Key Features:</h4>
                <ul style="line-height: 1.8; color: var(--color-text-secondary);">
                    <li>Responsive design optimized for all devices</li>
                    <li>Smooth scroll animations and transitions</li>
                    <li>Interactive particle background effects</li>
                    <li>Dynamic typing animations</li>
                    <li>Project and achievement modal systems</li>
                    <li>Contact form with validation</li>
                    <li>SEO optimized structure</li>
                </ul>
                
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Design Philosophy:</h4>
                <p style="color: var(--color-text-secondary); line-height: 1.8;">The design combines Batman's iconic aesthetic with modern web design principles. The color palette uses deep blacks and greys with Batman gold (#FFD700) accents, creating a professional yet thematic appearance.</p>
            `,
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'CSS Grid', 'Flexbox'],
            status: 'Live',
            github: 'https://github.com/Vitthal-choudhary/Portfolio',
            demo: 'https://vitthal.me/'
        },
        project3: {
            title: 'Data Visualization for Lab Reports',
            description: 'A dynamic Java GUI based Application that converts lab report data from CSV files into interactive charts and graphs for enhanced analysis and presentation.',
            fullDescription: `
                <p>This Application allows users to upload lab report CSV files and instantly visualize the data as interactive charts and graphs, making analysis and presentation easier and more insightful.</p>
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Key Features:</h4>
                <ul style="line-height: 1.8; color: var(--color-text-secondary);">
                    <li>Upload inputs for Medical test</li>
                    <li>Provides interactive visuals for the data provided</li>
                    <li>All data stored securely in MySQL database</li>   
                </ul>
                
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Architecture:</h4>
                <p style="color: var(--color-text-secondary); line-height: 1.8;">The data provided by user gets stored in Database files for individual patients, the data is compared to the standard values for the particular field and results are shown to user. it uses Java, JDBC and MySQL to perform the tasks</p>
            `,
            tech: ['Java', 'JDBC', 'MySQL', 'Java Swing', 'Data Visualization'],
            status: 'Completed',
            github: 'https://github.com/Vitthal-choudhary/Data-Visualization-For-Lab-Report',
            demo: null
        },
        project4: {
            title: 'CitiVoice - AI-Powered Helpline',
            description: 'An AI-driven helpline system that utilizes natural language processing to assist users with inquiries and support, enhancing customer service efficiency.',
            fullDescription: `
                <p>CitiVoice, an innovative 24/7 AI-powered voice assistant developed with Flutter. Designed to assist citizens with health-related queries, legal advice, and grievance filing, CitiVoice seamlessly integrates across multiple domains, ensuring users receive accurate information and efficient support at their fingertips.</p>
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Key Features:</h4>
                <ul style="line-height: 1.8; color: var(--color-text-secondary);">
                    <li>AI Voice Assistant for Health, legal, government, grievance services</li>
                    <li>IOT Healthcare Integration for temperature, SpO2 and heart rate.</li>
                    <li>Real Time Monitoring of user data and reports track</li>
                    <li>Instant Appointments fixing</li>   
                    <li>Personalized Tips by AI</li>
                    <li>Emergency Assistance</li>   
                </ul>
                
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Architecture:</h4>
                <p style="color: var(--color-text-secondary); line-height: 1.8;">
                Flutter mobile app connects to GenAI based LLM via APIs, integrates IoT health sensors (ESP32), and uses Maps API for location services.    
                </p>
            `,
            tech: ['Flutter', 'Dart', 'GenAI', 'IoT', 'ESP 32', 'Maps API'],
            status: 'Completed',
            github: 'https://github.com/sureshpk36/CitiVoice-AICitizenHelpline',
            demo: null
        },
        project5: {
            title: 'BioSync',
            description: 'A health monitoring app that syncs with IOT devices to track vital signs and provide real-time health insights and alerts.',
            fullDescription: `
                <p> </p>
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Key Features:</h4>
                <ul style="line-height: 1.8; color: var(--color-text-secondary);">
                    <li>ESP-32 for vital data collection</li>  
                    <li>Raspberry-PI for computing</li>  
                    <li>Machine Learning Model hosted</li>
                    <li>Web and app interface</li>
                </ul>
                
                <h4 style="color: #FFD700; margin: 1.5rem 0 1rem 0;">Architecture:</h4>
                <p style="color: var(--color-text-secondary); line-height: 1.8;">
                Kotlin based Android app connects to Flask backend via REST APIs, integrates IoT health sensors (ESP32) for real-time data collection and sends it through RaspberryPi, and uses TensorFlow Lite for on-device health predictions.
                </p>
            `,
            tech: ['Kotlin', 'Flask', 'IoT', 'ESP 32', 'Raspberry Pi', 'TensorFlow Lite'],
            status: 'Completed',
            github: 'https://github.com/Vitthal-choudhary/BioSync-Android-App',
            demo: null
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    // Make functions global and ensure they work
    window.openProjectModal = function(projectId) {
        console.log('Opening project modal for:', projectId); // Debug log
        const project = projects[projectId];
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }
        if (!modal) {
            console.error('Modal element not found');
            return;
        }
        if (!modalBody) {
            console.error('Modal body element not found');
            return;
        }

        modalBody.innerHTML = `
            <h2 style="color: #FFD700; font-family: 'Orbitron', monospace; margin-bottom: 1rem;">${project.title}</h2>
            <div style="margin-bottom: 1.5rem;">
                <span class="project-status status-${project.status.toLowerCase().replace(' ', '-')}" style="margin-bottom: 1rem; display: inline-block;">${project.status}</span>
            </div>
            <div style="color: var(--color-text-secondary); line-height: 1.8;">
                ${project.fullDescription}
            </div>
            <div style="margin: 2rem 0;">
                <h4 style="color: #FFD700; margin-bottom: 1rem;">Technologies Used:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                <a href="${project.github}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> View Code</a>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Focus trap for accessibility
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    };

    window.closeProjectModal = function() {
        console.log('Closing project modal'); // Debug log
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // Close modal when clicking overlay
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', window.closeProjectModal);
        }
    }
}

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;

// Add button click effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');

        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #FFD700, #FFA500);
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        document.title = 'Mr. Choudhary';
    } else {
        document.title = 'Come back, Gotham needs you! 🦇';
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.length === konamiSequence.length &&
        konamiCode.every((code, index) => code === konamiSequence[index])) {

        // Easter egg activated!
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';

        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #FFD700;
            padding: 2rem;
            border-radius: 10px;
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            text-align: center;
            z-index: 10000;
            animation: slideInFromBottom 0.5s ease-out;
        `;
        message.innerHTML = `
            🦇 BATMAN MODE ACTIVATED 🦇<br>
            <small>You found the secret! Press ESC to return to normal.</small>
        `;
        document.body.appendChild(message);

        const resetEasterEgg = (e) => {
            if (e.key === 'Escape') {
                document.body.style.filter = 'none';
                message.remove();
                document.removeEventListener('keydown', resetEasterEgg);
                konamiCode = [];
            }
        };

        document.addEventListener('keydown', resetEasterEgg);

        setTimeout(() => {
            if (message.parentNode) {
                document.body.style.filter = 'none';
                message.remove();
                konamiCode = [];
            }
        }, 5000);
    }
});

// Skills section hover effects
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect to neighboring cards
            skillCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            // Remove glow effect
            skillCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
});

// Achievement cards hover effects
// Achievement data with images
const achievementsData = [
    {
        id: 'achievement1',
        title: 'Barclays Hack-o-Hire Finalist',
        organization: 'Barclays - 2025',
        description: 'Finalist in Hack-O-Hire hackathon by Barclays India and earned internship opportunity',
        type: 'hackathon',
        images: [
            'Public/Barclays-1.jpg',
            'Public/Barclays-2.jpg',
            'Public/Barclays-3.jpg',
        ]
    },
    {
        id: 'achievement2',
        title: 'StickyBit @ HackTheBoxChennai',
        organization: 'HackTheBoxChennai Meetup',
        description: 'Active organizer and member in Hack The Box Chennai meetup',
        type: 'leadership',
        images: [
            'Public/HTB-1.jpg',
            'Public/HTB-2.jpg',
            'Public/HTB-3.jpeg',
        ]
    },
    {
        id: 'achievement3',
        title: 'Academic Performer SRM 2025',
        organization: 'SRM Institute of Science and Technology - 2023-2027',
        description: 'Awarded for outstanding academic performance in the Computer Science program',
        type: 'appreciation',
        images: [
            'Public/Medal-1.jpeg',
            'Public/Medal-2.jpeg',
            'Public/Medal-1.jpeg'
        ]
    },
    {
        id: 'achievement4',
        title: 'Ultron 8.0 Hackathon Winner',
        organization: 'Organized by Futurix Club SRM in 2025',
        description: 'First Hackathon win for developing an innovative solution using IOT powered health monitoring system and ML model',
        type: 'hackathon',
        images: [
            'Public/Ultron1.png',
            'Public/Ultron2.png',
            'Public/Ultron3.png'
        ]
    },
    {
        id: 'achievement5',
        title: 'Ignite 25 Hackathon Winner',
        organization: 'Organized by SRM Easwari College in 2025',
        description: 'Hackathon won for developing CitiVoice, an AI-powered citizen helpline app using Flutter and GenAI',
        type: 'hackathon',
        images: [
            'Public/ignite-1.jpeg',
            'Public/ignite-2.jpeg',
            'Public/ignite-3.jpeg'
        ]
    },
    {
        id: 'achievement6',
        title: 'HackNova 2025 Runner-Up',
        organization: 'Adeptus Club SRM Easwari College - 2025',
        description: 'Final Runner up in HackNova 25 hackathon by Adeptus Club SRM Easwari College',
        type: 'hackathon',
        images: [
            'Public/adeptus1.jpeg',
            'Public/adeptus2.jpeg',
            'Public/adeptus3.jpeg',
        ]
    },
];

// Initialize Infinite Achievement Slider (Lun Dev Style)
function initInfiniteAchievementSlider() {
    const list = document.getElementById('achievements-list');
    if (!list) return;

    // Create achievement items with position variables
    achievementsData.forEach((achievement, index) => {
        const item = createAchievementItem(achievement, index + 1);
        list.appendChild(item);
    });
}

// Create individual achievement item
function createAchievementItem(achievement, position) {
    const item = document.createElement('div');
    item.className = 'achievement-item';
    item.style.setProperty('--position', position);
    item.setAttribute('data-achievement-id', achievement.id);

    // Create image container with auto-scrolling images
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    const imageScroll = document.createElement('div');
    imageScroll.className = 'image-scroll';

    // Add images to scroll container
    achievement.images.forEach(imageSrc => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.style.backgroundImage = `url(${imageSrc})`;
        imageScroll.appendChild(imageItem);
    });

    imageContainer.appendChild(imageScroll);

    // Create content container
    const content = document.createElement('div');
    content.className = 'content';

    content.innerHTML = `
        <div>
            <h3 class="title">${achievement.title}</h3>
            <div class="organization">${achievement.organization}</div>
            <p class="description">${achievement.description}</p>
        </div>
        <span class="type type-${achievement.type}">${achievement.type}</span>
    `;

    item.appendChild(imageContainer);
    item.appendChild(content);

    return item;
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initTypingAnimation();
    initParticles();
    initScrollAnimations();
    initProjectModals();
    initInfiniteAchievementSlider();
});

// MOBILE RESPONSIVENESS ENHANCEMENTS - JavaScript
// Add this to your existing app.js or create as mobile-enhancements.js

// ========================================
// MOBILE DETECTION AND RESPONSIVE UTILITIES
// ========================================

class MobileResponsiveManager {
    constructor() {
        this.init();
        this.bindEvents();
    }

    init() {
        this.isMobile = this.detectMobile();
        this.isTablet = this.detectTablet();
        this.orientation = this.getOrientation();

        // Add mobile class to body
        if (this.isMobile) {
            document.body.classList.add('is-mobile');
        }

        if (this.isTablet) {
            document.body.classList.add('is-tablet');
        }

        // Set initial viewport height for mobile browsers
        this.setViewportHeight();
    }

    detectMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth <= 768;
    }

    detectTablet() {
        return /iPad|Android/i.test(navigator.userAgent) &&
            window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    getOrientation() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }

    setViewportHeight() {
        // Fix viewport height issues on mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    bindEvents() {
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });

        // Handle resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle touch events for mobile
        if (this.isMobile) {
            this.initTouchEvents();
        }
    }

    handleOrientationChange() {
        this.orientation = this.getOrientation();
        this.setViewportHeight();

        // Add orientation class to body
        document.body.classList.remove('portrait', 'landscape');
        document.body.classList.add(this.orientation);

        // Trigger custom event
        window.dispatchEvent(new CustomEvent('mobileOrientationChange', {
            detail: { orientation: this.orientation }
        }));
    }

    handleResize() {
        this.setViewportHeight();
        this.isMobile = this.detectMobile();
        this.isTablet = this.detectTablet();

        // Update body classes
        document.body.classList.toggle('is-mobile', this.isMobile);
        document.body.classList.toggle('is-tablet', this.isTablet);
    }

    initTouchEvents() {
        // Add touch class to body
        document.body.classList.add('touch-device');

        // Improve touch scrolling
        document.body.style.webkitOverflowScrolling = 'touch';

        // Handle touch feedback for buttons
        const touchElements = document.querySelectorAll('.btn, .nav-link, .social-link');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });

            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            });
        });
    }
}

// ========================================
// ENHANCED MOBILE NAVIGATION
// ========================================

class MobileNavigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;

        this.bindEvents();
        this.setupAccessibility();
    }

    bindEvents() {
        // Hamburger click
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.closeMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Close menu on orientation change
        window.addEventListener('mobileOrientationChange', () => {
            if (this.isOpen) {
                this.closeMenu();
            }
        });
    }

    setupAccessibility() {
        // Add ARIA attributes
        this.hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.navMenu.setAttribute('aria-hidden', 'true');
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        document.body.classList.add('nav-open');

        // Update ARIA attributes
        this.hamburger.setAttribute('aria-expanded', 'true');
        this.navMenu.setAttribute('aria-hidden', 'false');

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';

        // Focus first nav item
        const firstNavLink = this.navLinks[0];
        if (firstNavLink) {
            setTimeout(() => firstNavLink.focus(), 100);
        }
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');

        // Update ARIA attributes
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.navMenu.setAttribute('aria-hidden', 'true');

        // Restore body scrolling
        document.body.style.overflow = '';

        // Return focus to hamburger
        this.hamburger.focus();
    }
}

// ========================================
// MOBILE FORM ENHANCEMENTS
// ========================================

class MobileFormManager {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.inputs = document.querySelectorAll('input, textarea, select');

        this.init();
    }

    init() {
        this.setupInputEnhancements();
        this.handleFormValidation();
    }

    setupInputEnhancements() {
        this.inputs.forEach(input => {
            // Prevent zoom on iOS when focusing inputs
            if (input.type !== 'file') {
                input.addEventListener('focus', () => {
                    if (window.innerWidth <= 768) {
                        // Ensure font-size is at least 16px to prevent zoom
                        const computedStyle = window.getComputedStyle(input);
                        const fontSize = parseInt(computedStyle.fontSize);
                        if (fontSize < 16) {
                            input.style.fontSize = '16px';
                        }
                    }
                });
            }

            // Enhanced touch feedback for form elements
            input.addEventListener('touchstart', () => {
                input.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });
        });
    }

    handleFormValidation() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const isValid = this.validateForm(form);
                if (!isValid) {
                    e.preventDefault();
                    this.showValidationErrors(form);
                }
            });
        });
    }

    validateForm(form) {
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    showValidationErrors(form) {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// ========================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// ========================================

class MobilePerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
        this.handleSlowConnections();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    optimizeAnimations() {
        // Reduce motion for users who prefer it
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
        }

        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            const animations = document.querySelectorAll('.floating, .glitch, .pulse');

            if (document.hidden) {
                animations.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animations.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }

    handleSlowConnections() {
        // Check for slow connections
        if ('connection' in navigator) {
            const connection = navigator.connection;

            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.body.classList.add('slow-connection');

                // Disable non-essential animations
                const particles = document.querySelector('.particles');
                if (particles) {
                    particles.style.display = 'none';
                }

                // Reduce image quality
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    if (img.src.includes('large')) {
                        img.src = img.src.replace('large', 'medium');
                    }
                });
            }
        }
    }
}

// ========================================
// MOBILE SMOOTH SCROLLING
// ========================================

class MobileSmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 80; // Account for fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all mobile enhancements
    const mobileManager = new MobileResponsiveManager();
    const mobileNav = new MobileNavigation();
    const mobileForm = new MobileFormManager();
    const mobilePerformance = new MobilePerformanceOptimizer();
    const mobileSmoothScroll = new MobileSmoothScroll();

    // Debug info for development
    if (process.env.NODE_ENV === 'development') {
        console.log('Mobile Responsive Manager initialized');
        console.log('Is Mobile:', mobileManager.isMobile);
        console.log('Is Tablet:', mobileManager.isTablet);
        console.log('Orientation:', mobileManager.orientation);
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileResponsiveManager,
        MobileNavigation,
        MobileFormManager,
        MobilePerformanceOptimizer,
        MobileSmoothScroll
    };
}
