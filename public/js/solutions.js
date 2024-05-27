document.getElementById('language-select').addEventListener('change', function () {
    const language = this.value;
    const elements = document.querySelectorAll('[data-en], [data-tr]');

    elements.forEach(el => {
        if (el.tagName === 'IMG') { // Special handling for images if needed
            el.src = el.getAttribute(`data-${language}-src`);
        } else {
            el.textContent = el.getAttribute(`data-${language}`);
        }
    });
});

// Load language preference on initial load
window.onload = function () {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        document.getElementById('language-select').value = savedLanguage;
        document.getElementById('language-select').dispatchEvent(new Event('change'));
    }
};

// Save language preference
document.getElementById('language-select').addEventListener('change', function () {
    localStorage.setItem('preferredLanguage', this.value);
});

//to toggle the menu icon when using small screens
function toggleNavItems() {
    var element = document.querySelector('.nav-items');
    if (element.classList.contains('responsive')) {
        element.classList.remove('responsive');
    } else {
        element.classList.add('responsive');
    }
}

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the "View All" button
    document.getElementById('viewAllButton').addEventListener('click', function () {
        // Toggle the visibility of the additional information section
        const additionalInfo = document.getElementById('additionalInfo');
        additionalInfo.classList.toggle('visible');
        // Change the button text based on the visibility of the additional information section
        this.textContent = additionalInfo.classList.contains('visible') ? 'Show less' : 'View all';
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'a23d3c56-4fe8-44e0-a671-76f08c6a5f45';
    const apiUrl = `https://content.guardianapis.com/environment?api-key=${apiKey}&page-size=12&show-fields=headline,trailText,thumbnail&cache-bust=${new Date().getTime()}`;
    const newsContainer = document.getElementById('newsContainer');

    async function fetchNews() {
        try {
            console.log('Fetching news from API:', apiUrl);
            const response = await fetch(apiUrl);
            console.log('API response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data);

            if (data && data.response && data.response.results) {
                displayNews(data.response.results);
            } else {
                console.error('Invalid data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = '';
        const displayArticles = articles.slice(); // Limit to 12 articles
        displayArticles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';

            if (article.fields.thumbnail) {
                const newsImage = document.createElement('img');
                newsImage.className = 'news-image';
                newsImage.src = article.fields.thumbnail;
                newsItem.appendChild(newsImage);
            }

            const newsTitle = document.createElement('div');
            newsTitle.className = 'news-title';
            newsTitle.textContent = article.fields.headline;

            const newsDescription = document.createElement('div');
            newsDescription.className = 'news-description';
            newsDescription.textContent = article.fields.trailText;

            newsItem.appendChild(newsTitle);
            newsItem.appendChild(newsDescription);
            newsContainer.appendChild(newsItem);
        });
    }

    // Fetch news on page load
    fetchNews();

    // Fetch news every 10 minutes (600000 milliseconds)
    setInterval(fetchNews, 10000);
});
document.addEventListener('DOMContentLoaded', function () {
    function toggleContent(buttonId, contentId) {
        const button = document.getElementById(buttonId);
        const content = document.getElementById(contentId);
        const projectDescription = content.closest('.project-description');

        button.addEventListener('click', function () {
            const isHidden = content.classList.contains('more-solutions-hidden');

            if (isHidden) {
                content.classList.remove('more-solutions-hidden');
                setTimeout(() => {
                    projectDescription.classList.add('expanded');
                }, 10); // Small delay to trigger CSS transition
            } else {
                projectDescription.classList.remove('expanded');
                setTimeout(() => {
                    content.classList.add('more-solutions-hidden');
                }, 500); // Delay to allow transition to complete before hiding content
            }

            button.textContent = isHidden ? 'View Less' : 'View More';
        });
    }

    toggleContent('viewMoreButtonPlastic', 'moreSolutionsPlastic');
    toggleContent('viewMoreButtonEnergy', 'moreSolutionsEnergy');
    toggleContent('viewMoreButtonWater', 'moreSolutionsWater');
    toggleContent('viewMoreButtonBiodiversity', 'moreSolutionsBiodiversity');
});








