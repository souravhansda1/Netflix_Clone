// Sample movie data (in a real app, this would come from an API)
const movies = [
    {
        title: 'Thor: The Dark World',
        image: '662b46f86f12124be63d8513-poster-stop-online-thor-2-the-dark-world.jpg',
        genre: 'Action, Adventure, Fantasy'
    },
    // Add more movies here
];

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Function to create content cards
function createContentCard(movie) {
    return `
        <div class="content-card">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="card-overlay">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
                <div class="card-buttons">
                    <button><i class="fas fa-play"></i> Play</button>
                    <button><i class="fas fa-info-circle"></i> More Info</button>
                </div>
            </div>
        </div>
    `;
}

// Populate content rows with movies
function populateContentRows() {
    const contentSliders = document.querySelectorAll('.content-slider');
    
    contentSliders.forEach(slider => {
        // Add multiple copies of the same movie for demonstration
        for (let i = 0; i < 6; i++) {
            slider.innerHTML += createContentCard(movies[0]);
        }
    });
}

// Smooth scroll for content sliders
document.querySelectorAll('.content-slider').forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});

// Search functionality
const searchInput = document.querySelector('.navbar-search input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Slider Navigation
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.content-slider');
    
    sliders.forEach(slider => {
        const prevArrow = slider.parentElement.querySelector('.prev-arrow');
        const nextArrow = slider.parentElement.querySelector('.next-arrow');
        
        prevArrow.addEventListener('click', () => {
            slider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextArrow.addEventListener('click', () => {
            slider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
        
        // Show/hide arrows based on scroll position
        slider.addEventListener('scroll', () => {
            const isAtStart = slider.scrollLeft === 0;
            const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
            
            prevArrow.style.opacity = isAtStart ? '0.5' : '1';
            prevArrow.style.pointerEvents = isAtStart ? 'none' : 'auto';
            
            nextArrow.style.opacity = isAtEnd ? '0.5' : '1';
            nextArrow.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });
    });
});

// Language Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageButton = document.querySelector('.language-button');
    const currentLanguage = document.querySelector('.current-language');
    const languageOptions = document.querySelectorAll('.language-option');

    // Toggle dropdown
    languageButton.addEventListener('click', () => {
        languageDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            languageOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to selected option
            option.classList.add('active');
            // Update current language text
            currentLanguage.textContent = option.textContent;
            // Close dropdown
            languageDropdown.classList.remove('active');
        });
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateContentRows();
}); 