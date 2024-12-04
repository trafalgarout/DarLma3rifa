// Configuration
const CONFIG = {
    TOTAL_IMAGES: 1000,
    IMAGES_PER_PAGE: 40,
    IMAGE_BASE_PATH: 'pictures/image1 (',
    IMAGE_EXTENSION: ').webp',
    PLACEHOLDER_IMAGE: 'pictures/placeholder.webp'
};

// State management
let currentPage = 1;
let filteredProfiles = [];
let allProfiles = [];
let imageLoadPromises = new Map();

// Check WebP support
async function checkWebPSupport() {
    try {
        const canvas = document.createElement('canvas');
        if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
            return true;
        }
    } catch (e) {
        console.error('Error checking WebP support:', e);
    }
    return false;
}

// Show/hide loading indicator
function toggleLoading(show) {
    const loader = document.getElementById('loadingIndicator');
    loader.style.display = show ? 'flex' : 'none';
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// Preload image with WebP fallback
async function preloadImage(src) {
    if (imageLoadPromises.has(src)) {
        return imageLoadPromises.get(src);
    }

    const promise = new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
            if (img.width > 0 && img.height > 0) {
                resolve(src);
            } else {
                reject(new Error('Invalid image dimensions'));
            }
        };
        
        img.onerror = () => {
            reject(new Error(`Failed to load image: ${src}`));
        };

        img.src = src;
    });

    imageLoadPromises.set(src, promise);
    return promise;
}

// Generate profiles
function generateProfiles() {
    const arabicNames = [
        "نور", "سارة", "فاطمة", "ريم", "لينا", "مريم", "زينب", "عائشة", "ليلى", "جنى",
        "رنا", "دانا", "هدى", "أمل", "سلمى", "ياسمين", "هناء", "رحمة", "صفاء", "منى",
        "لمى", "ندى", "هيا", "رغد", "تالا", "لانا", "ديما", "رزان", "جود", "ميار"
    ];

    const cities = [
        "الرياض", "جدة", "دبي", "أبوظبي", "القاهرة", "الإسكندرية", "بيروت", "عمان",
        "الدوحة", "المنامة", "مسقط", "الكويت", "بغداد", "دمشق", "صنعاء"
    ];

    const interests = [
        "التصوير", "الرسم", "الكتابة", "القراءة", "الموسيقى", "التصميم", "الطبخ",
        "السفر", "اليوغا", "التطوع", "الرياضة", "التعليم", "الفن", "التكنولوجيا", "الأعمال"
    ];

    allProfiles = [];
    for (let i = 1; i <= CONFIG.TOTAL_IMAGES; i++) {
        const profile = {
            id: i,
            name: arabicNames[Math.floor(Math.random() * arabicNames.length)],
            age: Math.floor(Math.random() * (35 - 18 + 1)) + 18,
            location: cities[Math.floor(Math.random() * cities.length)],
            interests: getRandomInterests(interests)
        };
        allProfiles.push(profile);
    }
    
    filteredProfiles = [...allProfiles];
    return allProfiles;
}

// Get random interests
function getRandomInterests(interests) {
    const numInterests = Math.floor(Math.random() * 3) + 2;
    const selectedInterests = new Set();
    while (selectedInterests.size < numInterests) {
        selectedInterests.add(interests[Math.floor(Math.random() * interests.length)]);
    }
    return Array.from(selectedInterests).join('، ');
}

// Create gallery item with optimized image loading
async function createGalleryItem(profile) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const link = document.createElement('a');
    link.href = `profile.html?id=${profile.id}&name=${encodeURIComponent(profile.name)}&age=${profile.age}&location=${encodeURIComponent(profile.location)}&interests=${encodeURIComponent(profile.interests)}`;
    link.target = '_blank'; 
    link.rel = 'noopener noreferrer'; 
    
    const img = document.createElement('img');
    img.src = CONFIG.PLACEHOLDER_IMAGE;
    img.alt = profile.name;
    img.loading = 'lazy';
    
    const info = document.createElement('div');
    info.className = 'item-info';
    info.innerHTML = `
        <h3>${profile.name}</h3>
        <p>${profile.age} سنة</p>
        <p>${profile.location}</p>
    `;
    
    link.appendChild(img);
    link.appendChild(info);
    item.appendChild(link);
    
    // Load the actual image
    const actualImg = new Image();
    actualImg.onload = () => {
        img.src = `${CONFIG.IMAGE_BASE_PATH}${profile.id}${CONFIG.IMAGE_EXTENSION}`;
        img.classList.add('loaded');
    };
    actualImg.onerror = () => {
        console.error(`Failed to load image: ${profile.id}`);
        img.classList.add('placeholder');
    };
    actualImg.src = `${CONFIG.IMAGE_BASE_PATH}${profile.id}${CONFIG.IMAGE_EXTENSION}`;
    
    return item;
}

