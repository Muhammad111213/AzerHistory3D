/* ================================================ */
/*  FLL.js — AzerHistory 3D  (Tam yenilənmiş)      */
/* ================================================ */

// =======================================
// 1. CURSOR GLOW
// =======================================
const cursorGlow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
    }
});

// =======================================
// 2. HERO CANVAS — Floating particles
// =======================================
(function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W,
        H,
        particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor(W / 12);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.4 + 0.3,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,195,255,${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
        resize();
        createParticles();
    });
    resize();
    createParticles();
    draw();
})();

// =======================================
// 3. HAMBURGER MENU
// =======================================
const menuBtn = document.getElementById("menu");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navbar.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            navbar.classList.remove("active");
        }
    });
}

// =======================================
// 4. HEADER SCROLL STYLE
// =======================================
window.addEventListener("scroll", () => {
    const header = document.getElementById("mainHeader");
    if (!header) return;
    if (window.scrollY > 80) {
        header.style.padding = "10px 7%";
        header.style.background = "rgba(0,0,0,0.97)";
    } else {
        header.style.padding = "14px 7%";
        header.style.background = "rgba(0,0,0,0.85)";
    }
});

// =======================================
// 5. REVEAL ANIMATION
// =======================================
function checkReveal() {
    document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", checkReveal);
window.addEventListener("load", checkReveal);

// =======================================
// 6. COUNTER ANIMATION (hero stats)
// =======================================
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = target >= 10000 ? Math.floor(current).toLocaleString() : Math.floor(current);
    }, 16);
}

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll(".stat-num").forEach((el) => counterObserver.observe(el));

// =======================================
// 7. MODEL-VIEWER LOG
// =======================================
document.querySelectorAll("model-viewer").forEach((mv) => {
    mv.addEventListener("load", () => console.log("✅ Yükləndi:", mv.alt));
    mv.addEventListener("error", () => console.warn("❌ Yüklənmədi:", mv.alt));
});

// =======================================
// 8. MUSIC SYSTEM
// =======================================
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

if (musicBtn && music) {
    musicBtn.addEventListener("click", () => {
        if (!playing) {
            music
                .play()
                .then(() => {
                    playing = true;
                    musicBtn.innerHTML = "⏸ Pause";
                })
                .catch(() => console.warn("Musiqi oynatıla bilmədi."));
        } else {
            music.pause();
            playing = false;
            musicBtn.innerHTML = "🎵 Musiqi";
        }
    });
}

