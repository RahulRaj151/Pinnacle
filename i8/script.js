// Sample articles data
const sampleArticles = [
    {
        id: '1',
        title: 'Global Climate Summit Reaches Historic Agreement on Carbon Emissions',
        summary: 'World leaders unite in unprecedented climate action plan, setting ambitious targets for carbon neutrality by 2050. The agreement includes binding commitments from major economies.',
        content: 'Full article content would go here...',
        source: 'Reuters',
        author: 'Sarah Johnson',
        publishedAt: '2024-01-15T10:30:00Z',
        imageUrl: 'https://images.pexels.com/photos/9324416/pexels-photo-9324416.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'World',
        readTime: 5,
        trending: true
    },
    {
        id: '2',
        title: 'AI Breakthrough: New Language Model Achieves Human-Level Reasoning',
        summary: 'Revolutionary artificial intelligence system demonstrates unprecedented problem-solving capabilities, potentially transforming multiple industries.',
        content: 'Full article content would go here...',
        source: 'TechCrunch',
        author: 'Michael Chen',
        publishedAt: '2024-01-15T08:15:00Z',
        imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Technology',
        readTime: 7,
        trending: true
    },
    {
        id: '3',
        title: 'Stock Markets Surge as Tech Giants Report Record Quarterly Earnings',
        summary: 'Major technology companies exceed analyst expectations, driving significant gains across global markets and boosting investor confidence.',
        content: 'Full article content would go here...',
        source: 'Bloomberg',
        author: 'Emma Davis',
        publishedAt: '2024-01-15T07:45:00Z',
        imageUrl: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Business',
        readTime: 4,
        trending: true
    },
    {
        id: '4',
        title: 'World Cup Qualifiers: Stunning Upsets Shake Tournament Predictions',
        summary: 'Underdog teams secure surprise victories in qualifying matches, reshaping expectations for the upcoming World Cup tournament.',
        content: 'Full article content would go here...',
        source: 'ESPN',
        author: 'Carlos Rodriguez',
        publishedAt: '2024-01-15T06:20:00Z',
        imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Sports',
        readTime: 3,
        trending: true
    },
    {
        id: '5',
        title: 'Medical Breakthrough: New Treatment Shows Promise Against Alzheimer\'s',
        summary: 'Clinical trials reveal significant improvements in cognitive function among patients treated with experimental therapy.',
        content: 'Full article content would go here...',
        source: 'Medical News Today',
        author: 'Dr. Lisa Wang',
        publishedAt: '2024-01-15T05:30:00Z',
        imageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Health',
        readTime: 6,
        trending: true
    },
    {
        id: '6',
        title: 'Hollywood Awards Season Kicks Off with Surprise Nominations',
        summary: 'This year\'s award nominations include several unexpected entries, highlighting diverse storytelling and emerging talent.',
        content: 'Full article content would go here...',
        source: 'Variety',
        author: 'Jessica Martinez',
        publishedAt: '2024-01-15T04:45:00Z',
        imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Entertainment',
        readTime: 4
    },
    {
        id: '7',
        title: 'Space Exploration Milestone: Mars Mission Discovers Water Evidence',
        summary: 'Latest data from Mars rover mission reveals compelling evidence of ancient water systems, advancing our understanding of the Red Planet.',
        content: 'Full article content would go here...',
        source: 'NASA News',
        author: 'Dr. James Thompson',
        publishedAt: '2024-01-14T22:15:00Z',
        imageUrl: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Technology',
        readTime: 8
    },
    {
        id: '8',
        title: 'Economic Recovery: Global GDP Growth Exceeds Expectations',
        summary: 'International economic indicators show stronger than anticipated growth, suggesting robust recovery from recent global challenges.',
        content: 'Full article content would go here...',
        source: 'Financial Times',
        author: 'Robert Anderson',
        publishedAt: '2024-01-14T20:30:00Z',
        imageUrl: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Business',
        readTime: 5
    },
    {
        id: '9',
        title: 'Olympic Preparations: Athletes Break Training Records Ahead of Games',
        summary: 'World-class athletes are setting new personal bests during training camps, promising exciting competition at the upcoming Olympics.',
        content: 'Full article content would go here...',
        source: 'Olympic Channel',
        author: 'Maria Gonzalez',
        publishedAt: '2024-01-14T18:45:00Z',
        imageUrl: 'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Sports',
        readTime: 4
    },
    {
        id: '10',
        title: 'Mental Health Initiative: Schools Implement Comprehensive Wellness Programs',
        summary: 'Educational institutions worldwide are adopting innovative approaches to support student mental health and well-being.',
        content: 'Full article content would go here...',
        source: 'Education Weekly',
        author: 'Dr. Amanda Foster',
        publishedAt: '2024-01-14T16:20:00Z',
        imageUrl: 'https://images.pexels.com/photos/8923982/pexels-photo-8923982.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Health',
        readTime: 6
    },
    {
        id: '11',
        title: 'Streaming Wars Heat Up: New Platform Challenges Industry Giants',
        summary: 'Emerging streaming service announces exclusive content partnerships, intensifying competition in the digital entertainment market.',
        content: 'Full article content would go here...',
        source: 'The Hollywood Reporter',
        author: 'Kevin Park',
        publishedAt: '2024-01-14T14:10:00Z',
        imageUrl: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Entertainment',
        readTime: 5
    },
    {
        id: '12',
        title: 'International Trade Deal Signed: New Economic Partnership Emerges',
        summary: 'Multiple nations formalize comprehensive trade agreement, expected to boost economic cooperation and reduce trade barriers.',
        content: 'Full article content would go here...',
        source: 'Associated Press',
        author: 'Helen Chang',
        publishedAt: '2024-01-14T12:30:00Z',
        imageUrl: 'https://images.pexels.com/photos/7414285/pexels-photo-7414285.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'World',
        readTime: 7
    }
];

