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

function downloadPDF() {
    const element = document.getElementById('cv-template');
    html2pdf().from(element).save('cv.pdf');
}

window.onload = () => {
    const savedLang = localStorage.getItem('lang') || 'uk';
    setLang(savedLang);
};
