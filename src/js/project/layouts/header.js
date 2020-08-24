(function () {
    const toggle = document.querySelector('.header__toggler');
    const menu = document.querySelector('.header__mobile');
    const modal = document.querySelector('.modal.nav');

    toggle.addEventListener('click', () => {
        menu.classList.add('show')
        modal.classList.add('show')
    })
    modal.addEventListener('click',() => {
        menu.classList.remove('show')
        modal.classList.remove('show')
    })
}())
