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
            <div class="ad-container ad-header my-4" id="ad-container-1">
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
            <div class="ad-container ad-section-break my-5" id="ad-container-2">
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
            <div class="ad-container ad-in-content my-4" id="ad-container-3">
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
            <div class="ad-container ad-pre-cta my-5" id="ad-container-4">
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
            <div class="ad-container ad-pre-footer my-5" id="ad-container-5">
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
            <div class="ad-container ad-in-modal my-4" id="ad-container-6">
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
        
        // Also add ads to companion cards when displayed
        placeCompanionCardAds();
    }
    
    /**
     * Places ads in strategic locations throughout the page
     */
    function placeAds() {
        // 1. Place header ad (Ad 1) after the navigation
        const navbar = document.querySelector('nav.navbar');
        if (navbar && ads[0]) {
            insertAdAfterElement(navbar, ads[0]);
            initializeAd(document.querySelector('#ad-container-1 ins'));
        }
        
        // 2. Place ad between Features and AI Comparison sections (Ad 2)
        const featuresSection = document.querySelector('.features-section');
        if (featuresSection && ads[1]) {
            insertAdAfterElement(featuresSection, ads[1]);
            initializeAd(document.querySelector('#ad-container-2 ins'));
        }
        
        // 3. Place ad inside the comparison tool (Ad 3)
        const comparisonResults = document.querySelector('.comparison-results');
        if (comparisonResults && ads[2]) {
            insertAdAfterElement(comparisonResults, ads[2]);
            initializeAd(document.querySelector('#ad-container-3 ins'));
        }
        
        // 4. Place ad before the CTA section (Ad 4)
        const featuredCompanions = document.querySelector('.featured-companions');
        if (featuredCompanions && ads[3]) {
            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                insertAdBeforeElement(ctaSection, ads[3]);
                initializeAd(document.querySelector('#ad-container-4 ins'));
            }
        }
        
        // 5. Place ad before the footer (Ad 5)
        const footer = document.querySelector('footer');
        if (footer && ads[4]) {
            insertAdBeforeElement(footer, ads[4]);
            initializeAd(document.querySelector('#ad-container-5 ins'));
        }
    }
    
    /**
     * Places ads in companion cards
     */
    function placeCompanionCardAds() {
        const companionCards = document.querySelectorAll('.companion-card');
        if (companionCards.length > 0) {
            // Add ad after the second companion card if available
            if (companionCards.length > 1) {
                const adId1 = 'companion-ad-' + Math.random().toString(36).substring(2, 10);
                const adHtml1 = ads[1].replace('ad-container-2', adId1);
                insertAdAfterElement(companionCards[1], adHtml1);
                initializeAd(document.querySelector('#' + adId1 + ' ins'));
            }
            
            // Add ad after the last companion card
            const adId2 = 'companion-ad-' + Math.random().toString(36).substring(2, 10);
            const adHtml2 = ads[4].replace('ad-container-5', adId2);
            insertAdAfterElement(companionCards[companionCards.length - 1], adHtml2);
            initializeAd(document.querySelector('#' + adId2 + ' ins'));
        }
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
                            // Generate unique ID for this ad
                            const adId1 = 'modal-ad-' + Math.random().toString(36).substring(2, 10);
                            const adHtml1 = ads[2].replace('ad-container-3', adId1);
                            insertAdAfterElement(paragraphs[1], adHtml1);
                            initializeAd(modal.querySelector('#' + adId1 + ' ins'));
                        }
                        
                        // Place second ad after the fifth paragraph if available
                        if (paragraphs.length > 5) {
                            // Generate unique ID for this ad
                            const adId2 = 'modal-ad-' + Math.random().toString(36).substring(2, 10);
                            const adHtml2 = ads[5].replace('ad-container-6', adId2);
                            insertAdAfterElement(paragraphs[4], adHtml2);
                            initializeAd(modal.querySelector('#' + adId2 + ' ins'));
                        }
                        
                        // Place third ad before the conclusion if available
                        const conclusion = articleBody.querySelector('.conclusion');
                        if (conclusion) {
                            // Generate unique ID for this ad
                            const adId3 = 'modal-ad-' + Math.random().toString(36).substring(2, 10);
                            const adHtml3 = ads[3].replace('ad-container-4', adId3);
                            insertAdBeforeElement(conclusion, adHtml3);
                            initializeAd(modal.querySelector('#' + adId3 + ' ins'));
                        } else if (paragraphs.length > 8) {
                            // If no conclusion section, place before the last paragraph
                            // Generate unique ID for this ad
                            const adId3 = 'modal-ad-' + Math.random().toString(36).substring(2, 10);
                            const adHtml3 = ads[3].replace('ad-container-4', adId3);
                            insertAdBeforeElement(paragraphs[paragraphs.length - 1], adHtml3);
                            initializeAd(modal.querySelector('#' + adId3 + ' ins'));
                        }
                    }
                }
                
                // For all other modals (companion modals, etc.)
                else {
                    const modalBody = modal.querySelector('.modal-body');
                    if (modalBody) {
                        // Generate unique ID for this ad
                        const adId = 'modal-ad-' + Math.random().toString(36).substring(2, 10);
                        const adHtml = ads[5].replace('ad-container-6', adId);
                        modalBody.insertAdjacentHTML('beforeend', adHtml);
                        initializeAd(modal.querySelector('#' + adId + ' ins'));
                    }
                }
            }
        });
    }
    
    /**
     * Helper function to insert ad after an element
     */
    function insertAdAfterElement(element, adHtml) {
        if (element && element.parentNode) {
            const adContainer = document.createElement('div');
            adContainer.innerHTML = adHtml;
            element.parentNode.insertBefore(adContainer.firstElementChild, element.nextSibling);
        }
    }
    
    /**
     * Helper function to insert ad before an element
     */
    function insertAdBeforeElement(element, adHtml) {
        if (element && element.parentNode) {
            const adContainer = document.createElement('div');
            adContainer.innerHTML = adHtml;
            element.parentNode.insertBefore(adContainer.firstElementChild, element);
        }
    }
    
    /**
     * Helper function to initialize an ad
     */
    function initializeAd(adElement) {
        if (adElement && window.adsbygoogle) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('Error initializing ad:', e);
            }
        }
    }
});