// =======================================
// 9. LANGUAGE / i18n
// =======================================
const translations = {
    az: {
        music: "Musiqi",
        nav_home: "Ana Səhifə",
        nav_models: "3D Eksponatlar",
        nav_timeline: "Zaman Xətti",
        nav_museums: "Xəritə",
        hero_badge: "🏛️ Rəqəmsal Muzey",
        hero_title1: "Azərbaycan Tarixi",
        hero_title2: "Canlanır",
        hero_sub:
            "Minilliklərin mirasını müasir texnologiya ilə kəşf edin. Hər bir artefakt xalqımızın keçmişinə açılan bir pəncərədir.",
        hero_btn: "Kəşfə Başla",
        hero_btn2: "Zaman Xətti",
        stat1: "Eksponat",
        stat2: "İl Tarix",
        stat3: "3D Model",
        scroll: "Aşağı diyirla",
        models_title: "İnteraktiv 3D Arxiv",
        tag_num: "Numizmatika",
        tag_paleo: "Paleoantropologiya",
        tag_arch: "Arxeologiya",
        tag_bronze: "Tunc Dövrü",
        tag_manna: "Manna Dövləti",
        lbl_period: "Dövr:",
        lbl_mat: "Material:",
        lbl_weight: "Çəki:",
        lbl_age: "Yaş:",
        lbl_found: "Tapıldığı yer:",
        lbl_type: "Növ:",
        lbl_loc: "Məkan:",
        lbl_cult: "Mədəniyyət:",
        lbl_why: "Niyə mühümdür?",
        lbl_anthro: "Antropoloji Əhəmiyyət",
        lbl_region: "Bölgənin Tarixi",
        lbl_symbol: "Simvolik Əhəmiyyət",
        lbl_craft: "Sənətkarlıq",
        lbl_state: "Dövlətçilik",
        sikke_title: "Qədim Azərbaycan Sikkəsi",
        sikke_period: "7-10-cu əsrlər",
        sikke_mat: "Gümüş Dirhəm",
        sikke_weight: "~2.8 qr",
        sikke_desc:
            "Bu sikkə orta əsrlərdə Azərbaycan ərazisindəki dövlətlərin iqtisadi müstəqilliyini nümayiş etdirir. Kufi xətti ilə yazılmış kitabə dövrün xəlifəsinin adını göstərir.",
        sikke_ctx:
            "Sikkə zərb etmək dövlətçilik rəmzi idi. Bu artefakt o dövrün ticarət sistemi haqqında məlumat verir.",
        cene_title: "Azıxantropun Çənə Sümüyü",
        cene_age: "350,000–400,000 il",
        cene_loc: "Azıx mağarası, Qazax",
        cene_type: "Pre-neandertal",
        cene_desc:
            "1968-ci ildə aşkar edilən bu çənə sümüyü dünya antropologiya elmini dəyişdi. Dünyada tapılan ən qədim insan qalıqlarından dördüncüsüdür.",
        cene_ctx: "Bu tapıntı Azərbaycanın bəşəriyyətin ilk formalaşdığı ocaqlardan biri olduğunu təsdiqləyir.",
        dulus_title: "Ordubad Tunc Artefaktı",
        dulus_loc: "Naxçıvan MR",
        dulus_period: "Tunc Dövrü (e.ə. II min.)",
        dulus_cult: "Boyalı Qablar",
        dulus_desc:
            "Ordubad ətrafında aparılan qazıntılarda tapılan bu artefakt qədim Naxçıvan tayfalarının yüksək sənətkarlıq bacarıqlarını göstərir.",
        dulus_ctx: "Naxçıvan qədim Azərbaycan dövlətçiliyinin ən qədim mərkəzlərindən hesab olunur.",
        at_title: "Qədim At Fiquru",
        at_period: "e.ə. I minillik",
        at_mat: "Tunc",
        at_loc: "Mil-Qarabağ düzü",
        at_desc:
            "Qədim dövrə aid tunc at heykəlciyidir. At qədim Azərbaycan mədəniyyətində güc və azadlıq simvolu idi. Yəhər detalları dövrün at çapma mədəniyyətini əks etdirir.",
        at_ctx: "At fiqurları çox vaxt hökmdar məzarlarında tapılır — ruhun o dünyaya süvari getməsini simvolizə edir.",
        bicak_title: "Tunc Dövrünə Aid Silahlar",
        bicak_period: "e.ə. II–I minillik",
        bicak_mat: "Tunc",
        bicak_loc: "Gəncə-Qazax bölgəsi",
        bicak_desc:
            "Xəncər, nizə ucluğu və ox ucluğundan ibarət bu toplu döyüş və ov üçün istifadə olunurdu. Tunc xəlitəsi yerli ustalar tərəfindən işlənib.",
        bicak_ctx: "Bu silahların forması Ön Asiya döyüş ənənəsinin Azərbaycanda unikal inkişafını göstərir.",
        manna_title: "Manna Dövrü Qızıl Əşyaları",
        manna_period: "e.ə. IX–VII əsr",
        manna_mat: "Qızıl",
        manna_loc: "Cənubi Azərbaycan",
        manna_desc:
            "Bu qızıl bəzək toplusu — boyunbağı, bilərziklər, sırğalar — Manna dövlətinin zərif sənətkarlığının şahididir.",
        manna_ctx: "Manna Azərbaycanın ən qədim dövlətlərindəndir. Assuriya mənbələrindən məlumdur.",
        tl_heading: "Azərbaycan Tarixinin Zaman Xətti",
        tl1_t: "Azıxantrop",
        tl1_d: "Azıx mağarasında pre-neandertal insanın yaşaması. Odun ilk istifadəsi.",
        tl2_t: "Eneolit və Tunc Dövrü",
        tl2_d: "Kür-Araz mədəniyyəti. İlk şəhər tipli yaşayış məskənləri.",
        tl3_t: "Manna Dövləti",
        tl3_d: "Urmiya gölü ətrafında qüdrətli dövlət. Qızıl sənətkarlığının zirvəsi.",
        tl4_t: "Qafqaz Albaniyası",
        tl4_d: "Albaniya dövləti qurulur. Xristianlığın qəbulu.",
        tl5_t: "Ərəb Xilafəti Dövrü",
        tl5_d: "İslam mədəniyyəti yayılır. Şirvanşahlar sülaləsi formalaşır.",
        tl6_t: "Orta Əsrlər",
        tl6_d: "Nizami Gəncəvi dövrü. İpək Yolunun çiçəklənməsi.",
        tl7_t: "Səfəvilər İmperiyası",
        tl7_d: "Şah İsmayıl Xətai böyük imperiya qurur. Azərbaycan dili saray dili olur.",
        tl8_t: "Azərbaycan Xalq Cümhuriyyəti",
        tl8_d: "Müsəlman dünyasında ilk demokratik respublika. Qadınlara seçki hüququ.",
        map_title: "Arxeoloji Yerləşmə",
        map_desc: "Tapıntıların coğrafi bölgüsü Azərbaycanın hər qarışının qədim yaşayış məskəni olduğunu göstərir.",

        tl_open: "Zaman Xəttini Aç",
        tl_close: "Zaman Xəttini Bağla",
        tag_rock: "Qaya Rəsmləri",
        tag_medieval: "Orta Əsrlər",
        lbl_count: "Rəsm sayı:",
        lbl_status: "Status:",
        gem_title: "Gəmiqaya Petroqlifləri",
        gem_period: "e.ə. IV–I minillik",
        gem_loc: "Gəmiqaya, Naxçıvan",
        gem_count: "6000-dən çox",
        gem_desc:
            "Gəmiqaya dağının yamaclarında qaya üzərinə həkk edilmiş 6000-dən artıq petroqlif Azərbaycanın ən böyük açıq hava rəsm qalereyasıdır.",
        gem_ctx: "Gəmiqaya petroqlifləri UNESCO Dünya İrsi siyahısına namizəd göstərilən abidələrindəndir.",
        shirvan_title: "Şirvanşahlar Sarayı Tapıntıları",
        shirvan_period: "XV əsr",
        shirvan_loc: "İçərişəhər, Bakı",
        shirvan_mat: "Daş, Keramika, Metal",
        shirvan_desc:
            "Şirvanşahlar Sarayı kompleksindəki qazıntılarda tapılan əşyalar XV əsr Azərbaycan mədəniyyətinin yüksəkliyini sübut edir.",
        shirvan_ctx: "Şirvanşahlar sülaləsi əsrlər boyu Azərbaycanın ən qüdrətli dövlətlərindən birini idarə etmişdir.",
        qobu_title: "Qobustan Qaya Rəsmləri",
        qobu_period: "e.ə. XII min. – e. III əsr",
        qobu_loc: "Qobustan, Bakı",
        qobu_status: "UNESCO Dünya İrsi",
        qobu_desc:
            "Qobustan Milli Parkında 6000-dən artıq qaya rəsmi var. 2007-ci ildə UNESCO-nun Dünya İrsi siyahısına daxil edilib.",
        qobu_ctx: "Qobustan dünya arxeologiyasında protohistorik dövrün ən əhəmiyyətli açıq hava muzeyidir.",
        xin_title: "Xınıslı Nekropolü",
        xin_period: "e.ə. VIII–IV əsr",
        xin_loc: "Xınıslı, Bakı ətrafı",
        xin_type: "Skif dövrü nekropolü",
        xin_desc:
            "Xınıslı nekropolündə qızıl bəzəklər, silahlar, at avadanlıqları tapılmışdır. Albaniyadan əvvəlki dövrü əks etdirir.",
        xin_ctx: "Xınıslı nekropolü Albaniya öncəsi dövr üçün ən zəngin arxeoloji mənbələrdən biridir.",
        footer: "© 2026 AzerHistory 3D | Məhəmməd Hüseynov tərəfindən yaradılıb"
    },
    en: {
        music: "Music",
        nav_home: "Home",
        nav_models: "3D Exhibits",
        nav_timeline: "Timeline",
        nav_museums: "Map",
        hero_badge: "🏛️ Digital Museum",
        hero_title1: "Azerbaijan History",
        hero_title2: "Comes Alive",
        hero_sub: "Discover millennia of heritage with modern technology. Every artifact is a window into our past.",
        hero_btn: "Explore Now",
        hero_btn2: "Timeline",
        stat1: "Exhibits",
        stat2: "Years of History",
        stat3: "3D Models",
        scroll: "Scroll down",
        models_title: "Interactive 3D Archive",
        tag_num: "Numismatics",
        tag_paleo: "Paleoanthropology",
        tag_arch: "Archaeology",
        tag_bronze: "Bronze Age",
        tag_manna: "Manna State",
        lbl_period: "Period:",
        lbl_mat: "Material:",
        lbl_weight: "Weight:",
        lbl_age: "Age:",
        lbl_found: "Found at:",
        lbl_type: "Type:",
        lbl_loc: "Location:",
        lbl_cult: "Culture:",
        lbl_why: "Why is it important?",
        lbl_anthro: "Anthropological Significance",
        lbl_region: "Regional History",
        lbl_symbol: "Symbolic Value",
        lbl_craft: "Craftsmanship",
        lbl_state: "State History",
        sikke_title: "Ancient Azerbaijani Coin",
        sikke_period: "7th–10th centuries",
        sikke_mat: "Silver Dirham",
        sikke_weight: "~2.8 g",
        sikke_desc:
            "This coin demonstrates the economic independence of medieval Azerbaijani states. The Kufic inscription shows the caliph's name and confirms Azerbaijan's role as a key Silk Road hub.",
        sikke_ctx:
            "Minting coins was a symbol of statehood. This artifact provides precise data on the era's trade and tax systems.",
        cene_title: "Jaw Bone of Azikhantropus",
        cene_age: "350,000–400,000 years",
        cene_loc: "Azykh Cave, Gazakh",
        cene_type: "Pre-Neanderthal",
        cene_desc:
            "Discovered in 1968 by Mammadali Huseynov, this jaw bone revolutionized anthropology. It is the fourth oldest human fossil found in the world.",
        cene_ctx: "This finding confirms Azerbaijan as one of the earliest cradles of human civilization.",
        dulus_title: "Ordubad Bronze Artifact",
        dulus_loc: "Nakhchivan AR",
        dulus_period: "Bronze Age (2nd mill. BC)",
        dulus_cult: "Painted Ware Culture",
        dulus_desc:
            "Excavated near Ordubad, this artifact reflects the high metallurgical and craftsmanship skills of ancient Nakhchivan tribes.",
        dulus_ctx: "Nakhchivan is considered one of the oldest centers of Azerbaijani statehood.",
        at_title: "Ancient Horse Figurine",
        at_period: "1st mill. BC",
        at_mat: "Bronze",
        at_loc: "Mil-Karabakh Plain",
        at_desc:
            "This ancient bronze horse figurine symbolized power and freedom in Azerbaijani culture. The saddle details reflect the equestrian traditions of the era.",
        at_ctx: "Horse figurines were often placed in royal tombs — symbolizing the soul's journey to the afterlife on horseback.",
        bicak_title: "Bronze Age Weapons",
        bicak_period: "2nd–1st mill. BC",
        bicak_mat: "Bronze",
        bicak_loc: "Ganja-Gazakh region",
        bicak_desc:
            "This set of a dagger, spear tip, and arrowhead was used for combat and hunting. The durable bronze alloy was crafted by local smiths.",
        bicak_ctx:
            "The design of these weapons shows the unique development of Near Eastern combat traditions in Azerbaijan.",
        manna_title: "Manna Period Gold Items",
        manna_period: "9th–7th century BC",
        manna_mat: "Gold",
        manna_loc: "Southern Azerbaijan",
        manna_desc:
            "This collection — necklace, bracelets, earrings, and a bowl — is a testament to the refined craftsmanship of the Manna state.",
        manna_ctx: "Manna is one of the oldest Azerbaijani states, known from Assyrian sources.",
        tl_heading: "Azerbaijan History Timeline",
        tl1_t: "Azikhantropus",
        tl1_d: "Pre-Neanderthal humans lived in Azykh Cave. First known use of fire in the region.",
        tl2_t: "Eneolithic & Bronze Age",
        tl2_d: "Kura-Araxes culture. First urban settlements. Metal processing and painted pottery flourish.",
        tl3_t: "Manna State",
        tl3_d: "Powerful state around Lake Urmia. Wars with Assyria. Peak of gold craftsmanship.",
        tl4_t: "Caucasian Albania",
        tl4_d: "Albanian state founded. Adoption of Christianity. Diplomatic ties with Rome and Parthia.",
        tl5_t: "Arab Caliphate Era",
        tl5_d: "Spread of Islamic culture. Silver dirhams minted. Shirvanshah dynasty emerges.",
        tl6_t: "Medieval Period",
        tl6_d: "Era of Nizami Ganjavi. Shirvanshahs Palace. Silk Road flourishes.",
        tl7_t: "Safavid Empire",
        tl7_d: "Shah Ismail Khatai builds a great empire. Azerbaijani becomes the court language.",
        tl8_t: "Azerbaijan Democratic Republic",
        tl8_d: "First democratic republic in the Muslim world. Women granted suffrage.",
        map_title: "Archaeological Distribution",
        map_desc: "The geographical spread of finds shows that every corner of Azerbaijan was an ancient settlement.",

        tl_open: "Open Timeline",
        tl_close: "Close Timeline",
        tag_rock: "Rock Art",
        tag_medieval: "Medieval",
        lbl_count: "Petroglyphs:",
        lbl_status: "Status:",
        gem_title: "Gamigaya Petroglyphs",
        gem_period: "4th–1st mill. BC",
        gem_loc: "Gamigaya, Nakhchivan",
        gem_count: "6000+",
        gem_desc:
            "Over 6000 petroglyphs carved into the slopes of Gamigaya Mountain make this Azerbaijan's largest open-air art gallery.",
        gem_ctx: "Gamigaya petroglyphs are nominated for UNESCO World Heritage status.",
        shirvan_title: "Shirvanshah Palace Finds",
        shirvan_period: "15th century",
        shirvan_loc: "Icheri Sheher, Baku",
        shirvan_mat: "Stone, Ceramics, Metal",
        shirvan_desc:
            "Artifacts from the Shirvanshah Palace complex demonstrate the high level of 15th-century Azerbaijani civilization.",
        shirvan_ctx: "The Shirvanshah dynasty ruled one of Azerbaijan's most powerful states for centuries.",
        qobu_title: "Gobustan Rock Art",
        qobu_period: "12th mill. BC – 3rd c. AD",
        qobu_loc: "Gobustan, Baku",
        qobu_status: "UNESCO World Heritage",
        qobu_desc:
            "Over 6,000 rock carvings in Gobustan National Park. Listed as a UNESCO World Heritage Site in 2007.",
        qobu_ctx: "Gobustan is one of the world's most significant open-air museums of protohistoric art.",
        xin_title: "Khynysly Necropolis",
        xin_period: "8th–4th century BC",
        xin_loc: "Khynysly, near Baku",
        xin_type: "Scythian-era necropolis",
        xin_desc:
            "Excavations at Khynysly yielded gold ornaments, weapons, and horse equipment reflecting pre-Albanian tribal culture.",
        xin_ctx: "Khynysly is one of the richest archaeological sources for the pre-Albanian period in Azerbaijan.",
        footer: "© 2026 AzerHistory 3D | Created by Mahammad Huseynov"
    },
    ru: {
        music: "Музыка",
        nav_home: "Главная",
        nav_models: "3D Экспонаты",
        nav_timeline: "Хронология",
        nav_museums: "Карта",
        hero_badge: "🏛️ Цифровой Музей",
        hero_title1: "История Азербайджана",
        hero_title2: "Оживает",
        hero_sub:
            "Откройте для себя тысячелетнее наследие с помощью современных технологий. Каждый артефакт — окно в прошлое.",
        hero_btn: "Исследовать",
        hero_btn2: "Хронология",
        stat1: "Экспонатов",
        stat2: "Лет Истории",
        stat3: "3D Модели",
        scroll: "Прокрутите вниз",
        models_title: "Интерактивный 3D Архив",
        tag_num: "Нумизматика",
        tag_paleo: "Палеоантропология",
        tag_arch: "Археология",
        tag_bronze: "Бронзовый Век",
        tag_manna: "Государство Манна",
        lbl_period: "Период:",
        lbl_mat: "Материал:",
        lbl_weight: "Вес:",
        lbl_age: "Возраст:",
        lbl_found: "Место находки:",
        lbl_type: "Тип:",
        lbl_loc: "Место:",
        lbl_cult: "Культура:",
        lbl_why: "Почему важно?",
        lbl_anthro: "Антропологическое значение",
        lbl_region: "История региона",
        lbl_symbol: "Символическое значение",
        lbl_craft: "Мастерство",
        lbl_state: "Государственность",
        sikke_title: "Древняя Азербайджанская Монета",
        sikke_period: "VII–X века",
        sikke_mat: "Серебряный дирхем",
        sikke_weight: "~2.8 г",
        sikke_desc:
            "Эта монета демонстрирует экономическую независимость средневековых азербайджанских государств. Куфическая надпись указывает имя халифа.",
        sikke_ctx: "Чеканка монет была символом государственности. Артефакт даёт точные данные о торговле той эпохи.",
        cene_title: "Челюстная Кость Азыхантропа",
        cene_age: "350 000–400 000 лет",
        cene_loc: "Азыхская пещера, Газах",
        cene_type: "Пре-неандерталец",
        cene_desc:
            "Обнаруженная в 1968 году, эта челюстная кость произвела революцию в антропологии. Это четвёртая по древности человеческая окаменелость в мире.",
        cene_ctx: "Эта находка подтверждает, что Азербайджан — одна из древнейших колыбелей человечества.",
        dulus_title: "Ордубадский Бронзовый Артефакт",
        dulus_loc: "Нахчыванская АР",
        dulus_period: "Бронзовый век (2-е тыс. до н.э.)",
        dulus_cult: "Культура расписной керамики",
        dulus_desc: "Этот артефакт отражает высокое металлургическое мастерство древних нахчыванских племён.",
        dulus_ctx: "Нахчыван считается одним из древнейших центров азербайджанской государственности.",
        at_title: "Древняя Фигурка Коня",
        at_period: "1-е тыс. до н.э.",
        at_mat: "Бронза",
        at_loc: "Мил-Карабахская равнина",
        at_desc:
            "Бронзовая фигурка коня символизировала силу и свободу в древней азербайджанской культуре. Детали седла отражают конные традиции эпохи.",
        at_ctx: "Фигурки коней часто помещали в царские гробницы — символ путешествия души в загробный мир верхом.",
        bicak_title: "Оружие Бронзового Века",
        bicak_period: "2–1-е тыс. до н.э.",
        bicak_mat: "Бронза",
        bicak_loc: "Гянджа-Газахский регион",
        bicak_desc:
            "Этот набор из кинжала, наконечника копья и стрелы использовался в бою и на охоте. Прочный бронзовый сплав был изготовлен местными кузнецами.",
        bicak_ctx: "Форма этого оружия показывает уникальное развитие ближневосточных боевых традиций в Азербайджане.",
        manna_title: "Золотые Изделия Эпохи Манна",
        manna_period: "IX–VII вв. до н.э.",
        manna_mat: "Золото",
        manna_loc: "Южный Азербайджан",
        manna_desc:
            "Эта коллекция — ожерелье, браслеты, серьги и чаша — свидетельствует об утончённом мастерстве государства Манна.",
        manna_ctx: "Манна — одно из древнейших государств Азербайджана, известное из ассирийских источников.",
        tl_heading: "Хронология Истории Азербайджана",
        tl1_t: "Азыхантроп",
        tl1_d: "Пре-неандертальцы в Азыхской пещере. Первое применение огня.",
        tl2_t: "Энеолит и Бронзовый Век",
        tl2_d: "Культура Куро-Аракса. Первые городские поселения. Обработка металла.",
        tl3_t: "Государство Манна",
        tl3_d: "Могущественное государство у озера Урмия. Войны с Ассирией.",
        tl4_t: "Кавказская Албания",
        tl4_d: "Основание Албанского государства. Принятие христианства.",
        tl5_t: "Эпоха Арабского Халифата",
        tl5_d: "Распространение ислама. Чеканка серебряных дирхемов.",
        tl6_t: "Средние Века",
        tl6_d: "Эпоха Низами Гянджеви. Расцвет Великого Шёлкового Пути.",
        tl7_t: "Империя Сефевидов",
        tl7_d: "Шах Исмаил Хатаи создаёт великую империю. Азербайджанский язык становится придворным.",
        tl8_t: "Азербайджанская Демократическая Республика",
        tl8_d: "Первая демократическая республика в мусульманском мире. Избирательные права для женщин.",
        map_title: "Археологическое Распределение",
        map_desc: "Географический охват находок показывает, что каждый уголок Азербайджана был древним поселением.",

        tl_open: "Открыть хронологию",
        tl_close: "Закрыть хронологию",
        tag_rock: "Наскальное Искусство",
        tag_medieval: "Средние Века",
        lbl_count: "Петроглифов:",
        lbl_status: "Статус:",
        gem_title: "Петроглифы Гямигая",
        gem_period: "IV–I тыс. до н.э.",
        gem_loc: "Гямигая, Нахчыван",
        gem_count: "более 6000",
        gem_desc:
            "Более 6000 петроглифов на склонах горы Гямигая — крупнейшая галерея наскального искусства Азербайджана.",
        gem_ctx: "Петроглифы Гямигая номинированы в список Всемирного наследия ЮНЕСКО.",
        shirvan_title: "Находки Дворца Ширваншахов",
        shirvan_period: "XV век",
        shirvan_loc: "Ичеришехер, Баку",
        shirvan_mat: "Камень, Керамика, Металл",
        shirvan_desc:
            "Артефакты из раскопок Дворца Ширваншахов свидетельствуют о высоком уровне азербайджанской цивилизации XV века.",
        shirvan_ctx:
            "Династия Ширваншахов на протяжении веков управляла одним из самых могущественных государств Азербайджана.",
        qobu_title: "Наскальные рисунки Гобустана",
        qobu_period: "XII тыс. до н.э. – III в. н.э.",
        qobu_loc: "Гобустан, Баку",
        qobu_status: "Объект ЮНЕСКО",
        qobu_desc:
            "Более 6000 наскальных рисунков в Гобустане. Включён в список Всемирного наследия ЮНЕСКО в 2007 году.",
        qobu_ctx: "Гобустан — один из важнейших музеев протоисторического искусства под открытым небом.",
        xin_title: "Некрополь Хыныслы",
        xin_period: "VIII–IV вв. до н.э.",
        xin_loc: "Хыныслы, окрестности Баку",
        xin_type: "Некрополь скифской эпохи",
        xin_desc:
            "При раскопках Хыныслы найдены золотые украшения, оружие и конская амуниция, отражающие доалбанскую культуру.",
        xin_ctx: "Некрополь Хыныслы — один из богатейших источников по доалбанскому периоду Азербайджана.",
        footer: "© 2026 AzerHistory 3D | Создано Мамедом Гусейновым"
    }
};

