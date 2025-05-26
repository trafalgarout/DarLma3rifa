# List of AI companion pages to update
$companionPages = @(
    "business-thinker.html",
    "emotional-intelligence.html",
    "future-friend.html",
    "knowledge-explorer.html",
    "language-assistant.html",
    "mental-wellness.html",
    "nutrition-doctor.html",
    "programming-partner.html",
    "quran-companion.html",
    "relationship-guide.html",
    "study-advisor.html",
    "tech-ambassador.html",
    "wisdom-companion.html",
    "fitness-coach.html"
)

# Get the correct menu content
$correctMenu = Get-Content -Path "fix_menu.html" -Raw -Encoding UTF8

foreach ($page in $companionPages) {
    Write-Host "Fixing menu in $page..."
    
    # Read the content of the file
    $content = Get-Content -Path $page -Raw -Encoding UTF8
    
    # Replace the navigation menu section
    $pattern = '<div class="collapse navbar-collapse" id="navbarNav">[\s\S]*?</div>\s*</div>\s*</nav>'
    $replacement = "$correctMenu`n            </div>`n        </nav>"
    
    $newContent = $content -replace $pattern, $replacement
    
    # Write the updated content back to the file
    $newContent | Set-Content -Path $page -Encoding UTF8
    
    Write-Host "Fixed menu in $page successfully."
}

Write-Host "All AI companion pages have been updated with correct menu encoding."
