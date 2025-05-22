function setLang(lang) {
    document.querySelectorAll('[data-lang-uk]').forEach(el => {
        el.textContent = lang === 'uk' ? el.dataset.langUk : el.dataset.langEn;
    });
    localStorage.setItem('lang', lang);
}

function generateCV() {
    const form = document.forms['cv-form'];
    document.getElementById('cv-name').innerText = form.name.value;
    document.getElementById('cv-title').innerText = form.title.value;
    document.getElementById('cv-about').innerText = form.about.value;
}
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

window.onload = detectLanguage;

function downloadPDF() {
    const element = document.getElementById('cv-template');
    html2pdf().from(element).save('cv.pdf');
}

window.onload = () => {
    const savedLang = localStorage.getItem('lang') || 'uk';
    setLang(savedLang);
};
