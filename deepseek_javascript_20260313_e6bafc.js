// Verse data (same as in script.js)
const verses = {
    "1.1": {
        number: "1.1",
        sanskrit: "कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः",
        translation: "A certain Yaksha, negligent in his duty due to separation from his beloved, was cursed by his master to spend a year away from his home.",
        detailedTranslation: "There was a certain Yaksha who, being careless in his duties due to the pain of separation from his beloved, was cursed by his master (Kubera) to spend a year in exile.",
        notes: "This opening verse establishes the central conflict of the poem - the Yaksha's separation from his beloved and his subsequent exile."
    }
    // Add all 120 verses here
};

// Load verse on page load
document.addEventListener('DOMContentLoaded', () => {
    loadVerse();
    setupEventListeners();
    addPageFlipEffect();
});

function loadVerse() {
    // Get verse from sessionStorage or default to 1.1
    let verseData = sessionStorage.getItem('currentVerse');
    let verseNumber = '1.1';
    
    if (verseData) {
        verseData = JSON.parse(verseData);
        verseNumber = verseData.number;
    } else {
        verseData = verses['1.1'];
    }
    
    // Update page content
    document.getElementById('verseNumber').textContent = `Verse ${verseNumber}`;
    document.getElementById('currentVerseNum').textContent = verseNumber;
    document.getElementById('sanskritText').innerHTML = `<p class="sanskrit-line">${verseData.sanskrit}</p>`;
    document.getElementById('translationText').innerHTML = `<p>${verseData.translation}</p>`;
    
    if (verseData.detailedTranslation) {
        document.getElementById('detailedNotes').innerHTML = `
            <h3>Detailed Meaning</h3>
            <p>${verseData.detailedTranslation}</p>
            <p class="notes">${verseData.notes || ''}</p>
        `;
    }
    
    // Add animation
    animateVerseEntry();
}

function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prevVerse').addEventListener('click', () => {
        navigateVerse('prev');
    });
    
    document.getElementById('nextVerse').addEventListener('click', () => {
        navigateVerse('next');
    });
    
    // Action buttons
    document.getElementById('shareBtn').addEventListener('click', shareVerse);
    document.getElementById('bookmarkBtn').addEventListener('click', toggleBookmark);
    document.getElementById('listenBtn').addEventListener('click', simulateAudio);
}

function navigateVerse(direction) {
    // Get current verse number
    const currentVerse = document.getElementById('currentVerseNum').textContent;
    const [chapter, verse] = currentVerse.split('.').map(Number);
    
    let newChapter = chapter;
    let newVerse = verse;
    
    if (direction === 'next') {
        newVerse++;
        if (newVerse > 60) { // Assuming 60 verses per chapter
            newChapter++;
            newVerse = 1;
        }
    } else {
        newVerse--;
        if (newVerse < 1) {
            newChapter--;
            newVerse = 60;
        }
    }
    
    const newVerseKey = `${newChapter}.${newVerse}`;
    
    // Check if verse exists
    if (verses[newVerseKey]) {
        // Page flip animation
        flipToVerse(newVerseKey);
    } else {
        // Show toast notification
        showToast('End of verses in this chapter');
    }
}

function flipToVerse(verseKey) {
    const card = document.getElementById('verseCard');
    
    // Add flip animation class
    card.style.animation = 'flipPage 0.6s ease';
    
    setTimeout(() => {
        // Update verse
        const verseData = verses[verseKey];
        document.getElementById('verseNumber').textContent = `Verse ${verseKey}`;
        document.getElementById('currentVerseNum').textContent = verseKey;
        document.getElementById('sanskritText').innerHTML = `<p class="sanskrit-line">${verseData.sanskrit}</p>`;
        document.getElementById('translationText').innerHTML = `<p>${verseData.translation}</p>`;
        
        if (verseData.detailedTranslation) {
            document.getElementById('detailedNotes').innerHTML = `
                <h3>Detailed Meaning</h3>
                <p>${verseData.detailedTranslation}</p>
                <p class="notes">${verseData.notes || ''}</p>
            `;
        }
        
        // Remove animation class
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    }, 300);
    
    // Create particle effect
    createVerseParticles();
}

function addPageFlipEffect() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flipPage {
            0% {
                transform: perspective(1000px) rotateY(0deg);
                opacity: 1;
            }
            50% {
                transform: perspective(1000px) rotateY(90deg);
                opacity: 0.5;
            }
            100% {
                transform: perspective(1000px) rotateY(0deg);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

function animateVerseEntry() {
    const card = document.getElementById('verseCard');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

function createVerseParticles() {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#7ec8e0';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = `particleFloat ${1 + Math.random()}s ease-out forwards`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '30px';
    toast.style.zIndex = '10000';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.border = '1px solid #7ec8e0';
    toast.style.animation = 'toastIn 0.3s ease';
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}

function shareVerse() {
    const verseNum = document.getElementById('currentVerseNum').textContent;
    const sanskrit = document.getElementById('sanskritText').innerText;
    
    // Create share popup
    const popup = document.createElement('div');
    popup.className = 'share-popup';
    popup.innerHTML = `
        <div class="share-content">
            <h4>Share Verse ${verseNum}</h4>
            <div class="share-options">
                <button onclick="copyToClipboard('${sanskrit}')">
                    <i class="fas fa-copy"></i> Copy Text
                </button>
                <button onclick="shareTwitter('${verseNum}')">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button onclick="closeShare(this)">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('active'), 10);
}

function toggleBookmark() {
    const btn = document.getElementById('bookmarkBtn');
    const icon = btn.querySelector('i');
    const verseNum = document.getElementById('currentVerseNum').textContent;
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showToast(`Verse ${verseNum} bookmarked!`);
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showToast(`Bookmark removed`);
    }
}

function simulateAudio() {
    showToast('🔊 Audio feature coming soon!');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
}

function shareTwitter(verseNum) {
    window.open(`https://twitter.com/intent/tweet?text=Check out Verse ${verseNum} of Meghdoot!&url=${window.location.href}`);
}

function closeShare(btn) {
    const popup = btn.closest('.share-popup');
    popup.classList.remove('active');
    setTimeout(() => popup.remove(), 300);
}

// Add CSS for share popup
const shareStyle = document.createElement('style');
shareStyle.textContent = `
    .share-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .share-popup.active {
        opacity: 1;
    }
    
    .share-content {
        background: rgba(10, 25, 35, 0.95);
        border: 2px solid #7ec8e0;
        border-radius: 20px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }
    
    .share-popup.active .share-content {
        transform: scale(1);
    }
    
    .share-content h4 {
        color: #7ec8e0;
        margin-bottom: 20px;
        font-size: 1.5rem;
    }
    
    .share-options {
        display: grid;
        gap: 10px;
    }
    
    .share-options button {
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    .share-options button:hover {
        background: #7ec8e0;
        color: #0a1f2e;
        transform: translateY(-2px);
    }
    
    @keyframes toastIn {
        from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes toastOut {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(shareStyle);