// Display gallery items with optimized loading
async function displayGalleryItems() {
    toggleLoading(true);
    const gallery = document.querySelector('.gallery-grid');
    gallery.innerHTML = '';
    
    const startIndex = (currentPage - 1) * CONFIG.IMAGES_PER_PAGE;
    const endIndex = Math.min(startIndex + CONFIG.IMAGES_PER_PAGE, filteredProfiles.length);
    
    try {
        const items = await Promise.all(
            filteredProfiles
                .slice(startIndex, endIndex)
                .map(profile => createGalleryItem(profile))
        );
        
        const fragment = document.createDocumentFragment();
        items.forEach(item => fragment.appendChild(item));
        gallery.appendChild(fragment);
        
        updatePagination();
    } catch (error) {
        showError('حدث خطأ أثناء تحميل الصور. يرجى المحاولة مرة أخرى.');
    } finally {
        toggleLoading(false);
    }
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredProfiles.length / CONFIG.IMAGES_PER_PAGE);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    
    const prevButton = document.createElement('button');
    prevButton.textContent = 'السابق';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevButton);
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? 'active' : '';
        pageButton.onclick = () => changePage(i);
        pagination.appendChild(pageButton);
    }
    
    const nextButton = document.createElement('button');
    nextButton.textContent = 'التالي';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextButton);
}

// Change page with smooth scrolling
function changePage(page) {
    currentPage = page;
    displayGalleryItems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter profiles
function filterProfiles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const ageFilter = document.getElementById('ageFilter').value;
    
    filteredProfiles = allProfiles.filter(profile => {
        const matchesSearch = profile.name.toLowerCase().includes(searchInput) ||
                            profile.interests.toLowerCase().includes(searchInput);
        const matchesLocation = !locationFilter || profile.location === locationFilter;
        const matchesAge = !ageFilter || profile.age.toString() === ageFilter;
        
        return matchesSearch && matchesLocation && matchesAge;
    });
    
    currentPage = 1;
    displayGalleryItems();
}

// Populate filters
function populateFilters() {
    const locations = new Set(allProfiles.map(p => p.location));
    const ages = new Set(allProfiles.map(p => p.age));
    
    const locationFilter = document.getElementById('locationFilter');
    const ageFilter = document.getElementById('ageFilter');
    
    locationFilter.innerHTML = '<option value="">جميع المدن</option>';
    ageFilter.innerHTML = '<option value="">جميع الأعمار</option>';
    
    [...locations].sort().forEach(location => {
        locationFilter.innerHTML += `<option value="${location}">${location}</option>`;
    });
    
    [...ages].sort((a, b) => a - b).forEach(age => {
        ageFilter.innerHTML += `<option value="${age}">${age} سنة</option>`;
    });
}

// Refresh gallery with optimized loading
async function refreshGallery() {
    imageLoadPromises.clear();
    toggleLoading(true);
    try {
        generateProfiles();
        populateFilters();
        await displayGalleryItems();
        showError('تم تحديث المعرض بنجاح');
    } catch (error) {
        showError('حدث خطأ أثناء تحديث المعرض');
    } finally {
        toggleLoading(false);
    }
}

// Initialize gallery with WebP support check
async function initGallery() {
    toggleLoading(true);
    try {
        const hasWebPSupport = await checkWebPSupport();
        if (!hasWebPSupport) {
            console.warn('WebP not supported, using fallback images');
        }
        
        generateProfiles();
        populateFilters();
        await displayGalleryItems();
    } catch (error) {
        showError('حدث خطأ أثناء تحميل المعرض');
    } finally {
        toggleLoading(false);
    }
    
    // Add event listeners
    document.getElementById('searchInput').addEventListener('input', filterProfiles);
    document.getElementById('locationFilter').addEventListener('change', filterProfiles);
    document.getElementById('ageFilter').addEventListener('change', filterProfiles);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);
