// ============================================
// BARBER SHOP - ANIMACIONES PROFESIONALES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVBAR PERSONALIZADO
    // ============================================
    
    // Elementos del navbar
    const navbar = document.querySelector('.custom-navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Control del menú hamburguesa
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer click en redes sociales móviles
        const mobileSocialLinks = document.querySelectorAll('.mobile-social a');
        mobileSocialLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target)) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    }
    
    // Efecto de scroll del navbar
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar clase scrolled cuando haya scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Detectar sección activa (scrollspy)
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
    
    // Función para actualizar el enlace activo según la sección visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPosition = window.scrollY + 100; // Offset para el navbar fijo
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Si estamos en la parte superior, activar HOME
        if (window.scrollY < 100) {
            currentSection = 'home';
        }
        
        // Actualizar clases activas
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Ejecutar al cargar la página
    updateActiveNavLink();
    
    // ============================================
    // ANIMACIONES Y FUNCIONALIDADES ORIGINALES
    // ============================================
    
    // ============================================
    // 1. SMOOTH SCROLL PARA NAVEGACIÓN
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Ajuste para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 2. INTERSECTION OBSERVER PARA ANIMACIONES
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplicar la clase animate-visible a todos
                entry.target.classList.add('animate-visible');
                
                // Animaciones específicas por tipo de elemento
                if (entry.target.classList.contains('counter-number')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('typewriter-text')) {
                    typewriterEffect(entry.target);
                }
            }
        });
    }, observerOptions);

    // ============================================
    // 3. AÑADIR CLASES DE ANIMACIÓN A ELEMENTOS
    // ============================================
    function initializeAnimations() {

        // Títulos principales
        const mainTitles = document.querySelectorAll('h2:not(.hero h2):not(.footer-logo)');
        mainTitles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(title);
        });

        // Párrafos y contenido - excluyendo sección horario
        const contentElements = document.querySelectorAll('section p:not(.border-card), .title');
        contentElements.forEach((element, index) => {
            // Solo animar elementos visibles y no de sección horario
            if (element.offsetParent !== null && !element.closest('.backDark')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(15px)';
                element.style.transition = `opacity 0.5s ease ${Math.min(index * 0.05, 0.3)}s, transform 0.5s ease ${Math.min(index * 0.05, 0.3)}s`;
                observer.observe(element);
            }
        });

        // Imágenes - excluyendo sección horario  
        const images = document.querySelectorAll('section img:not(.card-img)');
        images.forEach(img => {
            if (img.offsetParent !== null && !img.closest('.backDark')) {
                img.style.opacity = '0';
                img.style.transform = 'scale(0.95)';
                img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(img);
            }
        });

        // Formulario de contacto
        const formElements = document.querySelectorAll('#contacto .form-control, #contacto .btn, .reservation-container');
        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // ============================================
    // 4. CONTADOR ANIMADO PARA NÚMEROS
    // ============================================
    function animateCounter(element) {
        const text = element.textContent;
        const numbers = text.match(/\d+/g);
        
        if (numbers) {
            numbers.forEach(num => {
                const targetNumber = parseInt(num);
                let currentNumber = 0;
                const increment = targetNumber / 60; // 60 frames
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(timer);
                    }
                    
                    const newText = text.replace(num, Math.floor(currentNumber).toString());
                    element.textContent = newText;
                }, 16); // ~60fps
            });
        }
    }

    // ============================================
    // 5. EFECTO TYPEWRITER PARA TÍTULOS
    // ============================================
    function typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let index = 0;
        const timer = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(timer);
            }
        }, 50);
    }

    // ============================================
    // 6. PARALLAX EFFECT MEJORADO
    // ============================================
    function initParallax() {
        // DESACTIVADO: Esta función interfiere con background-attachment: fixed
        // const heroHeader = document.querySelector('header');
        
        // window.addEventListener('scroll', () => {
        //     const scrolled = window.pageYOffset;
            
        //     // Solo aplicar parallax al header hero, no a otras secciones
        //     if (heroHeader && scrolled < window.innerHeight) {
        //         const rate = scrolled * -0.3;
        //         heroHeader.style.transform = `translateY(${rate}px)`;
        //     }
        // });
    }

    // ============================================
    // 7. BOTÓN DE SUBIR - FUNCIONALIDAD COMPLETA
    // ============================================
    function initScrollToTop() {
        const buttonUp = document.querySelector('.buttonUp');
        
        if (!buttonUp) return;
        
        // Mostrar/ocultar botón según scroll
        function toggleButton() {
            if (window.scrollY > 300) {
                buttonUp.classList.add('show');
            } else {
                buttonUp.classList.remove('show');
            }
        }
        
        // Scroll suave hacia arriba
        function scrollToTop(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Event listeners
        window.addEventListener('scroll', toggleButton);
        buttonUp.addEventListener('click', scrollToTop);
        
        // Verificar estado inicial
        toggleButton();
    }

    // ============================================
    // 8. NAVBAR SCROLL - FUNCIÓN LIMPIA
    // ============================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;
        
        function handleScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-compact');
            } else {
                navbar.classList.remove('navbar-compact');
            }
        }
        
        // Escuchar evento scroll
        window.addEventListener('scroll', handleScroll);
        
        // Verificar estado inicial
        handleScroll();
    }

    // ============================================
    // 8. EFECTOS HOVER AHORA EN CSS - FUNCIÓN ELIMINADA
    // ============================================
    function initCardAnimations() {
        // Los efectos hover ahora están completamente en CSS
        // No necesitamos JavaScript para estos efectos
    }

    // ============================================
    // 9. EFECTO RIPPLE EN BOTONES
    // ============================================
    function initButtonRipple() {
        const buttons = document.querySelectorAll('.btn, .contact-btn, .reservation-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255,255,255,0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 600ms linear';
                ripple.style.pointerEvents = 'none';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ============================================
    // 10. LOADING ANIMATION PARA LA PÁGINA
    // ============================================
    function initPageLoading() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            ">
                <div style="
                    text-align: center;
                    color: #d4af37;
                ">
                    <div style="
                        width: 50px;
                        height: 50px;
                        border: 3px solid rgba(212, 175, 55, 0.3);
                        border-top: 3px solid #d4af37;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px auto;
                    "></div>
                    <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 2rem; margin: 0;">BarberShop</h3>
                </div>
            </div>
        `;
        
        // Añadir animación de spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        // Remover loader después de que cargue todo
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }

    // ============================================
    // 11. CSS PARA ANIMACIONES (Añadido dinámicamente)
    // ============================================
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Animaciones de aparición */
            .animate-visible {
                opacity: 1 !important;
                transform: translateY(0) scale(1) !important;
            }
            
            /* Efecto ripple para botones */
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Mejoras específicas para navbar */
            .navbar.fixed-top {
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
                will-change: background-color, backdrop-filter, box-shadow, padding;
            }
            
            /* Transiciones suaves para elementos del navbar */
            .navbar-brand h1 {
                transition: font-size 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
            
            .nav-link {
                transition: all 0.3s ease-in-out, padding 0.4s ease !important;
            }
            
            /* Estado compacto del navbar */
            .navbar-compact {
                height: auto !important;
            }
            
            /* Prevenir layout shift durante animaciones */
            .box-sevicios .card {
                will-change: transform, opacity;
            }
            
            .card-B {
                will-change: transform, opacity;
            }
            
            /* Suavizar transiciones en móviles */
            @media (max-width: 768px) {
                * {
                    transition-duration: 0.2s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // 12. INICIALIZAR TODAS LAS ANIMACIONES
    // ============================================
    
    // Añadir estilos de animación
    addAnimationStyles();
    
    // Mostrar loader
    initPageLoading();
    
    // Inicializar animaciones principales
    initializeAnimations();
    
    // Configurar parallax
    initParallax();
    
    // Botón de subir
    initScrollToTop();
    
    // Animaciones de navegación
    initNavbarScroll();
    
    // Animaciones de tarjetas
    initCardAnimations();
    
    // Efecto ripple en botones
    initButtonRipple();
    
    // Marcar números para animación de contador
    const numberElements = document.querySelectorAll('.about-1 p:first-child, .about-2 p');
    numberElements.forEach(el => {
        el.classList.add('counter-number');
    });
    
    // Configurar typewriter para título principal del hero
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        heroTitle.classList.add('typewriter-text');
        setTimeout(() => {
            typewriterEffect(heroTitle);
        }, 2000);
    }
    
    console.log('🎉 BarberShop - Todas las animaciones inicializadas correctamente');
    
    // ============================================
    // ANIMACIÓN ESPECÍFICA PARA SERVICIOS
    // ============================================
    
    function initServicesAnimation() {
        const serviceCards = document.querySelectorAll('.box-sevicios .card');
        
        // Configurar estado inicial
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        // Observer específico para servicios
        const servicesObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay escalonado más suave
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 150); // 150ms entre cada tarjeta
                    
                    // Dejar de observar una vez animado
                    servicesObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar cada tarjeta
        serviceCards.forEach(card => {
            servicesObserver.observe(card);
        });
    }
    
    // Inicializar animación de servicios
    initServicesAnimation();
    
    // ============================================
    // ANIMACIÓN ESPECÍFICA PARA BARBEROS
    // ============================================
    
    function initBarbersAnimation() {
        const barberCards = document.querySelectorAll('.card-B');
        
        // Configurar estado inicial
        barberCards.forEach(card => {
            card.style.opacity = '0';
            card.style.filter = 'blur(8px) brightness(0.7)';
            card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        // Observer específico para barberos
        const barbersObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay escalonado más elegante
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.filter = 'blur(0px) brightness(1)';
                    }, index * 200); // 200ms entre cada barbero
                    
                    // Dejar de observar una vez animado
                    barbersObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });
        
        // Observar cada tarjeta de barbero
        barberCards.forEach(card => {
            barbersObserver.observe(card);
        });
    }
    
    // Inicializar animación de barberos
    initBarbersAnimation();
    
    // ============================================
    // ANIMACIÓN ESPECÍFICA PARA SECCIÓN HORARIO
    // ============================================
    
    function initScheduleAnimation() {
        // Buscar la sección que contiene tanto imagen como .backDark (sección horario)
        const scheduleSection = document.querySelector('section:has(.backDark):has(img.img-fluid)') || 
                               Array.from(document.querySelectorAll('section')).find(section => 
                                   section.querySelector('.backDark') && section.querySelector('img.img-fluid')
                               );
        
        if (scheduleSection) {
            // Configurar estado inicial
            scheduleSection.style.opacity = '0';
            scheduleSection.style.transform = 'translateY(50px)';
            scheduleSection.style.transition = 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Observer específico para horario
            const scheduleObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animar toda la sección como una unidad
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Dejar de observar una vez animado
                        scheduleObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observar la sección
            scheduleObserver.observe(scheduleSection);
        }
    }
    
    // Inicializar animación de horario
    initScheduleAnimation();
});
