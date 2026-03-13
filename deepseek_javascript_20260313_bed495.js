// Verse data storage
const verses = {
    "1.1": {
        number: "1.1",
        sanskrit: "कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः",
        translation: "A certain Yaksha, negligent in his duty due to separation from his beloved, was cursed by his master to spend a year away from his home.",
        detailedTranslation: "There was a certain Yaksha who, being careless in his duties due to the pain of separation from his beloved, was cursed by his master (Kubera) to spend a year in exile.",
        notes: "This opening verse establishes the central conflict of the poem - the Yaksha's separation from his beloved and his subsequent exile."
    }
    // Add all 120 verses here in the same format
};

// Navigation function
function navigateToVerse(verseNumber) {
    if (verses[verseNumber]) {
        // Store the verse data in sessionStorage to retrieve on the verse page
        sessionStorage.setItem('currentVerse', JSON.stringify(verses[verseNumber]));
        
        // Create a stunning page transition
        document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        
        // Add floating particles effect
        createParticleEffect();
        
        // Navigate to verse page after animation
        setTimeout(() => {
            window.location.href = 'verse.html';
        }, 500);
    } else {
        // Show error with animation
        showError('Verse not found. Please enter a valid verse number (e.g., 1.1)');
    }
}

// Create particle effect for transitions
function createParticleEffect() {
    const particles = document.createElement('div');
    particles.style.position = 'fixed';
    particles.style.top = '0';
    particles.style.left = '0';
    particles.style.width = '100%';
    particles.style.height = '100%';
    particles.style.pointerEvents = 'none';
    particles.style.zIndex = '9999';
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#7ec8e0';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${1 + Math.random() * 2}s ease-out forwards`;
        particle.style.boxShadow = '0 0 10px #7ec8e0';
        
        particles.appendChild(particle);
    }
    
    document.body.appendChild(particles);
    
    // Remove particles after animation
    setTimeout(() => {
        particles.remove();
    }, 2000);
}

// Add keyframe animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Show error message
function showError(message) {
    const inputGroup = document.querySelector('.input-group');
    const existingError = document.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#ff6b6b';
    error.style.marginTop = '10px';
    error.style.padding = '10px';
    error.style.borderRadius = '10px';
    error.style.background = 'rgba(255, 107, 107, 0.1)';
    error.style.border = '1px solid #ff6b6b';
    error.style.animation = 'shake 0.5s ease';
    error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    inputGroup.parentNode.insertBefore(error, inputGroup.nextSibling);
    
    // Shake the input
    const input = document.getElementById('verseInput');
    input.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        error.remove();
        input.style.animation = '';
    }, 3000);
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Set up event listeners
    const goButton = document.getElementById('goToVerse');
    const verseInput = document.getElementById('verseInput');
    
    goButton.addEventListener('click', () => {
        const verseNumber = verseInput.value.trim();
        if (verseNumber) {
            navigateToVerse(verseNumber);
        } else {
            showError('Please enter a verse number');
        }
    });
    
    verseInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const verseNumber = verseInput.value.trim();
            if (verseNumber) {
                navigateToVerse(verseNumber);
            } else {
                showError('Please enter a verse number');
            }
        }
    });
    
    // Add input validation
    verseInput.addEventListener('input', (e) => {
        // Allow only numbers and dots
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    });
    
    // Add floating effect to the preview card
    const previewCard = document.querySelector('.preview-card');
    if (previewCard) {
        previewCard.addEventListener('mousemove', (e) => {
            const rect = previewCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            previewCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        previewCard.addEventListener('mouseleave', () => {
            previewCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
    
    // Add parallax effect to clouds
    document.addEventListener('mousemove', (e) => {
        const clouds = document.querySelectorAll('.cloud');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        clouds.forEach((cloud, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * (speed / 2);
            cloud.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// Create verse page HTML (to be created as verse.html)
function createVersePage() {
    // This function would create the verse.html page
    // For now, we'll handle it in a separate file
    console.log('Navigate to verse page');
}

// Preload animation for buttons
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('animated-button') || e.target.closest('.animated-button')) {
        const button = e.target.closest('.animated-button');
        button.style.animation = 'pulse 1s infinite';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('animated-button') || e.target.closest('.animated-button')) {
        const button = e.target.closest('.animated-button');
        button.style.animation = 'pulse 2s infinite';
    }
});