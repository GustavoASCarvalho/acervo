import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class AppSeeder extends BaseSeeder {
  public async run() {
    await User.create(
      {
        email: 'gustavoalexandrescarvalho@gmail.com',
        isAdmin: true,
        name: 'Gustavo Alexandre',
        password: '12345678',
        profileImg: 'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg',
      },
    )
  }
}
