/* ================================================ */
/*  timeline.js — AzerHistory 3D  Zaman Xətti      */
/* ================================================ */

// =======================================
// REVEAL ANIMATION
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
// i18n TRANSLATIONS
// =======================================
const translations = {
    az: {
        badge: "Zaman Xətti",
        heading: "Azərbaycan Tarixinin Zaman Xətti",
        sub: "400,000 il əvvəldən bu günə qədər — xalqımızın böyük yürüşü",

        tl1_t: "Azıxantrop",
        tl1_d: "Azıx mağarasında pre-neandertal insanın yaşaması. Odun ilk istifadəsi. Azərbaycan bəşəriyyətin ən qədim ocaqlarından biri.",

        tl2_t: "Qobustan Qaya Rəsmləri",
        tl2_d: "Qobustanda minlərlə qaya rəsmi çəkilir — ov səhnələri, rəqs edən insanlar, qayıqlar. Bu günə qədər YUNESKO tərəfindən qorunur.",

        tl3_t: "Kür-Araz Mədəniyyəti",
        tl3_d: "İlk şəhər tipli yaşayış məskənləri. Metal emalı və boyalı qablar sənəti inkişaf edir.",

        tl4_t: "Gəmiqaya Petroqlifləri",
        tl4_d: "Naxçıvanda dağ zirvələrində minlərlə qaya rəsmi. Qədim insanların dünyagörüşünü əks etdirir.",

        tl5_t: "Manna Dövləti",
        tl5_d: "Urmiya gölü ətrafında qüdrətli dövlət. Assuriya ilə müharibələr. Qızıl sənətkarlığının zirvəsi.",

        tl6_t: "Skif Yürüşləri",
        tl6_d: "Köçəri Skif tayfaları Mil düzü və Xınıslı ərazisinə gəlir. Qızıl bəzəklər və döyüş avadanlığı geridə qalır.",

        tl7_t: "Qafqaz Albaniyası",
        tl7_d: "Albaniya dövləti qurulur. Xristianlığın qəbulu. Rum və Parfiya ilə diplomatik əlaqələr.",

        tl8_t: "Mingəçevir Mədəniyyəti",
        tl8_d: "Kür sahilində Albaniyanın ən zəngin nekropolu. Şüşə, qızıl və keramika tapıntıları xarici əlaqələri sübut edir.",

        tl9_t: "Ərəb Xilafəti Dövrü",
        tl9_d: "İslam mədəniyyəti yayılır. Gümüş dirhəmlər zərb edilir. Şirvanşahlar sülaləsi formalaşır.",

        tl10_t: "Şirvanşahlar və Eldənizlər",
        tl10_d: "Qız Qalası son formasını alır, Möminə Xatun türbəsi ucaldılır. Nizami Gəncəvi dövrü — ədəbi intibah.",

        tl11_t: "Səfəvilər İmperiyası",
        tl11_d: "Şah İsmayıl Xətai böyük imperiya qurur. Azərbaycan dili saray dili olur.",

        tl12_t: "Xanlıqlar Dövrü",
        tl12_d: "Şəki Xanlığı, şəbəkə sənəti zirvəyə çatır. Atəşgah məbədi hind tacirləri tərəfindən tikilir — zərdüştlük ənənəsinin son ocağı.",

        tl13_t: "Rusiya İşğalı",
        tl13_d: "Gəncə süqut edir, tarixi qapılar aparılır. Gülüstan və Türkmənçay müqavilələri Azərbaycanı ikiyə bölür.",

        tl14_t: "Azərbaycan Xalq Cümhuriyyəti",
        tl14_d: "Müsəlman dünyasında ilk demokratik respublika elan edilir. Qadınlara seçki hüququ verilir.",

        tl15_t: "Müstəqilliyin Bərpası",
        tl15_d: "Azərbaycan yenidən müstəqillik qazanır. Minilliklərin mirası yeni bir dövlətin təməlinə çevrilir."
    },
    en: {
        badge: "Timeline",
        heading: "Azerbaijan History Timeline",
        sub: "From 400,000 years ago to the present day — the great journey of our people",

        tl1_t: "Azikhantropus",
        tl1_d: "Pre-Neanderthal humans lived in Azykh Cave. First use of fire. Azerbaijan is one of humanity's earliest cradles.",

        tl2_t: "Gobustan Rock Art",
        tl2_d: "Thousands of petroglyphs carved at Gobustan — hunting scenes, dancing figures, boats. Protected by UNESCO to this day.",

        tl3_t: "Kura-Araxes Culture",
        tl3_d: "First urban-type settlements. Metalworking and painted pottery flourish.",

        tl4_t: "Gamigaya Petroglyphs",
        tl4_d: "Thousands of rock carvings on the mountain peaks of Nakhchivan, reflecting the worldview of ancient peoples.",

        tl5_t: "Manna State",
        tl5_d: "Powerful state around Lake Urmia. Wars with Assyria. Peak of gold craftsmanship.",

        tl6_t: "Scythian Incursions",
        tl6_d: "Nomadic Scythian tribes arrive in the Mil plain and Khinisli area, leaving behind gold ornaments and war gear.",

        tl7_t: "Caucasian Albania",
        tl7_d: "Albanian state founded. Adoption of Christianity. Diplomatic ties with Rome and Parthia.",

        tl8_t: "Mingachevir Culture",
        tl8_d: "Albania's richest necropolis on the Kura riverbank. Glass, gold and ceramic finds attest to foreign ties.",

        tl9_t: "Arab Caliphate Era",
        tl9_d: "Spread of Islamic culture. Silver dirhams minted. The Shirvanshah dynasty emerges.",

        tl10_t: "Shirvanshahs & Eldiguzids",
        tl10_d: "The Maiden Tower reaches its final form, the Momine Khatun Mausoleum is raised. The era of Nizami Ganjavi — a literary renaissance.",

        tl11_t: "Safavid Empire",
        tl11_d: "Shah Ismail Khatai builds a great empire. Azerbaijani becomes the court language.",

        tl12_t: "Age of the Khanates",
        tl12_d: "The Sheki Khanate; latticework art reaches its peak. The Ateshgah temple is built by Indian traders — the last hearth of the Zoroastrian tradition.",

        tl13_t: "Russian Conquest",
        tl13_d: "Ganja falls, its historic gates are carried off. The Treaties of Gulistan and Turkmenchay split Azerbaijan in two.",

        tl14_t: "Azerbaijan Democratic Republic",
        tl14_d: "The first democratic republic in the Muslim world is declared. Women are granted suffrage.",

        tl15_t: "Restoration of Independence",
        tl15_d: "Azerbaijan regains its independence. Millennia of heritage become the foundation of a new state."
    },
    ru: {
        badge: "Хронология",
        heading: "Хронология Истории Азербайджана",
        sub: "От 400 000 лет назад до наших дней — великий путь нашего народа",

        tl1_t: "Азыхантроп",
        tl1_d: "Пре-неандертальцы жили в Азыхской пещере. Первое использование огня. Азербайджан — одна из древнейших колыбелей человечества.",

        tl2_t: "Наскальные рисунки Гобустана",
        tl2_d: "Тысячи петроглифов в Гобустане — сцены охоты, танцующие фигуры, лодки. Охраняются ЮНЕСКО по сей день.",

        tl3_t: "Культура Куро-Аракса",
        tl3_d: "Первые городские поселения. Расцвет обработки металла и расписной керамики.",

        tl4_t: "Петроглифы Гямигая",
        tl4_d: "Тысячи наскальных рисунков на горных вершинах Нахчывана, отражающие мировоззрение древних народов.",

        tl5_t: "Государство Манна",
        tl5_d: "Могущественное государство у озера Урмия. Войны с Ассирией. Расцвет золотого мастерства.",

        tl6_t: "Скифские походы",
        tl6_d: "Кочевые скифские племена приходят в Мильскую степь и Хыныслы, оставляя золотые украшения и военное снаряжение.",

        tl7_t: "Кавказская Албания",
        tl7_d: "Основание Албанского государства. Принятие христианства. Дипломатические связи с Римом и Парфией.",

        tl8_t: "Культура Мингячевира",
        tl8_d: "Богатейший некрополь Албании на берегу Куры. Находки стекла, золота и керамики свидетельствуют о внешних связях.",

        tl9_t: "Эпоха Арабского Халифата",
        tl9_d: "Распространение ислама. Чеканка серебряных дирхемов. Формирование династии Ширваншахов.",

        tl10_t: "Ширваншахи и Эльдегизиды",
        tl10_d: "Девичья башня обретает свой окончательный облик, возводится мавзолей Момине-хатун. Эпоха Низами Гянджеви — литературный расцвет.",

        tl11_t: "Империя Сефевидов",
        tl11_d: "Шах Исмаил Хатаи создаёт великую империю. Азербайджанский язык становится придворным.",

        tl12_t: "Эпоха Ханств",
        tl12_d: "Шекинское ханство, искусство резных решёток шебеке достигает расцвета. Храм Атешгях строится индийскими торговцами — последний очаг зороастрийской традиции.",

        tl13_t: "Российское завоевание",
        tl13_d: "Гянджа пала, исторические ворота увезены. Гюлистанский и Туркманчайский договоры разделяют Азербайджан надвое.",

        tl14_t: "Азербайджанская Демократическая Республика",
        tl14_d: "Провозглашена первая демократическая республика в мусульманском мире. Женщины получают право голоса.",

        tl15_t: "Восстановление Независимости",
        tl15_d: "Азербайджан вновь обретает независимость. Тысячелетнее наследие становится основой нового государства."
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

// Apply saved or default lang
applyLang(localStorage.getItem("azerhistory_lang") || "az");
