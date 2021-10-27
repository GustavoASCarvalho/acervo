import Route from '@ioc:Adonis/Core/Route'
import Image from 'App/Models/Image'
import Post from 'App/Models/Post'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'


Route.get('/', async ({ view }) => {
  const images = await Image.query().limit(4).orderBy('created_at', 'desc')
  const posts = await Post.query().orderBy('created_at', 'desc')
  const allImage = await Image.query()
  posts.forEach(post => {
    post['data'] = format(Number(post.createdAt), "dd 'de' MMMM', às ' HH:mm'h'", { locale: ptBR })
  })

  posts.forEach((post) => {
    allImage.forEach((image) => {
      if (image.id == post.imageId) {
        post['image'] = image
      }
    })
  })

  return view.render('home', { images, posts })
})

Route.group(() => {
  Route.get('/image/create', 'ImagesController.create').as('image.create')
  Route.post('/image/create', 'ImagesController.store').as('image.store')
  Route.get('/users', 'AuthController.list').as('auth.list')
  Route.get('/users/:id/edit', 'AuthController.edit').as('auth.edit')
  Route.post('/users/:id/edit', 'AuthController.update').as('auth.update')
  Route.get('/post/:id/create', 'PostsController.create').as('post.create')
  Route.post('/post/:id/create', 'PostsController.store').as('post.store')

  Route.get('/image/:id/edit', 'ImagesController.edit').as('image.edit')
}).middleware('auth')

Route.get('/images', 'ImagesController.index').as('image.index')
Route.post('/images', 'ImagesController.search').as('image.search')


Route.get('/register', 'AuthController.register').as('auth.register')
Route.get('/login', 'AuthController.login').as('auth.login')
Route.post('/register', 'AuthController.store').as('auth.store')
Route.post('/login', 'AuthController.verify').as('auth.verify')
Route.get('/logout', 'AuthController.logout').as('auth.logout')