// Global state
let currentCategory = 'All';
let currentSearchQuery = '';
let filteredArticles = [...sampleArticles];

// DOM elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const featuredArticle = document.getElementById('featuredArticle');
const sidebarArticles = document.getElementById('sidebarArticles');
const trendingGrid = document.getElementById('trendingGrid');
const categoryButtons = document.getElementById('categoryButtons');
const articlesGrid = document.getElementById('articlesGrid');
const searchResultsInfo = document.getElementById('searchResultsInfo');
const searchResultsTitle = document.getElementById('searchResultsTitle');
const searchResultsCount = document.getElementById('searchResultsCount');
const noArticles = document.getElementById('noArticles');
const noArticlesMessage = document.getElementById('noArticlesMessage');
const loadMoreContainer = document.getElementById('loadMoreContainer');

// Utility functions
function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
}

function getCategoryIcon(category) {
    const icons = {
        'All': 'fas fa-th-large',
        'World': 'fas fa-globe',
        'Technology': 'fas fa-laptop',
        'Business': 'fas fa-briefcase',
        'Sports': 'fas fa-trophy',
        'Health': 'fas fa-heart',
        'Entertainment': 'fas fa-film'
    };
    return icons[category] || 'fas fa-newspaper';
}

function handleShare(article) {
    if (navigator.share) {
        navigator.share({
            title: article.title,
            text: article.summary,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(`${article.title} - ${url}`);
        alert('Link copied to clipboard!');
    }
}

// Filter functions
function filterArticles() {
    let filtered = [...sampleArticles];

    // Filter by category
    if (currentCategory !== 'All') {
        filtered = filtered.filter(article => 
            article.category.toLowerCase() === currentCategory.toLowerCase()
        );
    }

    // Filter by search query
    if (currentSearchQuery) {
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
            article.summary.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
            article.source.toLowerCase().includes(currentSearchQuery.toLowerCase())
        );
    }

    filteredArticles = filtered;
    renderContent();
}

function setActiveCategory(category) {
    currentCategory = category;
    
    // Update desktop nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    // Update mobile nav buttons
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    // Update category filter buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    filterArticles();
}

function setSearchQuery(query) {
    currentSearchQuery = query;
    filterArticles();
}

// Render functions
function renderFeaturedArticle(article) {
    if (!article) return;
    
    featuredArticle.innerHTML = `
        <div class="article-image-container">
            <img src="${article.imageUrl}" alt="${article.title}" class="article-image" style="height: 20rem;">
            <div class="article-badges">
                <span class="category-badge">${article.category}</span>
                ${article.trending ? '<span class="trending-badge">Trending</span>' : ''}
            </div>
            <button class="share-btn" onclick="handleShare(${JSON.stringify(article).replace(/"/g, '&quot;')})">
                <i class="fas fa-share-alt"></i>
            </button>
        </div>
        <div class="article-content">
            <div class="article-meta">
                <div class="article-source">
                    <span class="source-name">${article.source}</span>
                    <span>by ${article.author}</span>
                </div>
                <div class="article-stats">
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span>${formatTimeAgo(article.publishedAt)}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-book-open"></i>
                        <span>${article.readTime} min</span>
                    </div>
                </div>
            </div>
            <h2 class="article-title" style="font-size: 1.875rem;">${article.title}</h2>
            <p class="article-summary" style="font-size: 1.125rem;">${article.summary}</p>
            <div class="article-footer">
                <a href="#" class="read-more-btn">
                    <span>Read Full Article</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
}

function renderSidebarArticles(articles) {
    sidebarArticles.innerHTML = articles.slice(0, 3).map(article => `
        <div class="sidebar-article">
            <h4>${article.title}</h4>
            <p class="meta">${article.source} • ${article.readTime} min read</p>
            <p class="summary">${article.summary}</p>
        </div>
    `).join('');
}

function renderTrendingSection() {
    const trendingArticles = sampleArticles.filter(article => article.trending).slice(0, 5);
    
    trendingGrid.innerHTML = trendingArticles.map((article, index) => `
        <div class="trending-item">
            <div class="trending-content">
                <span class="trending-number">${index + 1}</span>
                <div class="trending-text">
                    <h3>${article.title}</h3>
                    <p>${article.source}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCategoryButtons() {
    const categories = ['All', 'World', 'Technology', 'Business', 'Sports', 'Health', 'Entertainment'];
    
    categoryButtons.innerHTML = categories.map(category => `
        <button class="category-btn ${category === currentCategory ? 'active' : ''}" data-category="${category}">
            <i class="${getCategoryIcon(category)}"></i>
            <span>${category}</span>
        </button>
    `).join('');
}

function renderArticleCard(article) {
    return `
        <article class="article-card">
            <div class="article-image-container">
                <img src="${article.imageUrl}" alt="${article.title}" class="article-image">
                <div class="article-badges">
                    <span class="category-badge">${article.category}</span>
                    ${article.trending ? '<span class="trending-badge">Trending</span>' : ''}
                </div>
                <button class="share-btn" onclick="handleShare(${JSON.stringify(article).replace(/"/g, '&quot;')})">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <div class="article-source">
                        <span class="source-name">${article.source}</span>
                        <span>by ${article.author}</span>
                    </div>
                    <div class="article-stats">
                        <div class="stat-item">
                            <i class="fas fa-clock"></i>
                            <span>${formatTimeAgo(article.publishedAt)}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-book-open"></i>
                            <span>${article.readTime} min</span>
                        </div>
                    </div>
                </div>
                <h2 class="article-title">${article.title}</h2>
                <p class="article-summary">${article.summary}</p>
                <div class="article-footer">
                    <a href="#" class="read-more-btn">
                        <span>Read Full Article</span>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

function renderArticlesGrid() {
    const featuredArticleData = filteredArticles.find(article => article.trending) || filteredArticles[0];
    const otherArticles = filteredArticles.filter(article => article.id !== featuredArticleData?.id);
    
    if (otherArticles.length > 0) {
        articlesGrid.innerHTML = otherArticles.map(article => renderArticleCard(article)).join('');
        articlesGrid.style.display = 'grid';
        noArticles.style.display = 'none';
        loadMoreContainer.style.display = 'block';
    } else {
        articlesGrid.style.display = 'none';
        noArticles.style.display = 'block';
        loadMoreContainer.style.display = 'none';
        
        if (currentSearchQuery) {
            noArticlesMessage.textContent = `No articles match your search for "${currentSearchQuery}"`;
        } else {
            noArticlesMessage.textContent = `No articles found in ${currentCategory} category`;
        }
    }
}

function renderSearchResults() {
    if (currentSearchQuery) {
        searchResultsInfo.style.display = 'block';
        searchResultsTitle.textContent = `Search Results for "${currentSearchQuery}"`;
        searchResultsCount.textContent = `${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''} found`;
    } else {
        searchResultsInfo.style.display = 'none';
    }
}

function renderContent() {
    const featuredArticleData = filteredArticles.find(article => article.trending) || filteredArticles[0];
    const otherArticles = filteredArticles.filter(article => article.id !== featuredArticleData?.id);
    
    renderFeaturedArticle(featuredArticleData);
    renderSidebarArticles(otherArticles);
    renderSearchResults();
    renderArticlesGrid();
}

// Event listeners
function initializeEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    // Search functionality
    function handleSearch(e) {
        e.preventDefault();
        const query = e.target.querySelector('.search-input').value.trim();
        setSearchQuery(query);
        
        // Sync search inputs
        searchInput.value = query;
        mobileSearchInput.value = query;
        
        // Close mobile menu if open
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    }

    document.querySelectorAll('.search-form').forEach(form => {
        form.addEventListener('submit', handleSearch);
    });

    // Navigation buttons
    document.addEventListener('click', (e) => {
        if (e.target.matches('.nav-btn') || e.target.matches('.mobile-nav-btn')) {
            const category = e.target.dataset.category;
            setActiveCategory(category);
            
            // Close mobile menu
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        }
        
        if (e.target.matches('.category-btn')) {
            const category = e.target.dataset.category;
            setActiveCategory(category);
        }
    });

    // Load more button
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        // In a real application, this would load more articles from an API
        alert('Load more functionality would be implemented here!');
    });
}

// Make handleShare globally available
window.handleShare = handleShare;

// Initialize the application
function init() {
    renderTrendingSection();
    renderCategoryButtons();
    filterArticles();
    initializeEventListeners();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);