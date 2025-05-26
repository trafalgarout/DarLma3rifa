/**
 * Darlma3rifa - The Home of Wisdom
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detect user's country and set language automatically
    detectUserCountry();
    
    // Language Switcher
    const languageLinks = document.querySelectorAll('.dropdown-item[data-lang]');
    
    if (languageLinks.length > 0) {
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
    }
    
    // Check for language parameter in URL
    function getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }
    
    // Set language from URL parameter if present
    const urlLang = getLanguageFromURL();
    if (urlLang && ['ar', 'en', 'fr'].includes(urlLang)) {
        setLanguage(urlLang);
    }
    
    // Function to detect user's country and set language
    function detectUserCountry() {
        // Use the ipinfo.io API to get user's location
        fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN')
            .then(response => response.json())
            .then(data => {
                const country = data.country;
                
                // Set language based on country
                if (country === 'FR') {
                    setLanguage('fr');
                } else if (country === 'US' || country === 'GB') {
                    setLanguage('en');
                } else {
                    // Default to Arabic for all other countries
                    setLanguage('ar');
                }
            })
            .catch(error => {
                console.error('Error detecting country:', error);
                // Default to Arabic if detection fails
                setLanguage('ar');
            });
    }
    
    // Function to set the language
    function setLanguage(lang) {
        if (lang === 'ar') {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            if (document.getElementById('language-toggle')) {
                document.getElementById('language-toggle').textContent = 'English';
            }
            loadArabicContent();
        } else if (lang === 'fr') {
            document.documentElement.lang = 'fr';
            document.documentElement.dir = 'ltr';
            if (document.getElementById('language-toggle')) {
                document.getElementById('language-toggle').textContent = 'العربية';
            }
            loadFrenchContent();
        } else {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
            if (document.getElementById('language-toggle')) {
                document.getElementById('language-toggle').textContent = 'العربية';
            }
            loadEnglishContent();
        }
    }
    
    // Function to load Arabic content
    function loadArabicContent() {
        // This is where you would load Arabic translations
        // For now, we'll just update some key elements
        
        // Navigation
        updateElementText('.navbar-nav li:nth-child(1) .nav-link', 'الرئيسية');
        updateElementText('.navbar-nav li:nth-child(2) .nav-link', 'رفقاء الذكاء الاصطناعي');
        updateElementText('.navbar-nav li:nth-child(3) .nav-link', 'من نحن');
        updateElementText('.navbar-nav li:nth-child(4) .nav-link', 'المدونة');
        updateElementText('.navbar-nav li:nth-child(5) .nav-link', 'اتصل بنا');
        
        // Dropdown menu
        updateElementText('.dropdown-menu li:nth-child(1) .dropdown-item', 'مدرب اللياقة البدنية');
        updateElementText('.dropdown-menu li:nth-child(2) .dropdown-item', 'معلم الرياضيات');
        updateElementText('.dropdown-menu li:nth-child(3) .dropdown-item', 'دعم الصحة النفسية');
        updateElementText('.dropdown-menu li:nth-child(4) .dropdown-item', 'تعلم اللغات');
        updateElementText('.dropdown-menu li:nth-child(5) .dropdown-item', 'مستشار العلاقات');
        updateElementText('.dropdown-menu li:nth-child(6) .dropdown-item', 'حكمة القرآن');
        
        // Hero section
        updateElementText('.hero-title', 'استكشف الحكمة مع رفقاء الذكاء الاصطناعي');
        updateElementText('.hero-text', 'مرحبًا بك في دار المعرفة - بيت الحكمة. اكتشف طريقة جديدة للتعلم والنمو والحصول على التوجيه من خلال رفقاء الذكاء الاصطناعي المصممين لمساعدتك في مختلف جوانب الحياة.');
        updateElementText('.hero-buttons .btn-primary', 'استكشف رفقاء الذكاء الاصطناعي');
        updateElementText('.hero-buttons .btn-outline-primary', 'اعرف المزيد');
        
        // AI Companions section
        updateElementText('.ai-companions-section .section-header h2', 'رفقاء الذكاء الاصطناعي');
        updateElementText('.ai-companions-section .section-header p', 'اكتشف رفقاء الذكاء الاصطناعي المتخصصين المصممين لمساعدتك في مختلف جوانب الحياة');
        
        // Update companion cards
        const companionTitles = [
            'مدرب اللياقة البدنية',
            'معلم الرياضيات',
            'دعم الصحة النفسية',
            'تعلم اللغات',
            'مستشار العلاقات',
            'حكمة القرآن'
        ];
        
        const companionDescriptions = [
            'احصل على خطط تمارين مخصصة ونصائح غذائية وإرشادات للياقة البدنية من مدرب اللياقة البدنية الذكي.',
            'حل مسائل الرياضيات وفهم المفاهيم المعقدة وتحسين مهاراتك الرياضية مع معلم الرياضيات الذكي.',
            'احصل على الدعم العاطفي واستراتيجيات التأقلم وتقنيات اليقظة الذهنية مع روبوت دعم الصحة النفسية.',
            'تعلم العربية أو الإنجليزية من خلال محادثات تفاعلية وبناء المفردات ودروس القواعد.',
            'احصل على نصائح حول العلاقات واستراتيجيات التواصل وتقنيات حل النزاعات.',
            'استكشف المعرفة الإسلامية والآيات القرآنية والإرشاد الروحي باحترام ودقة.'
        ];
        
        document.querySelectorAll('.companion-card').forEach((card, index) => {
            if (index < companionTitles.length) {
                card.querySelector('h3').textContent = companionTitles[index];
                card.querySelector('p').textContent = companionDescriptions[index];
                card.querySelector('.btn').textContent = 'تحدث الآن';
            }
        });
        
        // Features section
        updateElementText('.features-section .section-header h2', 'لماذا تختار رفقاء الذكاء الاصطناعي لدينا؟');
        updateElementText('.features-section .section-header p', 'اكتشف الميزات الفريدة التي تميز رفقاء الذكاء الاصطناعي لدينا');
        
        const featureTitles = [
            'محادثات ذكية',
            'خصوصية عالية',
            'دعم ثنائي اللغة'
        ];
        
        const featureDescriptions = [
            'تم تصميم رفقاء الذكاء الاصطناعي لدينا لتوفير محادثات ذكية وهادفة تتكيف مع احتياجاتك.',
            'محادثاتك خاصة وآمنة، مما يضمن بقاء معلوماتك الشخصية سرية.',
            'يدعم جميع رفقاء الذكاء الاصطناعي لدينا اللغتين العربية والإنجليزية، مما يجعلها متاحة لجمهور أوسع.'
        ];
        
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            if (index < featureTitles.length) {
                card.querySelector('h3').textContent = featureTitles[index];
                card.querySelector('p').textContent = featureDescriptions[index];
            }
        });
        
        // Blog section
        updateElementText('.blog-preview-section .section-header h2', 'أحدث المقالات');
        updateElementText('.blog-preview-section .section-header p', 'اقرأ أحدث المقالات والرؤى حول الذكاء الاصطناعي والتنمية الشخصية');
        
        const blogTitles = [
            'كيف يغير الذكاء الاصطناعي تدريب اللياقة البدنية',
            'فوائد تعلم اللغة بمساعدة الذكاء الاصطناعي',
            'دعم الصحة النفسية في العصر الرقمي'
        ];
        
        const blogDescriptions = [
            'اكتشف كيف يغير الذكاء الاصطناعي طريقة تعاملنا مع اللياقة البدنية والصحة.',
            'تعرف على كيف يمكن لرفقاء الذكاء الاصطناعي مساعدتك في إتقان لغة جديدة بشكل أسرع وأكثر فعالية.',
            'استكشف كيف توفر رفقاء الذكاء الاصطناعي دعمًا للصحة النفسية يمكن الوصول إليه للمحتاجين.'
        ];
        
        document.querySelectorAll('.blog-card').forEach((card, index) => {
            if (index < blogTitles.length) {
                card.querySelector('h3').textContent = blogTitles[index];
                card.querySelector('p').textContent = blogDescriptions[index];
                card.querySelector('.read-more').textContent = 'اقرأ المزيد';
            }
        });
        
        // CTA section
        updateElementText('.cta-section h2', 'هل أنت مستعد لاستكشاف الحكمة مع رفقاء الذكاء الاصطناعي لدينا؟');
        updateElementText('.cta-section p', 'ابدأ رحلتك نحو المعرفة والنمو وتحسين الذات اليوم.');
        updateElementText('.cta-section .btn', 'ابدأ الآن');
        
        // Footer
        updateElementText('.footer p', 'بيت الحكمة - استكشف المعرفة والنمو من خلال رفقاء الذكاء الاصطناعي لدينا.');
        updateElementText('.footer h4:nth-of-type(1)', 'روابط سريعة');
        updateElementText('.footer h4:nth-of-type(2)', 'رفقاء الذكاء الاصطناعي');
        updateElementText('.footer h4:nth-of-type(3)', 'اتصل بنا');
        
        // Footer links
        const footerLinks = document.querySelectorAll('.footer-links');
        if (footerLinks.length >= 1) {
            updateElementText(footerLinks[0].querySelector('li:nth-child(1) a'), 'الرئيسية');
            updateElementText(footerLinks[0].querySelector('li:nth-child(2) a'), 'من نحن');
            updateElementText(footerLinks[0].querySelector('li:nth-child(3) a'), 'المدونة');
            updateElementText(footerLinks[0].querySelector('li:nth-child(4) a'), 'اتصل بنا');
        }
        
        if (footerLinks.length >= 2) {
            updateElementText(footerLinks[1].querySelector('li:nth-child(1) a'), 'مدرب اللياقة البدنية');
            updateElementText(footerLinks[1].querySelector('li:nth-child(2) a'), 'معلم الرياضيات');
            updateElementText(footerLinks[1].querySelector('li:nth-child(3) a'), 'دعم الصحة النفسية');
            updateElementText(footerLinks[1].querySelector('li:nth-child(4) a'), 'تعلم اللغات');
            updateElementText(footerLinks[1].querySelector('li:nth-child(5) a'), 'مستشار العلاقات');
            updateElementText(footerLinks[1].querySelector('li:nth-child(6) a'), 'حكمة القرآن');
        }
        
        // Copyright
        updateElementText('.footer-bottom p', '© 2025 دار المعرفة. جميع الحقوق محفوظة.');
        
        // Footer bottom links
        updateElementText('.footer-bottom-links li:nth-child(1) a', 'سياسة الخصوصية');
        updateElementText('.footer-bottom-links li:nth-child(2) a', 'شروط الخدمة');
    }
    
    // Function to load French content
    function loadFrenchContent() {
        // Navigation
        updateElementText('.navbar-nav li:nth-child(1) .nav-link', 'Accueil');
        updateElementText('.navbar-nav li:nth-child(2) .nav-link', 'Compagnons IA');
        updateElementText('.navbar-nav li:nth-child(3) .nav-link', 'À Propos');
        updateElementText('.navbar-nav li:nth-child(4) .nav-link', 'Blog');
        updateElementText('.navbar-nav li:nth-child(5) .nav-link', 'Contact');
        
        // Dropdown menu
        updateElementText('.dropdown-menu li:nth-child(1) .dropdown-item', 'Coach de Fitness IA');
        updateElementText('.dropdown-menu li:nth-child(2) .dropdown-item', 'Tuteur de Mathématiques IA');
        updateElementText('.dropdown-menu li:nth-child(3) .dropdown-item', 'Soutien à la Santé Mentale');
        updateElementText('.dropdown-menu li:nth-child(4) .dropdown-item', 'Bot d\'Apprentissage des Langues');
        updateElementText('.dropdown-menu li:nth-child(5) .dropdown-item', 'Conseiller en Relations');
        updateElementText('.dropdown-menu li:nth-child(6) .dropdown-item', 'Bot de Sagesse Coranique');
        
        // Hero section
        updateElementText('.hero-title', 'Explorez la Sagesse avec des Compagnons IA');
        updateElementText('.hero-text', 'Bienvenue à Darlma3rifa - La Maison de la Sagesse. Découvrez une nouvelle façon d\'apprendre, de grandir et de trouver des conseils grâce à nos compagnons IA conçus pour vous aider dans divers aspects de la vie.');
        updateElementText('.hero-buttons .btn-primary', 'Explorer les Compagnons IA');
        updateElementText('.hero-buttons .btn-outline-primary', 'En Savoir Plus');
        
        // AI Companions section
        updateElementText('.ai-companions-section .section-header h2', 'Nos Compagnons IA');
        updateElementText('.ai-companions-section .section-header p', 'Découvrez nos compagnons IA spécialisés conçus pour vous aider dans divers aspects de la vie');
        
        // Update companion cards
        const companionTitles = [
            'Coach de Fitness IA',
            'Tuteur de Mathématiques IA',
            'Soutien à la Santé Mentale',
            'Bot d\'Apprentissage des Langues',
            'Conseiller en Relations',
            'Bot de Sagesse Coranique'
        ];
        
        const companionDescriptions = [
            'Obtenez des plans d\'entraînement personnalisés, des conseils nutritionnels et des astuces de fitness de notre Coach de Fitness IA.',
            'Résolvez des problèmes mathématiques, comprenez des concepts complexes et améliorez vos compétences en mathématiques avec notre Tuteur de Mathématiques IA.',
            'Trouvez un soutien émotionnel, des stratégies d\'adaptation et des techniques de pleine conscience avec notre bot de Soutien à la Santé Mentale.',
            'Apprenez l\'arabe ou l\'anglais grâce à des conversations interactives, à l\'enrichissement du vocabulaire et à des leçons de grammaire.',
            'Obtenez des conseils sur les relations, des stratégies de communication et des techniques de résolution de conflits.',
            'Explorez la connaissance islamique, les versets coraniques et les conseils spirituels avec respect et précision.'
        ];
        
        document.querySelectorAll('.companion-card').forEach((card, index) => {
            if (index < companionTitles.length) {
                card.querySelector('h3').textContent = companionTitles[index];
                card.querySelector('p').textContent = companionDescriptions[index];
                card.querySelector('.btn').textContent = 'Discuter Maintenant';
            }
        });
        
        // Features section
        updateElementText('.features-section .section-header h2', 'Pourquoi Choisir Nos Compagnons IA?');
        updateElementText('.features-section .section-header p', 'Découvrez les caractéristiques uniques qui distinguent nos compagnons IA');
        
        const featureTitles = [
            'Conversations Intelligentes',
            'Axé sur la Confidentialité',
            'Support Multilingue'
        ];
        
        const featureDescriptions = [
            'Nos compagnons IA sont conçus pour fournir des conversations intelligentes et significatives qui s\'adaptent à vos besoins.',
            'Vos conversations sont privées et sécurisées, garantissant que vos informations personnelles restent confidentielles.',
            'Tous nos compagnons IA prennent en charge l\'arabe, le français et l\'anglais, les rendant accessibles à un public plus large.'
        ];
        
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            if (index < featureTitles.length) {
                card.querySelector('h3').textContent = featureTitles[index];
                card.querySelector('p').textContent = featureDescriptions[index];
            }
        });
        
        // Blog section
        updateElementText('.blog-preview-section .section-header h2', 'Derniers Articles de Notre Blog');
        updateElementText('.blog-preview-section .section-header p', 'Lisez nos derniers articles et aperçus sur l\'IA et le développement personnel');
        
        const blogTitles = [
            'Comment l\'IA Transforme le Coaching de Fitness',
            'Les Avantages de l\'Apprentissage des Langues Assisté par IA',
            'Soutien à la Santé Mentale à l\'Ère Numérique'
        ];
        
        const blogDescriptions = [
            'Découvrez comment l\'intelligence artificielle révolutionne notre approche du fitness et de la santé.',
            'Apprenez comment les compagnons IA peuvent vous aider à maîtriser une nouvelle langue plus rapidement et plus efficacement.',
            'Explorez comment les compagnons IA fournissent un soutien accessible à la santé mentale pour ceux qui en ont besoin.'
        ];
        
        document.querySelectorAll('.blog-card').forEach((card, index) => {
            if (index < blogTitles.length) {
                card.querySelector('h3').textContent = blogTitles[index];
                card.querySelector('p').textContent = blogDescriptions[index];
                card.querySelector('.read-more').textContent = 'Lire Plus';
            }
        });
        
        // CTA section
        updateElementText('.cta-section h2', 'Prêt à Explorer la Sagesse avec Nos Compagnons IA?');
        updateElementText('.cta-section p', 'Commencez votre voyage vers la connaissance, la croissance et l\'amélioration de soi aujourd\'hui.');
        updateElementText('.cta-section .btn', 'Commencer Maintenant');
        
        // Footer
        updateElementText('.footer p', 'La Maison de la Sagesse - Explorez la connaissance et la croissance grâce à nos compagnons IA.');
        updateElementText('.footer h4:nth-of-type(1)', 'Liens Rapides');
        updateElementText('.footer h4:nth-of-type(2)', 'Compagnons IA');
        updateElementText('.footer h4:nth-of-type(3)', 'Contactez-Nous');
        
        // Footer links
        const footerLinks = document.querySelectorAll('.footer-links');
        if (footerLinks.length >= 1) {
            updateElementText(footerLinks[0].querySelector('li:nth-child(1) a'), 'Accueil');
            updateElementText(footerLinks[0].querySelector('li:nth-child(2) a'), 'À Propos');
            updateElementText(footerLinks[0].querySelector('li:nth-child(3) a'), 'Blog');
            updateElementText(footerLinks[0].querySelector('li:nth-child(4) a'), 'Contact');
        }
        
        if (footerLinks.length >= 2) {
            updateElementText(footerLinks[1].querySelector('li:nth-child(1) a'), 'Coach de Fitness IA');
            updateElementText(footerLinks[1].querySelector('li:nth-child(2) a'), 'Tuteur de Mathématiques IA');
            updateElementText(footerLinks[1].querySelector('li:nth-child(3) a'), 'Soutien à la Santé Mentale');
            updateElementText(footerLinks[1].querySelector('li:nth-child(4) a'), 'Bot d\'Apprentissage des Langues');
            updateElementText(footerLinks[1].querySelector('li:nth-child(5) a'), 'Conseiller en Relations');
            updateElementText(footerLinks[1].querySelector('li:nth-child(6) a'), 'Bot de Sagesse Coranique');
        }
        
        // Copyright
        updateElementText('.footer-bottom p', '© 2025 Darlma3rifa. Tous Droits Réservés.');
        
        // Footer bottom links
        updateElementText('.footer-bottom-links li:nth-child(1) a', 'Politique de Confidentialité');
        updateElementText('.footer-bottom-links li:nth-child(2) a', 'Conditions d\'Utilisation');
    }
    
    // Function to load English content
    function loadEnglishContent() {
        // This is where you would load English translations
        // For now, we'll just update some key elements
        
        // Navigation
        updateElementText('.navbar-nav li:nth-child(1) .nav-link', 'Home');
        updateElementText('.navbar-nav li:nth-child(2) .nav-link', 'AI Companions');
        updateElementText('.navbar-nav li:nth-child(3) .nav-link', 'About');
        updateElementText('.navbar-nav li:nth-child(4) .nav-link', 'Blog');
        updateElementText('.navbar-nav li:nth-child(5) .nav-link', 'Contact');
        
        // Dropdown menu
        updateElementText('.dropdown-menu li:nth-child(1) .dropdown-item', 'AI Fitness Coach');
        updateElementText('.dropdown-menu li:nth-child(2) .dropdown-item', 'AI Math Tutor');
        updateElementText('.dropdown-menu li:nth-child(3) .dropdown-item', 'Mental Health Support');
        updateElementText('.dropdown-menu li:nth-child(4) .dropdown-item', 'Language Learning Bot');
        updateElementText('.dropdown-menu li:nth-child(5) .dropdown-item', 'Relationship Advisor');
        updateElementText('.dropdown-menu li:nth-child(6) .dropdown-item', 'Quranic Wisdom Bot');
        
        // Hero section
        updateElementText('.hero-title', 'Explore Wisdom with AI Companions');
        updateElementText('.hero-text', 'Welcome to Darlma3rifa - The Home of Wisdom. Discover a new way to learn, grow, and find guidance through our AI companions designed to assist you in various aspects of life.');
        updateElementText('.hero-buttons .btn-primary', 'Explore AI Companions');
        updateElementText('.hero-buttons .btn-outline-primary', 'Learn More');
        
        // AI Companions section
        updateElementText('.ai-companions-section .section-header h2', 'Our AI Companions');
        updateElementText('.ai-companions-section .section-header p', 'Discover our specialized AI companions designed to assist you in various aspects of life');
        
        // Update companion cards
        const companionTitles = [
            'AI Fitness Coach',
            'AI Math Tutor',
            'Mental Health Support',
            'Language Learning Bot',
            'Relationship Advisor',
            'Quranic Wisdom Bot'
        ];
        
        const companionDescriptions = [
            'Get personalized workout plans, nutrition advice, and fitness tips from our AI Fitness Coach.',
            'Solve math problems, understand complex concepts, and improve your math skills with our AI Math Tutor.',
            'Find emotional support, coping strategies, and mindfulness techniques with our Mental Health Support bot.',
            'Learn Arabic or English through interactive conversations, vocabulary building, and grammar lessons.',
            'Get advice on relationships, communication strategies, and conflict resolution techniques.',
            'Explore Islamic knowledge, Quranic verses, and spiritual guidance with respect and accuracy.'
        ];
        
        document.querySelectorAll('.companion-card').forEach((card, index) => {
            if (index < companionTitles.length) {
                card.querySelector('h3').textContent = companionTitles[index];
                card.querySelector('p').textContent = companionDescriptions[index];
                card.querySelector('.btn').textContent = 'Chat Now';
            }
        });
        
        // Features section
        updateElementText('.features-section .section-header h2', 'Why Choose Our AI Companions?');
        updateElementText('.features-section .section-header p', 'Discover the unique features that make our AI companions stand out');
        
        const featureTitles = [
            'Intelligent Conversations',
            'Privacy-Focused',
            'Bilingual Support'
        ];
        
        const featureDescriptions = [
            'Our AI companions are designed to provide intelligent, meaningful conversations that adapt to your needs.',
            'Your conversations are private and secure, ensuring your personal information remains confidential.',
            'All our AI companions support both Arabic and English, making them accessible to a wider audience.'
        ];
        
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            if (index < featureTitles.length) {
                card.querySelector('h3').textContent = featureTitles[index];
                card.querySelector('p').textContent = featureDescriptions[index];
            }
        });
        
        // Blog section
        updateElementText('.blog-preview-section .section-header h2', 'Latest from Our Blog');
        updateElementText('.blog-preview-section .section-header p', 'Read our latest articles and insights on AI and personal development');
        
        const blogTitles = [
            'How AI is Transforming Fitness Coaching',
            'The Benefits of AI-Assisted Language Learning',
            'Mental Health Support in the Digital Age'
        ];
        
        const blogDescriptions = [
            'Discover how artificial intelligence is revolutionizing the way we approach fitness and health.',
            'Learn how AI companions can help you master a new language faster and more effectively.',
            'Explore how AI companions are providing accessible mental health support to those in need.'
        ];
        
        document.querySelectorAll('.blog-card').forEach((card, index) => {
            if (index < blogTitles.length) {
                card.querySelector('h3').textContent = blogTitles[index];
                card.querySelector('p').textContent = blogDescriptions[index];
                card.querySelector('.read-more').textContent = 'Read More';
            }
        });
        
        // CTA section
        updateElementText('.cta-section h2', 'Ready to Explore Wisdom with Our AI Companions?');
        updateElementText('.cta-section p', 'Start your journey towards knowledge, growth, and self-improvement today.');
        updateElementText('.cta-section .btn', 'Get Started Now');
        
        // Footer
        updateElementText('.footer p', 'The Home of Wisdom - Explore knowledge and growth through our AI companions.');
        updateElementText('.footer h4:nth-of-type(1)', 'Quick Links');
        updateElementText('.footer h4:nth-of-type(2)', 'AI Companions');
        updateElementText('.footer h4:nth-of-type(3)', 'Contact Us');
        
        // Footer links
        const footerLinks = document.querySelectorAll('.footer-links');
        if (footerLinks.length >= 1) {
            updateElementText(footerLinks[0].querySelector('li:nth-child(1) a'), 'Home');
            updateElementText(footerLinks[0].querySelector('li:nth-child(2) a'), 'About');
            updateElementText(footerLinks[0].querySelector('li:nth-child(3) a'), 'Blog');
            updateElementText(footerLinks[0].querySelector('li:nth-child(4) a'), 'Contact');
        }
        
        if (footerLinks.length >= 2) {
            updateElementText(footerLinks[1].querySelector('li:nth-child(1) a'), 'AI Fitness Coach');
            updateElementText(footerLinks[1].querySelector('li:nth-child(2) a'), 'AI Math Tutor');
            updateElementText(footerLinks[1].querySelector('li:nth-child(3) a'), 'Mental Health Support');
            updateElementText(footerLinks[1].querySelector('li:nth-child(4) a'), 'Language Learning Bot');
            updateElementText(footerLinks[1].querySelector('li:nth-child(5) a'), 'Relationship Advisor');
            updateElementText(footerLinks[1].querySelector('li:nth-child(6) a'), 'Quranic Wisdom Bot');
        }
        
        // Copyright
        updateElementText('.footer-bottom p', '© 2025 Darlma3rifa. All Rights Reserved.');
        
        // Footer bottom links
        updateElementText('.footer-bottom-links li:nth-child(1) a', 'Privacy Policy');
        updateElementText('.footer-bottom-links li:nth-child(2) a', 'Terms of Service');
    }
    
    // Helper function to update text content
    function updateElementText(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    // Initialize chatbot interface if present
    const chatForm = document.querySelector('.chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const chatInput = this.querySelector('.chat-input');
            const chatBody = document.querySelector('.chatbot-body');
            
            if (chatInput.value.trim() !== '') {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'chat-message user-message';
                userMessage.innerHTML = `
                    <div class="message-content">
                        <p>${chatInput.value}</p>
                        <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                `;
                chatBody.appendChild(userMessage);
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Clear input
                const userInput = chatInput.value;
                chatInput.value = '';
                
                // Simulate bot response (in a real app, this would be an API call)
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'chat-message bot-message';
                    botMessage.innerHTML = `
                        <div class="message-content">
                            <p>This is a demo chatbot. In a real implementation, this would connect to an AI service to provide meaningful responses.</p>
                            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                    `;
                    chatBody.appendChild(botMessage);
                    
                    // Scroll to bottom
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        });
    }
});
