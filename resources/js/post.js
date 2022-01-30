import '../css/post.scss'

import Masonry from 'masonry-layout'

const grid = document.querySelector('#grid')

if (grid) {
    window.addEventListener('load', () => {
        new Masonry(grid, {
            itemSelector: '.col'
        })
    })
}


box.addEventListener('click', function () {


    new Masonry(grid, {
        itemSelector: '.col'
    })
});