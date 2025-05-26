// This script will help fix the future-friend.html page
// Run this in the browser console when viewing the page

document.addEventListener('DOMContentLoaded', function() {
    // Remove any old chatbot script
    const oldScripts = document.querySelectorAll('script:not([src])');
    oldScripts.forEach(script => {
        if (script.textContent.includes('addMessage') && 
            !script.textContent.includes('openRouterApiKey')) {
            script.remove();
        }
    });
    
    console.log('Old chatbot script removed');
});
