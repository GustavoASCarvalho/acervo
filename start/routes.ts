import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
})

Route.get('/images', 'ImagesController.index').as('image.index')
Route.get('/image/create', 'ImagesController.create').as('image.create')
Route.post('/image/create', 'ImagesController.store').as('image.store')

Route.get('/register', 'AuthController.register').as('auth.register')
Route.post('/register', 'AuthController.store').as('auth.store')
Route.get('/login', 'AuthController.login').as('auth.login')
Route.post('/login', 'AuthController.verify').as('auth.verify')
Route.get('/logout', 'AuthController.logout').as('auth.logout')