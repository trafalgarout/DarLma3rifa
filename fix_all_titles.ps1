# Fix titles in all AI companion pages
$pageTitles = @{
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

foreach ($page in $pageTitles.Keys) {
    Write-Host "Updating title for $page..."
    
    # Skip if file doesn't exist
    if (-not (Test-Path $page)) {
        Write-Host "File $page not found, skipping."
        continue
    }
    
    $content = Get-Content -Path $page -Encoding UTF8
    $newContent = @()
    $titleUpdated = $false
    
    foreach ($line in $content) {
        if ($line -match "<title>" -and -not $titleUpdated) {
            $newContent += "    <title>$($pageTitles[$page])</title>"
            $titleUpdated = $true
        } else {
            $newContent += $line
        }
    }
    
    $newContent | Set-Content -Path $page -Encoding UTF8
    Write-Host "Updated title for $page successfully."
}

Write-Host "All titles have been updated."
