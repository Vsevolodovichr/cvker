const translations = {
    uk: {
        title: "Генератор резюме",
        name_label: "Ім’я",
        email_label: "Email",
        summary_label: "Коротко про себе",
        generate_btn: "Згенерувати",
    },
    en: {
        title: "Resume Generator",
        name_label: "Name",
        email_label: "Email",
        summary_label: "Summary",
        generate_btn: "Generate",
    }
};

function setLang(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

const langToCountryCode = {
    uk: "UA",
    en: "US",
    fr: "FR",
    de: "DE",
    es: "ES",
    it: "IT",
    pl: "PL",
    cs: "CZ",
    nl: "NL",
    sv: "SE",
    no: "NO",
    fi: "FI",
    zh: "CN",
    ja: "JP",
    ko: "KR",
    tr: "TR",
    pt: "PT",
    ro: "RO",
    
};

function updateLangButton(currentLang) {
    const langBtn = document.getElementById("lang-toggle");
    const countryCode = langToCountryCode[currentLang] || currentLang.toUpperCase();

    langBtn.textContent = countryCode;

    langBtn.onclick = () => {
        const nextLang = currentLang === "uk" ? "en" : "uk";  // тут ти вирішуєш, які саме мови підтримувати
        setLang(nextLang);
        updateLangButton(nextLang);
    };
}


function detectLanguage() {
    let lang = navigator.language || navigator.userLanguage;
    if (lang.startsWith("ru")) lang = "uk";
    else if (lang.startsWith("uk")) lang = "uk";
    else lang = "en";

    setLang(lang);
    updateLangButton(lang);
}

function generateCV() {
    document.getElementById("preview-name").textContent = document.getElementById("name").value;
    document.getElementById("preview-email").textContent = document.getElementById("email").value;
    document.getElementById("preview-summary").textContent = document.getElementById("summary").value;
}

window.onload = detectLanguage;
