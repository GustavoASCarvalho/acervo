import '../css/nav.scss'

const nav = document.querySelector('nav')

const login = document.querySelector('.login')
const closeLogin = document.querySelector('#closeLogin')

const register = document.querySelector('.register')
const closeRegister = document.querySelector('#closeRegister')

const btnOpenRegister = document.querySelector('#openRegister')
const btnOpenLogin = document.querySelector('#openLogin')

const logo = document.querySelector('.logo-div')

window.addEventListener('scroll', (e)=>{
    var height = window.pageYOffset
    if (height > 100) {
        nav.classList.add('scroll')
        logo.style.transform = "scale(0.6)"
    }else {
        nav.classList.remove('scroll')
        logo.style.transform = "scale(1.0)"
    }
})

if(register.classList[1] == 'display-block' || login.classList[1] == 'display-block'){
    document.documentElement.style.overflow = 'hidden';
}

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