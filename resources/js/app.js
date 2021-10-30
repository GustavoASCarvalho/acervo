import '../css/app.scss'
import 'bootstrap'

try {
    const card = document.querySelector('.alert-card')
    const btn = document.querySelector('.alert-btn')

    btn.onclick = function () {
        card.style.display = "none";
    }
} catch (error) { }

try {
    const image = document.querySelectorAll('.carousel-item')
    image[0].classList.add('active')
} catch (error) { }

try {
    const ul = document.querySelector('#post_list')
    const li = document.querySelectorAll('.post_item')
    const btn = document.querySelector('#btn-load')

    if (!ul || !li || !btn) {
        throw new Error('Element not found')
    }

    var aux
    if (li.length > 3) {
        aux = 3
    } else {
        aux = li.length
    }

    function showPosts() {
        ul.innerHTML = ''
        for (let i = 0; i < aux; i++) {
            ul.appendChild(li[i])
        }
    }

    window.addEventListener('load', showPosts)
    btn.onclick = function () {
        if (aux + 3 < li.length) {
            aux += 3
        } else if (aux + 2 < li.length) {
            aux += 2
        } else if (aux + 1 < li.length) {
            aux += 1
        }
        showPosts()
    }

} catch (error) { }