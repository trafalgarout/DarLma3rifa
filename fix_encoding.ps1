# Fix encoding issues in AI companion pages
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

# Correct Arabic text for menu items
$menuItems = @{
    "الرئيسية" = "الرئيسية"
    "رفقاء الذكاء الاصطناعي" = "رفقاء الذكاء الاصطناعي"
    "رفيق اللياقة" = "رفيق اللياقة"
    "معين الرياضيات" = "معين الرياضيات"
    "الصديق النفسي" = "الصديق النفسي"
    "مساعد اللغة" = "مساعد اللغة"
    "دليل العلاقات" = "دليل العلاقات"
    "رفيق الحكمة" = "رفيق الحكمة"
    "مفكر الأعمال" = "مفكر الأعمال"
    "رفيق القرآن" = "رفيق القرآن"
    "مستشار الدراسة" = "مستشار الدراسة"
    "معالج الذكاء العاطفي" = "معالج الذكاء العاطفي"
    "سفير التقنية" = "سفير التقنية"
    "رفيق البرمجة" = "رفيق البرمجة"
    "طبيب الغذاء" = "طبيب الغذاء"
    "مستكشف المعرفة" = "مستكشف المعرفة"
    "صديق المستقبل" = "صديق المستقبل"
    "من نحن" = "من نحن"
    "المقالات" = "المقالات"
    "اتصل بنا" = "اتصل بنا"
    "العربية" = "العربية"
}

foreach ($page in $companionPages) {
    Write-Host "Fixing encoding in $page..."
    
    # Get the content of the file
    $content = Get-Content -Path $page -Encoding UTF8
    
    # Create a new file with correct encoding
    $newContent = @()
    
    foreach ($line in $content) {
        # Fix encoding issues in navigation menu
        foreach ($key in $menuItems.Keys) {
            if ($line -match "Ø|Ù|Ø§|Ù„|Ø±|ÙŠ|Ø¦|Ø³|Ø©|Ù†|Ø­|Ø¹|Ø¨|Øª|Ù…|Ø¯|Ø°|Ù‚|Ø·|Ø¸|Ø´|Øµ|Ø¶|Ù|Ø¬|Ø²|Ùˆ|Ø§|Ø¤|Ø¥|Ø£|Ù‰|Ø¢") {
                $line = $line -replace "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©", "الرئيسية"
                $line = $line -replace "Ø±ÙÙ‚Ø§Ø¡ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ", "رفقاء الذكاء الاصطناعي"
                $line = $line -replace "Ø±ÙÙŠÙ‚ Ø§Ù„Ù„ÙŠØ§Ù‚Ø©", "رفيق اللياقة"
                $line = $line -replace "Ù…Ø¹ÙŠÙ† Ø§Ù„Ø±ÙŠØ§Ø¶ÙŠØ§Øª", "معين الرياضيات"
                $line = $line -replace "Ø§Ù„ØµØ¯ÙŠÙ‚ Ø§Ù„Ù†ÙØ³ÙŠ", "الصديق النفسي"
                $line = $line -replace "Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ù„ØºØ©", "مساعد اللغة"
                $line = $line -replace "Ø¯Ù„ÙŠÙ„ Ø§Ù„Ø¹Ù„Ø§Ù‚Ø§Øª", "دليل العلاقات"
                $line = $line -replace "Ø±ÙÙŠÙ‚ Ø§Ù„Ø­ÙƒÙ…Ø©", "رفيق الحكمة"
                $line = $line -replace "Ù…ÙÙƒØ± Ø§Ù„Ø£Ø¹Ù…Ø§Ù„", "مفكر الأعمال"
                $line = $line -replace "Ø±ÙÙŠÙ‚ Ø§Ù„Ù‚Ø±Ø¢Ù†", "رفيق القرآن"
                $line = $line -replace "Ù…Ø³ØªØ´Ø§Ø± Ø§Ù„Ø¯Ø±Ø§Ø³Ø©", "مستشار الدراسة"
                $line = $line -replace "Ù…Ø¹Ø§Ù„Ø¬ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø¹Ø§Ø·ÙÙŠ", "معالج الذكاء العاطفي"
                $line = $line -replace "Ø³ÙÙŠØ± Ø§Ù„ØªÙ‚Ù†ÙŠØ©", "سفير التقنية"
                $line = $line -replace "Ø±ÙÙŠÙ‚ Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©", "رفيق البرمجة"
                $line = $line -replace "Ø·Ø¨ÙŠØ¨ Ø§Ù„ØºØ°Ø§Ø¡", "طبيب الغذاء"
                $line = $line -replace "Ù…Ø³ØªÙƒØ´Ù Ø§Ù„Ù…Ø¹Ø±ÙØ©", "مستكشف المعرفة"
                $line = $line -replace "ØµØ¯ÙŠÙ‚ Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„", "صديق المستقبل"
                $line = $line -replace "Ù…Ù† Ù†Ø­Ù†", "من نحن"
                $line = $line -replace "Ø§Ù„Ù…Ù‚Ø§Ù„Ø§Øª", "المقالات"
                $line = $line -replace "Ø§ØªØµÙ„ Ø¨Ù†Ø§", "اتصل بنا"
                $line = $line -replace "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©", "العربية"
            }
        }
        
        $newContent += $line
    }
    
    # Save the file with UTF-8 encoding
    $newContent | Out-File -FilePath $page -Encoding UTF8
    
    Write-Host "Fixed encoding in $page successfully."
}

Write-Host "All AI companion pages have been updated with correct encoding."
