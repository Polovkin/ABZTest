(function (){
    const toggle = document.querySelector('.header__toggler');
    const menu = document.querySelector('.header__mobile');
    const modal = document.querySelector('.modal.nav');

    toggle.addEventListener('click',() => {
        menu.classList.toggle('show')
        modal.classList.toggle('show')
    })
}())
