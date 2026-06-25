   /* ==================== 1. LOADER ==================== */
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 1200); // Slight delay to show off the cool loader
        });

        /* ==================== 2. CUSTOM CURSOR ==================== */
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const interactives = document.querySelectorAll('.interactive-element, a, button, input, textarea');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding slight delay for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        /* ==================== 3. THEME TOGGLE ==================== */
        const themeBtn = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            
            // Change Icon
            themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        });

        /* ==================== 4. MOBILE MENU ==================== */
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links li a');

        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        /* ==================== 5. SCROLL EVENTS (Navbar, Progress, Active Link) ==================== */
        const header = document.getElementById('header');
        const scrollProgress = document.getElementById('scroll-progress');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            // Navbar blur effect
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Scroll Progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";

            // Active Nav Link
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(li => {
                li.classList.remove('active');
                if (li.getAttribute('href') === `#${current}`) {
                    li.classList.add('active');
                }
            });
        });

        /* ==================== 6. TYPING ANIMATION ==================== */
        const typedTextSpan = document.querySelector(".typed-text");
        const textArray = ["Web Developer", "UI/UX Designer", "Creative Thinker", "Freelancer"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        document.addEventListener("DOMContentLoaded", function() {
            if(textArray.length) setTimeout(type, newTextDelay + 250);
        });

        /* ==================== 7. INTERSECTION OBSERVER (Scroll Reveal & Skills) ==================== */
        const revealElements = document.querySelectorAll('.reveal');
        const progressSpans = document.querySelectorAll('.progress-line span');

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Trigger skill bar animation if it's the skills section
                    if(entry.target.classList.contains('skills-bars')) {
                        progressSpans.forEach(span => {
                            span.style.width = span.getAttribute('data-width');
                        });
                    }
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, revealOptions);

        revealElements.forEach(el => revealObserver.observe(el));

        /* ==================== 8. 3D TILT EFFECT (Vanilla JS) ==================== */
        const tiltCards = document.querySelectorAll('.tilt-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; // Remove transition for instant follow
            });
        });

        /* ==================== 9. HERO PARALLAX EFFECT ==================== */
        const parallaxEls = document.querySelectorAll('.parallax-el');
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX) / 100;
            const y = (window.innerHeight - e.pageY) / 100;

            parallaxEls.forEach(el => {
                const speed = el.getAttribute('data-speed');
                el.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
            });
        });

        /* ==================== 10. FORM VALIDATION & ANIMATION ==================== */
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submit-btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic UI loading state
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Mengirim...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            // Simulate API Call delay
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Terkirim!</span> <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                }, 3000);
            }, 2000);
        });

        /* ==================== 11. HTML5 CANVAS PARTICLE NETWORK ==================== */
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        // Mouse position for interaction
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
                this.baseX = this.x;
                this.baseY = this.y;
            }
            // Draw particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            // Update particle position & interactivity
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

                // Collision detection mouse / particle
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < mouse.radius + this.size) {
                    // Dodging effect
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * 5;
                    const directionY = forceDirectionY * force * 5;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return slowly to normal movement
                    this.x += this.directionX;
                    this.y += this.directionY;
                }

                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            // Amount of particles depending on screen size to keep FPS optimal
            let numberOfParticles = (canvas.height * canvas.width) / 15000;
            // Cap the particles to avoid lag
            if(numberOfParticles > 100) numberOfParticles = 100; 
            
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const pColor = isLight ? 'rgba(2, 132, 199, 0.5)' : 'rgba(0, 245, 255, 0.5)';

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, pColor));
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }

        // Draw lines between particles
        function connectParticles() {
            let opacityValue = 1;
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const rgbLine = isLight ? '2, 132, 199' : '0, 245, 255';

            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                                 + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(${rgbLine}, ${opacityValue * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Initialize and Start
        initParticles();
        animateParticles();
        
        // Update particle color slightly on theme change
        document.getElementById('theme-toggle').addEventListener('click', () => {
            setTimeout(initParticles, 100);
        });
