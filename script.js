// Function to extract image URL from content
function extractImageUrl(content) {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
}

// Function to fetch blog posts from RSS feed
async function fetchBlogPosts() {
    // Modified URL to get maximum posts (max-results=400)
    const rssUrl = 'https://9alamkom.blogspot.com/feeds/posts/default?alt=rss&max-results=400';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    try {
        const response = await fetch(corsProxy + encodeURIComponent(rssUrl));
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        
        const posts = [];
        // Changed to get up to 400 posts
        for (let i = 0; i < Math.min(items.length, 400); i++) {
            const item = items[i];
            const title = item.getElementsByTagName('title')[0]?.textContent || '';
            const link = item.getElementsByTagName('link')[0]?.textContent || '';
            const content = item.getElementsByTagName('description')[0]?.textContent || '';
            const image = extractImageUrl(content) || `https://picsum.photos/400/500?random=${i}`;
            
            posts.push({ title, link, image });
        }
        
        // Shuffle the posts for variety
        for (let i = posts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [posts[i], posts[j]] = [posts[j], posts[i]];
        }
        
        return posts;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return [];
    }
}

// Function to create an AdSense in-feed ad
function createInFeedAd() {
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-container-infeed';
    adContainer.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-format="fluid"
             data-ad-layout-key="-gw-3+1f-3d+2z"
             data-ad-client="ca-pub-6865939387108271"
             data-ad-slot="8954256822"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;
    return adContainer;
}

// Function to create thumbnail elements
async function createThumbnails() {
    const grid = document.querySelector('.thumbnail-grid');
    grid.innerHTML = '<div id="loading">جاري التحميل...</div>';
    
    try {
        const posts = await fetchBlogPosts();
        grid.innerHTML = ''; // Clear loading message
        
        if (posts.length === 0) {
            grid.innerHTML = '<div class="error">عذراً، لم نتمكن من تحميل المقالات</div>';
            return;
        }
        
        posts.forEach((post, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `
                <a href="${post.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${post.image}" alt="${post.title}" onerror="this.src='https://picsum.photos/400/500?random=${index}'">
                    <div class="info">
                        <h3>${post.title}</h3>
                        <p>مقال ${index + 1} من ${posts.length}</p>
                    </div>
                </a>
            `;
            grid.appendChild(thumbnail);

            // Insert an ad after every 12 thumbnails
            if ((index + 1) % 12 === 0 && index < posts.length - 1) {
                grid.appendChild(createInFeedAd());
            }
        });

        // Update the header with post count
        const header = document.querySelector('header p');
        header.textContent = `${posts.length} مقال متاح للقراءة من مدونة عالمكم`;
        
    } catch (error) {
        grid.innerHTML = '<div class="error">عذراً، حدث خطأ أثناء تحميل المقالات</div>';
        console.error('Error:', error);
    }
}

// Initialize thumbnails when the page loads
document.addEventListener('DOMContentLoaded', createThumbnails);
