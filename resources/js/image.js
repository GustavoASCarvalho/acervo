import Masonry from 'masonry-layout'
import '../css/image.scss'

const grid = document.querySelector('#grid')

window.addEventListener('load', () => {
    new Masonry(grid, {
        itemSelector: '.col'
    })
})