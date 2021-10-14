import '../css/nav.scss'

const nav = document.querySelector('nav')
const h1 = document.querySelector('h1')

const login = document.querySelector('.login')
const closeLogin = document.querySelector('#closeLogin')

const register = document.querySelector('.register')
const closeRegister = document.querySelector('#closeRegister')

const btnOpenRegister = document.querySelector('#openRegister')
const btnOpenLogin = document.querySelector('#openLogin')

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

btnOpenRegister.onclick = function() {
    login.style.display = "none"
    register.style.display = "block"
}

btnOpenLogin.onclick = function() {
    register.style.display = "none"
    login.style.display = "block"
}
  
closeLogin.onclick = function() {
    login.style.display = "none";
    document.documentElement.style.overflow = 'visible';
}

closeRegister.onclick = function() {
    register.style.display = "none";
    document.documentElement.style.overflow = 'visible';
}

window.onclick = function(event) {
    if (event.target == login || event.target == register) {
        document.documentElement.style.overflow = 'visible';
        login.style.display = "none";
        register.style.display = "none";
    }
}

try {
    const btnRegister = document.querySelector('#btnRegister')
    const btnLogin = document.querySelector('#btnLogin')    

    btnLogin.onclick = function() {
        login.style.display = "block";
        document.documentElement.style.overflow = 'hidden';
    }
    
    btnRegister.onclick = function() {
        register.style.display = "block";
        document.documentElement.style.overflow = 'hidden';
    }
} catch {}