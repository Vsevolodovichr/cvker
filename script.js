let translations = {};
let currentLang = "en";

function loadTranslation(lang) {
    fetch(`locales/${lang}.json`)
        .then((response) => {
            if (!response.ok) throw new Error("Language file not found");
            return response.json();
        })
        .then((data) => {
            translations = data;
            setLang(lang);
        })
        .catch(() => {
            console.warn(`Missing translation for: ${lang}`);
            if (lang !== "en") loadTranslation("en");
        });
}

function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
    updateLangButton(getCountryCode(lang));
}

function getCountryCode(langTag) {
    const parts = langTag.split("-");
    const region = parts[1];
    const lang = parts[0];
    const fallback = {
        uk: "UA",
        en: "US",
        ru: "UA",
    };
    return region ? region.toUpperCase() : (fallback[lang] || lang.toUpperCase());
}

function updateLangButton(code) {
    const langBtn = document.getElementById("lang-toggle");
    langBtn.textContent = code;
    langBtn.onclick = () => {
        const nextLang = currentLang === "uk" ? "en" : "uk";
        loadTranslation(nextLang);
    };
}

function detectLanguage() {
    let lang = (navigator.language || "en").toLowerCase();
    if (lang.startsWith("ru")) lang = "uk";
    else if (!["uk", "en"].includes(lang.substring(0, 2))) lang = "en";
    loadTranslation(lang.substring(0, 2));
}

function generateCV() {
    document.getElementById("preview-name").textContent = document.getElementById("name").value;
    document.getElementById("preview-email").textContent = document.getElementById("email").value;
    document.getElementById("preview-summary").textContent = document.getElementById("summary").value;
}

async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const summary = document.getElementById("summary").value;
    doc.setFontSize(16);
    doc.text(name, 10, 20);
    doc.setFontSize(12);
    doc.text(email, 10, 30);
    doc.text(summary, 10, 40);
    doc.save("resume.pdf");
}

window.onload = detectLanguage;