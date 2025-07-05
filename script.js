// Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(nl => nl.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            const targetPage = this.getAttribute('data-page');
            document.getElementById(targetPage).classList.add('active');
        });
    });
    
    // Background Music Control
    // const musicToggle = document.getElementById('musicToggle');
    // const musicIcon = document.getElementById('musicIcon');
    // const backgroundMusic = document.getElementById('backgroundMusic');
    // let isPlaying = false;
    
    // musicToggle.addEventListener('click', function() {
    //     if (isPlaying) {
    //         backgroundMusic.pause();
    //         musicIcon.className = 'fas fa-play';
    //         isPlaying = false;
    //     } else {
    //         backgroundMusic.play().catch(e => {
    //             console.log('Audio play failed:', e);
    //             // Fallback: show a message or handle the error gracefully
    //         });
    //         musicIcon.className = 'fas fa-pause';
    //         isPlaying = true;
    //     }
    // });
    
    // Create floating hearts
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            
            // Random positioning
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            
            // Random animation delay and duration
            heart.style.animationDelay = Math.random() * 10 + 's';
            heart.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            heartsContainer.appendChild(heart);
        }
    }
    
    // Initialize floating hearts
    createFloatingHearts();
    
    // Smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.photo-card, .note-card, .moment-card, .memory-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click handlers for video thumbnails (placeholder functionality)
    // const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    // videoThumbnails.forEach(thumbnail => {
    //     thumbnail.addEventListener('click', function() {
    //         // Placeholder for video functionality
    //         alert('Video would play here! You can replace this with actual video functionality.');
    //     });
    // });
    
    // Add parallax effect to floating hearts
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hearts = document.querySelectorAll('.floating-heart');
        
        hearts.forEach((heart, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            heart.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const animatedElements = document.querySelectorAll('.photo-card, .note-card, .moment-card, .memory-card, .final-message, .special-message');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add sparkle animation
    function addSparkleEffect() {
        const sparkles = document.querySelectorAll('.sparkle');
        
        sparkles.forEach(sparkle => {
            setInterval(() => {
                sparkle.style.transform = 'scale(1.2) rotate(180deg)';
                setTimeout(() => {
                    sparkle.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }, 3000 + Math.random() * 2000);
        });
    }
    
    // Initialize sparkle effects
    addSparkleEffect();
    
    // Add typing effect to hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment the line below if you want a typing effect on the hero title
    // typeWriter(document.querySelector('.hero-title'), '#KashNandu', 150);
});

// Handle audio autoplay restrictions
document.addEventListener('click', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic && backgroundMusic.paused) {
        // This helps with browsers that block autoplay
        backgroundMusic.load();
    }
}, { once: true });

// Add window resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate floating hearts positions if needed
    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach(heart => {
        heart.style.left = Math.random() * 100 + '%';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const navLinks = document.querySelectorAll('.nav-link');
    const activeLink = document.querySelector('.nav-link.active');
    const currentIndex = Array.from(navLinks).indexOf(activeLink);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navLinks[currentIndex - 1].click();
    } else if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
        navLinks[currentIndex + 1].click();
    }
});


  function playVideo(button) {
    const video = button.previousElementSibling;

    // Pause all other videos
    document.querySelectorAll('.video-preview').forEach(v => {
      if (v !== video) {
        v.pause();
        v.parentElement.querySelector('.play-button').style.display = 'block';
      }
    });

    // Play the selected video
    video.play();
    button.style.display = 'none';

    // Show the button again when the video ends
    video.onended = () => {
      button.style.display = 'block';
    };
  }

