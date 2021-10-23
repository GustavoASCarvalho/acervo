import '../css/auth.scss'

try {
    const tbody = document.querySelector('tbody')
    const tr = document.querySelectorAll('tr')
    const input = document.querySelector('#data')

    input.addEventListener('keyup', (e) => {
        if (input.value.length > 3) {
            tbody.innerHTML = ""
            tr.forEach((value) => {
                const name = value.children[0].textContent.toLowerCase()
                const email = value.children[1].textContent.toLowerCase()
                const data = input.value.toLowerCase()
                if (name.includes(data) || email.includes(data)) {
                    tbody.innerHTML += value.innerHTML
                }
            })
        } else {
            tbody.innerHTML = ""
            tr.forEach((value) => {
                tbody.innerHTML += value.innerHTML
            })
        }
    })
} catch {

}