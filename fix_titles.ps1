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

# Mapping of page names to proper Arabic titles
$titleMap = @{
    "business-thinker.html" = "مفكر الأعمال | دار المعرفة"
    "emotional-intelligence.html" = "معالج الذكاء العاطفي | دار المعرفة"
    "future-friend.html" = "صديق المستقبل | دار المعرفة"
    "knowledge-explorer.html" = "مستكشف المعرفة | دار المعرفة"
    "language-assistant.html" = "مساعد اللغة | دار المعرفة"
    "mental-wellness.html" = "الصديق النفسي | دار المعرفة"
    "nutrition-doctor.html" = "طبيب الغذاء | دار المعرفة"
    "programming-partner.html" = "رفيق البرمجة | دار المعرفة"
    "quran-companion.html" = "رفيق القرآن | دار المعرفة"
    "relationship-guide.html" = "دليل العلاقات | دار المعرفة"
    "study-advisor.html" = "مستشار الدراسة | دار المعرفة"
    "tech-ambassador.html" = "سفير التقنية | دار المعرفة"
    "wisdom-companion.html" = "رفيق الحكمة | دار المعرفة"
    "fitness-coach.html" = "رفيق اللياقة | دار المعرفة"
}

foreach ($page in $companionPages) {
    Write-Host "Fixing title in $page..."
    
    # Get the correct title for this page
    $correctTitle = $titleMap[$page]
    
    # Read the content of the file
    $content = Get-Content -Path $page -Raw -Encoding UTF8
    
    # Replace the title tag
    $pattern = '<title>.*?</title>'
    $replacement = "<title>$correctTitle</title>"
    
    $newContent = $content -replace $pattern, $replacement
    
    # Write the updated content back to the file
    $newContent | Set-Content -Path $page -Encoding UTF8
    
    Write-Host "Fixed title in $page successfully."
}

Write-Host "All AI companion page titles have been updated with correct encoding."
