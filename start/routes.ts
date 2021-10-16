import Route from '@ioc:Adonis/Core/Route'
import Image from 'App/Models/Image'

Route.get('/', async ({ view }) => {
  const images = await Image.query().limit(3).orderBy('created_at', 'desc')
  return view.render('home', { images })
})

Route.group(() => {
  Route.get('/image/create', 'ImagesController.create').as('image.create')
  Route.post('/image/create', 'ImagesController.store').as('image.store')
  Route.get('/users', 'AuthController.list').as('auth.list')
  Route.get('/users/:id/edit', 'AuthController.edit').as('auth.edit')
  Route.post('/users/:id/edit', 'AuthController.update').as('auth.update')
}).middleware('auth')

Route.get('/images', 'ImagesController.index').as('image.index')


Route.post('/register', 'AuthController.store').as('auth.store')
Route.post('/login', 'AuthController.verify').as('auth.verify')
Route.get('/logout', 'AuthController.logout').as('auth.logout')

