/**
 * Strategic Ad Placement Script
 * This script places Google AdSense ads in strategic locations throughout the website
 * for optimal visibility and user experience.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only load ads if not in a development environment
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Load the Google AdSense script once
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6865939387108271';
        adScript.crossOrigin = 'anonymous';
        document.head.appendChild(adScript);
        
        // Initialize ads array with all ad codes
        const ads = [
            // Ad 1 - Header Ad (below navigation)
            `<!-- AI ADS 1 -->
            <div class="ad-container ad-header my-4">
                <div class="text-center">
                    <small class="text-muted d-block mb-1">إعلان</small>
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6865939387108271"
                        data-ad-slot="7352451765"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>`,
            
            // Ad 2 - Between Features and AI Comparison sections
            `<!-- AI ADS 2 -->
            <div class="ad-container ad-section-break my-5">
                <div class="text-center">
                    <small class="text-muted d-block mb-1">إعلان</small>
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6865939387108271"
                        data-ad-slot="8056009400"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>`,
            
            // Ad 3 - Inside the comparison tool (after the table)
            `<!-- AI ADS 3 -->
            <div class="ad-container ad-in-content my-4">
                <div class="text-center">
                    <small class="text-muted d-block mb-1">إعلان</small>
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6865939387108271"
                        data-ad-slot="3281344818"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>`,
            
            // Ad 4 - Before the CTA section
            `<!-- AI ADS 4 -->
            <div class="ad-container ad-pre-cta my-5">
                <div class="text-center">
                    <small class="text-muted d-block mb-1">إعلان</small>
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6865939387108271"
                        data-ad-slot="4240646223"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>`,
            
            // Ad 5 - Before Footer
            `<!-- AI ADS 5 -->
            <div class="ad-container ad-pre-footer my-5">
                <div class="text-center">
                    <small class="text-muted d-block mb-1">إعلان</small>
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6865939387108271"
                        data-ad-slot="2927564558"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>`,
            
            // Ad 6 - Inside modals (article modals)
            `<!-- AI ADS 6 -->
            <div class="ad-container ad-in-modal my-4">
                <div class="text-center">
                    <small class="text-muted d-block mb-1">إعلان</small>
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6865939387108271"
                        data-ad-slot="8342099801"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>`
        ];
        
        // Place ads in strategic locations
        placeAds();
        
        // Also place ads when modals are opened
        setupModalAdPlacements();
    }
    
    /**
     * Places ads in strategic locations throughout the page
     */
    function placeAds() {
        // 1. Place header ad (Ad 1) after the navigation
        const navbar = document.querySelector('nav.navbar');
        if (navbar && ads[0]) {
            insertAdAfterElement(navbar, ads[0]);
        }
        
        // 2. Place ad between Features and AI Comparison sections (Ad 2)
        const featuresSection = document.querySelector('.features-section');
        if (featuresSection && ads[1]) {
            insertAdAfterElement(featuresSection, ads[1]);
        }
        
        // 3. Place ad inside the comparison tool (Ad 3)
        const comparisonResults = document.querySelector('.comparison-results');
        if (comparisonResults && ads[2]) {
            insertAdAfterElement(comparisonResults, ads[2]);
        }
        
        // 4. Place ad before the CTA section (Ad 4)
        const featuredCompanions = document.querySelector('.featured-companions');
        if (featuredCompanions && ads[3]) {
            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                insertAdBeforeElement(ctaSection, ads[3]);
            }
        }
        
        // 5. Place ad before the footer (Ad 5)
        const footer = document.querySelector('footer');
        if (footer && ads[4]) {
            insertAdBeforeElement(footer, ads[4]);
        }
        
        // Initialize all ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
    
    /**
     * Sets up ad placements for modals when they're opened
     */
    function setupModalAdPlacements() {
        // Place ads in all modals
        document.addEventListener('shown.bs.modal', function(event) {
            const modal = event.target;
            
            // Check if this is any modal
            if (modal.classList.contains('modal')) {
                // For article modals with article-content
                if (modal.querySelector('.article-content')) {
                    const articleBody = modal.querySelector('.article-body');
                    if (articleBody) {
                        // Find paragraphs to place ads between
                        const paragraphs = articleBody.querySelectorAll('p');
                        
                        // Place first ad after the second paragraph if available
                        if (paragraphs.length > 2) {
                            insertAdAfterElement(paragraphs[1], ads[2]);
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        }
                        
                        // Place second ad after the fifth paragraph if available
                        if (paragraphs.length > 5) {
                            insertAdAfterElement(paragraphs[4], ads[5]);
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        }
                        
                        // Place third ad before the conclusion if available
                        const conclusion = articleBody.querySelector('.conclusion');
                        if (conclusion) {
                            insertAdBeforeElement(conclusion, ads[3]);
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        } else if (paragraphs.length > 8) {
                            // If no conclusion section, place before the last paragraph
                            insertAdBeforeElement(paragraphs[paragraphs.length - 1], ads[3]);
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        }
                    }
                }
                
                // For all other modals (companion modals, etc.)
                else {
                    const modalBody = modal.querySelector('.modal-body');
                    if (modalBody) {
                        // Add ad at the bottom of the modal body
                        modalBody.insertAdjacentHTML('beforeend', ads[5]);
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    }
                }
            }
        });
        
        // Also add ads to companion cards when displayed
        const companionCards = document.querySelectorAll('.companion-card');
        if (companionCards.length > 0) {
            // Add ad after the second companion card if available
            if (companionCards.length > 1) {
                insertAdAfterElement(companionCards[1], ads[1]);
            }
            
            // Add ad after the last companion card
            insertAdAfterElement(companionCards[companionCards.length - 1], ads[4]);
        }
    }
    
    /**
     * Helper function to insert ad after an element
     */
    function insertAdAfterElement(element, adHtml) {
        if (!element) return;
        
        const adContainer = document.createElement('div');
        adContainer.innerHTML = adHtml;
        element.parentNode.insertBefore(adContainer, element.nextSibling);
    }
    
    /**
     * Helper function to insert ad before an element
     */
    function insertAdBeforeElement(element, adHtml) {
        if (!element) return;
        
        const adContainer = document.createElement('div');
        adContainer.innerHTML = adHtml;
        element.parentNode.insertBefore(adContainer, element);
    }
});