function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) el.textContent = t[key];
    });
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    localStorage.setItem("azerhistory_lang", lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

// =======================================
// 10. TIMELINE TOGGLE
// =======================================
const tlToggle = document.getElementById("timelineToggle");
const tlContent = document.getElementById("timelineContent");
const tlBtnText = document.getElementById("tlBtnText");
const tlBtnIcon = document.getElementById("tlBtnIcon");

const tlLabels = {
    az: { open: "Zaman Xəttini Aç", close: "Zaman Xəttini Bağla" },
    en: { open: "Show Timeline", close: "Hide Timeline" },
    ru: { open: "Показать хронологию", close: "Скрыть хронологию" }
};

if (tlToggle && tlContent) {
    tlToggle.addEventListener("click", () => {
        const isOpen = tlContent.classList.toggle("tl-open");
        const lang = document.documentElement.dataset.lang || "az";
        const labels = tlLabels[lang] || tlLabels.az;
        if (tlBtnText) tlBtnText.textContent = isOpen ? labels.close : labels.open;
        if (tlBtnIcon) tlBtnIcon.textContent = isOpen ? "✖️" : "📅";
        if (isOpen) {
            setTimeout(() => checkReveal(), 100);
            tlContent.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

// =======================================
// 11. MAP TABS
// =======================================
document.querySelectorAll(".map-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".map-tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".map-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const panel = document.getElementById("panel-" + tab.dataset.tab);
        if (panel) panel.classList.add("active");
    });
});

// =======================================
// 10. TIMELINE TOGGLE
// =======================================
function toggleTimeline() {
    const content = document.getElementById("timelineContent");
    const btnText = document.getElementById("tlBtnText");
    const btnIcon = document.getElementById("tlBtnIcon");

    const isHidden = content.style.display === "none" || content.style.display === "";

    if (isHidden) {
        content.style.display = "block";
        btnIcon.textContent = "✖️";
        btnText.setAttribute("data-i18n", "tl_close");
        // re-apply current lang text
        const lang = document.documentElement.dataset.lang || "az";
        const labels = { az: "Zaman Xəttini Bağla", en: "Close Timeline", ru: "Закрыть хронологию" };
        btnText.textContent = labels[lang] || labels.az;
        // trigger reveal for newly visible items
        setTimeout(checkReveal, 50);
    } else {
        content.style.display = "none";
        btnIcon.textContent = "📅";
        btnText.setAttribute("data-i18n", "tl_open");
        const lang = document.documentElement.dataset.lang || "az";
        const labels = { az: "Zaman Xəttini Aç", en: "Open Timeline", ru: "Открыть хронологию" };
        btnText.textContent = labels[lang] || labels.az;
    }
}
// expose globally
window.toggleTimeline = toggleTimeline;

// Patch applyLang to also update toggle button text
const _origApply = window._origApplyLang || applyLang;
const _patchedApply = function (lang) {
    _origApply(lang);
    const content = document.getElementById("timelineContent");
    const btnText = document.getElementById("tlBtnText");
    if (!btnText || !content) return;
    const isOpen = content.style.display !== "none" && content.style.display !== "";
    const openLabels = { az: "Zaman Xəttini Bağla", en: "Close Timeline", ru: "Закрыть хронологию" };
    const closeLabels = { az: "Zaman Xəttini Aç", en: "Open Timeline", ru: "Открыть хронологию" };
    btnText.textContent = isOpen ? openLabels[lang] : closeLabels[lang];
};
document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => _patchedApply(btn.dataset.lang));
});
