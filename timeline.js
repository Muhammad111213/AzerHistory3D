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
        sub: "400,000 il əvvəldən 1918-ci ilə qədər — xalqımızın böyük yürüşü",
        tl1_t: "Azıxantrop",
        tl1_d: "Azıx mağarasında pre-neandertal insanın yaşaması. Odun ilk istifadəsi. Azərbaycan bəşəriyyətin ən qədim ocaqlarından biri.",
        tl2_t: "Eneolit və Tunc Dövrü",
        tl2_d: "Kür-Araz mədəniyyəti. İlk şəhər tipli yaşayış məskənləri. Metal emalı və boyalı qablar sənəti inkişaf edir.",
        tl3_t: "Manna Dövləti",
        tl3_d: "Urmiya gölü ətrafında qüdrətli dövlət. Assuriya ilə müharibələr. Qızıl sənətkarlığının zirvəsi.",
        tl4_t: "Qafqaz Albaniyası",
        tl4_d: "Albaniya dövləti qurulur. Xristianlığın qəbulu. Rum və Parfiya ilə diplomatik əlaqələr.",
        tl5_t: "Ərəb Xilafəti Dövrü",
        tl5_d: "İslam mədəniyyəti yayılır. Gümüş dirhəmlər zərb edilir. Şirvanşahlar sülaləsi formalaşır.",
        tl6_t: "Orta Əsrlər",
        tl6_d: "Nizami Gəncəvi dövrü. Şirvanşahlar sarayı. İpək Yolunun çiçəklənməsi. Memarlıq abidələri.",
        tl7_t: "Səfəvilər İmperiyası",
        tl7_d: "Şah İsmayıl Xətai böyük imperiya qurur. Azərbaycan dili saray dili olur.",
        tl8_t: "Azərbaycan Xalq Cümhuriyyəti",
        tl8_d: "Müsəlman dünyasında ilk demokratik respublika elan edilir. Qadınlara seçki hüququ verilir."
    },
    en: {
        badge: "Timeline",
        heading: "Azerbaijan History Timeline",
        sub: "From 400,000 years ago to 1918 — the great journey of our people",
        tl1_t: "Azikhantropus",
        tl1_d: "Pre-Neanderthal humans lived in Azykh Cave. First use of fire. Azerbaijan is one of humanity's earliest cradles.",
        tl2_t: "Eneolithic & Bronze Age",
        tl2_d: "Kura-Araxes culture. First urban settlements. Metal processing and painted pottery flourish.",
        tl3_t: "Manna State",
        tl3_d: "Powerful state around Lake Urmia. Wars with Assyria. Peak of gold craftsmanship.",
        tl4_t: "Caucasian Albania",
        tl4_d: "Albanian state founded. Adoption of Christianity. Diplomatic ties with Rome and Parthia.",
        tl5_t: "Arab Caliphate Era",
        tl5_d: "Spread of Islamic culture. Silver dirhams minted. Shirvanshah dynasty emerges.",
        tl6_t: "Medieval Period",
        tl6_d: "Era of Nizami Ganjavi. Shirvanshahs Palace. Silk Road flourishes. Architectural monuments.",
        tl7_t: "Safavid Empire",
        tl7_d: "Shah Ismail Khatai builds a great empire. Azerbaijani becomes the court language.",
        tl8_t: "Azerbaijan Democratic Republic",
        tl8_d: "First democratic republic in the Muslim world declared. Women granted suffrage."
    },
    ru: {
        badge: "Хронология",
        heading: "Хронология Истории Азербайджана",
        sub: "От 400 000 лет назад до 1918 года — великий путь нашего народа",
        tl1_t: "Азыхантроп",
        tl1_d: "Пре-неандертальцы жили в Азыхской пещере. Первое использование огня. Азербайджан — одна из древнейших колыбелей человечества.",
        tl2_t: "Энеолит и Бронзовый Век",
        tl2_d: "Культура Куро-Аракса. Первые городские поселения. Обработка металла и расписная керамика.",
        tl3_t: "Государство Манна",
        tl3_d: "Могущественное государство у озера Урмия. Войны с Ассирией. Расцвет золотого мастерства.",
        tl4_t: "Кавказская Албания",
        tl4_d: "Основание Албанского государства. Принятие христианства. Дипломатические связи с Римом и Парфией.",
        tl5_t: "Эпоха Арабского Халифата",
        tl5_d: "Распространение ислама. Чеканка серебряных дирхемов. Формирование династии Ширваншахов.",
        tl6_t: "Средние Века",
        tl6_d: "Эпоха Низами Гянджеви. Дворец Ширваншахов. Расцвет Шёлкового Пути. Архитектурные памятники.",
        tl7_t: "Империя Сефевидов",
        tl7_d: "Шах Исмаил Хатаи создаёт великую империю. Азербайджанский язык становится придворным.",
        tl8_t: "Азербайджанская Демократическая Республика",
        tl8_d: "Провозглашена первая демократическая республика в мусульманском мире. Женщины получают право голоса."
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
