function detectLanguage() {
    let lang = navigator.language || navigator.userLanguage;

    if (lang.startsWith("ru")) lang = "uk";
    else if (lang.startsWith("uk")) lang = "uk";
    else lang = "en";

    setLang(lang);
    updateLangButton(lang);
}

function updateLangButton(currentLang) {
    const langBtn = document.getElementById("lang-toggle");
    langBtn.textContent = currentLang.toUpperCase();

    langBtn.onclick = () => {
        const nextLang = currentLang === "uk" ? "en" : "uk";
        setLang(nextLang);
        updateLangButton(nextLang);
    };
}

function setLang(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

window.onload = detectLanguage;

function generateCV() {
    const form = document.forms['cv-form'];
    document.getElementById('cv-name').innerText = form.name.value;
    document.getElementById('cv-title').innerText = form.title.value;
    document.getElementById('cv-about').innerText = form.about.value;
}

function downloadPDF() {
    const element = document.getElementById('cv-template');
    html2pdf().from(element).save('cv.pdf');
}


