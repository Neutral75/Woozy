const forms = document.querySelector('.link');
const links = document.querySelectorAll('.alternative-link');

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        forms.classList.toggle('show-woozyinfo');
    });
});