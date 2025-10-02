document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const logoImg = document.querySelector('.logo img');
    const logoMainText = document.querySelector('.logo-main');
    const logoSubText = document.querySelector('.logo-sub');

    
    let lastScrollY = window.scrollY;
    const headerHeight = header.offsetHeight; 

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) { 
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
                       header.style.transform = 'translateY(-100%)';
        } else {
           
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    }


    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    window.addEventListener('scroll', debounce(handleScroll, 10));

    
    handleScroll();

        navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
                if (this.hash !== "" && document.querySelector(this.hash)) {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                const offsetTop = target.offsetTop - header.offsetHeight; 

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                
                if (navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            } else if (this.hash === "") {
            }
        });
    });

        menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const areaCards = document.querySelectorAll('.area-card');

    if (carouselTrack && prevBtn && nextBtn && areaCards.length > 0) {
        let currentIndex = 0;

        function isMobile() {
            return window.innerWidth <= 576;
        }

        function updateCarousel() {
            if (isMobile()) {
                // On mobile, disable carousel and show all cards in a grid
                carouselTrack.style.transform = 'translateX(0)';
                return;
            }

            const cardWidth = areaCards[0].offsetWidth + 30;
            const cardSpacing = cardWidth + 30;
            const containerWidth = carouselTrack.parentElement.offsetWidth;
            const centerCardIndex = currentIndex + 1;
            const centerPosition = centerCardIndex * cardSpacing;
            const translateX = -centerPosition + (containerWidth / 2) - (cardWidth / 2);
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }

        function nextSlide() {
            if (isMobile()) return; // Disable carousel on mobile

            const maxIndex = areaCards.length - 3;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (isMobile()) return; // Disable carousel on mobile

            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        // Update carousel on window resize
        window.addEventListener('resize', function() {
            currentIndex = 0; // Reset to first position on resize
            updateCarousel();
        });

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        updateCarousel();
    }

    
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        emailjs.init({
            publicKey: "", 
                });

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const submitButton = contactForm.querySelector(".btn-submit");
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true; 

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value, // Adicionado campo de telefone
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value
            };

            const serviceID = "service_saziviq"; 
            const templateID = "template_lsgpy7b"; 

            emailjs.send(serviceID, templateID, formData)
                .then((response) => {
                    Toastify({
                        text: "E-mail enviado com sucesso! Em breve entraremos em contato.",
                        duration: 5000,
                        gravity: "top", 
                        position: "right",
                        backgroundColor: "linear-gradient(to right, #28a745, #218838)",
                        stopOnFocus: true, 
                    }).showToast();

                    contactForm.reset(); 
                })
                .catch((error) => {
                    console.error('Falha ao enviar e-mail:', error);
                    Toastify({
                        text: "Erro ao enviar e-mail. Por favor, tente novamente mais tarde.",
                        duration: 5000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "linear-gradient(to right, #dc3545, #c82333)",
                        stopOnFocus: true,
                    }).showToast();
                })
                .finally(() => {
                    submitButton.innerHTML = originalButtonText; 
                    submitButton.disabled = false; 
                });
        });
    }
});