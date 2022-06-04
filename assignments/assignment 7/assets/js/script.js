const toogleBtn = document.getElementsByClassName('ham-icon')[0]
const navLinks = document.getElementsByClassName('navlist')[0]

toogleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})
