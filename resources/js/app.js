import '../css/app.scss'
import 'bootstrap'

try {
    const card = document.querySelector('.alert-card') 
    const btn = document.querySelector('.alert-btn')     

    btn.onclick = function() {
        card.style.display = "none";
    }
} catch (error) {}
