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
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

function getCountryCode(langTag) {
    const parts = langTag.split("-");
    const region = parts[1];
    const lang = parts[0];
    if (region) return region.toUpperCase();

    const fallback = {
        uk: "UA",
        en: "US",
        fr: "FR",
        de: "DE",
        es: "ES",
        it: "IT",
        ru: "UA",
    };
    return fallback[lang] || lang.toUpperCase();
}

function updateLangButton(countryCode) {
    const langBtn = document.getElementById("lang-toggle");
    langBtn.textContent = countryCode;
    langBtn.onclick = () => {
        const current = document.documentElement.lang;
        const nextLang = current === "uk" ? "en" : "uk";
        setLang(nextLang);
        updateLangButton(getCountryCode(nextLang));
    };
}

function detectLanguage() {
    let lang = (navigator.language || "en").toLowerCase();
    if (lang.startsWith("ru")) lang = "uk";
    else if (!["uk", "en"].includes(lang.substring(0, 2))) lang = "en";

    const shortLang = lang.substring(0, 2);
    setLang(shortLang);
    updateLangButton(getCountryCode(lang));
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