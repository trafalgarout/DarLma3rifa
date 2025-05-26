$companionPages = @(
    "business-thinker.html",
    "emotional-intelligence.html",
    "future-friend.html",
    "knowledge-explorer.html",
    "language-assistant.html",
    "nutrition-doctor.html",
    "programming-partner.html",
    "quran-companion.html",
    "relationship-guide.html",
    "study-advisor.html",
    "tech-ambassador.html",
    "wisdom-companion.html"
)

foreach ($page in $companionPages) {
    Write-Host "Updating $page..."
    
    # Read the content of the file
    $content = Get-Content -Path $page -Raw -Encoding UTF8
    
    # Update the head section
    $content = $content -replace '<head>[\s\S]*?</head>', @'
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Language" content="ar, en, fr">
    <title>دار المعرفة | AI Companions</title>
    <!-- Language Alternates -->
    <link rel="alternate" hreflang="ar" href="$page?lang=ar">
    <link rel="alternate" hreflang="en" href="$page?lang=en">
    <link rel="alternate" hreflang="fr" href="$page?lang=fr">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Favicon -->
    <link rel="icon" href="blog/images/my-ia-logo.png" type="image/png">
</head>
'@
    
    # Update the logo
    $content = $content -replace '<a class="navbar-brand" href="index.html">[\s\S]*?</a>', '<a class="navbar-brand" href="index.html"><img src="blog/images/my-ia-logo.png" alt="Darlma3rifa Logo" class="logo-img"></a>'
    
    # Update the navigation menu
    $navPattern = '<div class="collapse navbar-collapse" id="navbarNav">[\s\S]*?</div>'
    $newNav = @'
<div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto">
        <li class="nav-item">
            <a class="nav-link" href="index.html">الرئيسية</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                رفقاء الذكاء الاصطناعي
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="fitness-coach.html">رفيق اللياقة</a></li>
                <li><a class="dropdown-item" href="math-helper.html">معين الرياضيات</a></li>
                <li><a class="dropdown-item" href="mental-wellness.html">الصديق النفسي</a></li>
                <li><a class="dropdown-item" href="language-assistant.html">مساعد اللغة</a></li>
                <li><a class="dropdown-item" href="relationship-guide.html">دليل العلاقات</a></li>
                <li><a class="dropdown-item" href="wisdom-companion.html">رفيق الحكمة</a></li>
                <li><a class="dropdown-item" href="business-thinker.html">مفكر الأعمال</a></li>
                <li><a class="dropdown-item" href="quran-companion.html">رفيق القرآن</a></li>
                <li><a class="dropdown-item" href="study-advisor.html">مستشار الدراسة</a></li>
                <li><a class="dropdown-item" href="emotional-intelligence.html">معالج الذكاء العاطفي</a></li>
                <li><a class="dropdown-item" href="tech-ambassador.html">سفير التقنية</a></li>
                <li><a class="dropdown-item" href="programming-partner.html">رفيق البرمجة</a></li>
                <li><a class="dropdown-item" href="nutrition-doctor.html">طبيب الغذاء</a></li>
                <li><a class="dropdown-item" href="knowledge-explorer.html">مستكشف المعرفة</a></li>
                <li><a class="dropdown-item" href="future-friend.html">صديق المستقبل</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="about.html">من نحن</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="articles.html">المقالات</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="contact.html">اتصل بنا</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span id="language-toggle">العربية</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="languageDropdown">
                <li><a class="dropdown-item" href="#" data-lang="ar">العربية</a></li>
            </ul>
        </li>
    </ul>
</div>
'@
    
    $content = $content -replace $navPattern, $newNav
    
    # Set the active menu item based on the current page
    $pageName = $page -replace '\.html$', ''
    $content = $content -replace "href=`"$page`">", "href=`"$page`" class=`"active`">"
    
    # Write the updated content back to the file
    $content | Set-Content -Path $page -Encoding UTF8
    
    Write-Host "Updated $page successfully."
}

Write-Host "All AI companion pages have been updated with standardized headers."
