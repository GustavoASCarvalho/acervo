import Route from '@ioc:Adonis/Core/Route'
import Image from 'App/Models/Image'
import Post from 'App/Models/Post'

Route.get('/', async ({ view }) => {
  const images = await Image.query().limit(3).orderBy('created_at', 'desc')
  const posts = await Post.query().limit(3).orderBy('created_at', 'desc')
  const allImage = await Image.query()
  
  posts.forEach((post) => {
    allImage.forEach((image) => {
      if(image.id == post.imageId){
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
  Route.get('/post/create', 'PostsController.create').as('post.create')
  Route.post('/post/create', 'PostsController.store').as('post.store')
}).middleware('auth')

Route.get('/images', 'ImagesController.index').as('image.index')


Route.get('/register', 'AuthController.register').as('auth.register')
Route.get('/login', 'AuthController.login').as('auth.login')
Route.post('/register', 'AuthController.store').as('auth.store')
Route.post('/login', 'AuthController.verify').as('auth.verify')
Route.get('/logout', 'AuthController.logout').as('auth.logout')

