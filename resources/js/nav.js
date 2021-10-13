import '../css/nav.scss'

const nav = document.querySelector('nav')
const h1 = document.querySelector('h1')

window.addEventListener('scroll', (e)=>{
    var height = window.pageYOffset
    if (height > 100) {
        nav.classList.add('scroll')
        h1.classList.remove('fs-3')
        h1.classList.add('fs-5')
    }else {
        nav.classList.remove('scroll')
        h1.classList.remove('fs-5')
        h1.classList.add('fs-3')
    }
})