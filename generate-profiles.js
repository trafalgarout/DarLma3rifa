const fs = require('fs');
const path = require('path');

// Data pools for random generation
const arabicNames = [
    'أحمد', 'محمد', 'فاطمة', 'نور', 'سارة', 'ريم', 'عمر', 'علي', 'ليلى', 'مريم',
    'يوسف', 'حسن', 'زينب', 'عائشة', 'خالد', 'جمال', 'هدى', 'رانيا', 'كريم', 'سلمى'
];

const cities = [
    'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام',
    'القاهرة', 'الإسكندرية', 'دبي', 'أبو ظبي', 'الدوحة',
    'عمان', 'بيروت', 'الرباط', 'تونس', 'الكويت'
];

const countries = [
    'المملكة العربية السعودية', 'مصر', 'الإمارات العربية المتحدة',
    'قطر', 'الأردن', 'لبنان', 'المغرب', 'تونس', 'الكويت'
];

const maritalStatus = [
    'أعزب', 'عزباء', 'مطلق', 'مطلقة', 'أرمل', 'أرملة'
];

const education = [
    'بكالوريوس', 'ماجستير', 'دكتوراه', 'دبلوم', 'ثانوية عامة'
];

const occupations = [
    'مهندس', 'طبيب', 'معلم', 'محاسب', 'رجل أعمال', 'موظف حكومي',
    'مهندسة', 'طبيبة', 'معلمة', 'محاسبة', 'سيدة أعمال', 'موظفة حكومية'
];

// Generate random data
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomAge() {
    return Math.floor(Math.random() * (45 - 20 + 1)) + 20;
}

function getRandomHeight() {
    return Math.floor(Math.random() * (190 - 150 + 1)) + 150;
}

function generateBio() {
    const bios = [
        'شخص طموح وملتزم، أبحث عن شريك حياة يشاركني أهدافي وتطلعاتي. أؤمن بأهمية التفاهم والاحترام المتبادل في بناء حياة زوجية سعيدة.',
        'أسعى لبناء أسرة متماسكة قائمة على الحب والتفاهم. أحب القراءة والسفر واكتشاف ثقافات جديدة.',
        'شخصية اجتماعية ومرحة، أقدر قيمة العائلة وأسعى لتكوين أسرة سعيدة. أهتم بالتطور الشخصي والمهني.',
        'متدين ومحافظ على العادات والتقاليد، أبحث عن شريك حياة يشاركني قيمي ومبادئي.',
        'شخصية متزنة وهادئة، أؤمن بأهمية التواصل والحوار في حل المشكلات. أبحث عن شريك حياة يقدر معنى الاستقرار.'
    ];
    return getRandomItem(bios);
}

function generatePartnerPreferences() {
    const preferences = [
        'أبحث عن شريك حياة متدين وملتزم، يقدر معنى الحياة الزوجية ويسعى لبناء أسرة سعيدة.',
        'أتطلع للارتباط بشخص ناضج فكرياً وعاطفياً، يؤمن بالشراكة الحقيقية في الحياة الزوجية.',
        'أبحث عن شريك حياة متفهم ومتعاون، يقدر أهمية التواصل والحوار في العلاقة الزوجية.',
        'أتمنى الارتباط بشخص طموح ومثقف، يشاركني اهتماماتي وتطلعاتي المستقبلية.',
        'أبحث عن شريك حياة محب للعائلة، يقدر قيمة الترابط الأسري ويسعى لبناء حياة مستقرة.'
    ];
    return getRandomItem(preferences);
}

function generateSEOArticle() {
    const articles = [
        `
        <h3>أسس اختيار شريك الحياة المناسب</h3>
        <p>يعد اختيار شريك الحياة من أهم القرارات التي يتخذها الإنسان في حياته. فيما يلي بعض النصائح المهمة:</p>
        <ul>
            <li>التوافق في القيم والمبادئ الأساسية</li>
            <li>أهمية التواصل الفعال والصريح</li>
            <li>مراعاة التكافؤ الاجتماعي والثقافي</li>
            <li>الاهتمام بالجانب الديني والأخلاقي</li>
            <li>دراسة التوافق في الأهداف المستقبلية</li>
        </ul>
        <p>تذكر دائماً أن الزواج الناجح يبنى على أسس من التفاهم والاحترام المتبادل والثقة.</p>
        `,
        `
        <h3>خطوات مهمة قبل الزواج</h3>
        <p>يحتاج الشباب المقبل على الزواج إلى اتخاذ خطوات مدروسة لضمان نجاح حياتهم الزوجية:</p>
        <ul>
            <li>التعرف على الطرف الآخر بشكل كافٍ</li>
            <li>مناقشة التوقعات والطموحات المستقبلية</li>
            <li>الاتفاق على الأمور المالية والمعيشية</li>
            <li>فهم مسؤوليات الحياة الزوجية</li>
            <li>الاستعداد النفسي والعاطفي للزواج</li>
        </ul>
        <p>الزواج رحلة جميلة تحتاج إلى تخطيط وإعداد مسبق لضمان نجاحها.</p>
        `,
        `
        <h3>بناء أسرة سعيدة ومستقرة</h3>
        <p>تعتمد سعادة الأسرة على عدة عوامل أساسية يجب مراعاتها:</p>
        <ul>
            <li>الحب والاحترام المتبادل بين الزوجين</li>
            <li>التعاون في تحمل المسؤوليات</li>
            <li>الحوار البناء وحل المشكلات</li>
            <li>الاهتمام بالجانب الروحي والديني</li>
            <li>التوازن بين الحياة الأسرية والعملية</li>
        </ul>
        <p>الأسرة السعيدة هي نواة المجتمع القوي والمتماسك.</p>
        `
    ];
    return getRandomItem(articles);
}

// Generate profile pages
async function generateProfiles() {
    const templatePath = 'profile.html';
    const template = fs.readFileSync(templatePath, 'utf8');
    const outputDir = 'profiles';

    // Create profiles directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Generate profiles for each image
    for (let i = 1; i <= 1062; i++) {
        const imageName = `image1 (${i}).webp`;
        const name = getRandomItem(arabicNames);
        const age = getRandomAge();
        const city = getRandomItem(cities);
        const country = getRandomItem(countries);
        const marital = getRandomItem(maritalStatus);
        const edu = getRandomItem(education);
        const job = getRandomItem(occupations);
        const height = getRandomHeight();
        const bio = generateBio();
        const preferences = generatePartnerPreferences();
        const seoArticle = generateSEOArticle();

        let profileHtml = template
            .replace(/__NAME__/g, name)
            .replace(/__IMAGE__/g, imageName)
            .replace(/__AGE__/g, age)
            .replace(/__CITY__/g, city)
            .replace(/__COUNTRY__/g, country)
            .replace(/__MARITAL_STATUS__/g, marital)
            .replace(/__EDUCATION__/g, edu)
            .replace(/__OCCUPATION__/g, job)
            .replace(/__HEIGHT__/g, height)
            .replace(/__BIO__/g, bio)
            .replace(/__PARTNER_PREFERENCES__/g, preferences)
            .replace(/__SEO_ARTICLE__/g, seoArticle);

        const outputPath = path.join(outputDir, `profile-${i}.html`);
        fs.writeFileSync(outputPath, profileHtml);
        console.log(`Generated profile ${i}: ${outputPath}`);
    }
}

// Run the generator
generateProfiles().catch(console.error);
