import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PostHasImage from 'App/Models/PostHasImage'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'
import UserImageHasTag from 'App/Models/UserImageHasTag'

export default class AppSeeder extends BaseSeeder {
  public async run() {
    const users = await User.createMany([
      {
        email: 'gustavoalexandrescarvalho@gmail.com',
        isAdmin: true,
        name: 'Gustavo Alexandre',
        password: '12345678',
        profileImg: 'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg',
      },
      {
        email: 'usuario@gmail.com',
        isModerator: true,
        name: 'Roberto Ramos',
        password: '12345678',
        profileImg: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      }
    ])

    await users[0].related('images').createMany([
      {
        font: 'José Gonçalves',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/69019728_1984618944971400_3133589645032423424_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=CaMb5k8RAzUAX9x80s9&_nc_ht=scontent.fjoi9-1.fna&oh=9679b75d7ba7d6819e518a11916751cf&oe=61BA1848',
        name: '150 anos da independencia do brasil - Coral',
        year: 1972,
      },
      {
        font: 'Gonçalves Dias',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/69307932_1984625261637435_1230887556304863232_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=qlrTDUq4epYAX--EP7Y&_nc_ht=scontent.fjoi9-1.fna&oh=c947fb99891499af6ffbb770e84c0368&oe=61BB4657',
        name: 'eusébio de queirós',
        year: 1850,
      },
      {
        font: 'Ludovica',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/69307932_1984625261637435_1230887556304863232_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=qlrTDUq4epYAX--EP7Y&_nc_ht=scontent.fjoi9-1.fna&oh=c947fb99891499af6ffbb770e84c0368&oe=61BB4657',
        name: 'eusébio de queirós',
        year: 1850,
      },
    ])


    await users[1].related('posts').createMany([
      {
        description: 'D. Pedro II, por Graça de Deus, e Unanime Acclamação dos Povos, Imperador Constitucional e Defensor Perpetuo do Brasil. Fazemos saber a todos os Nossos subditos, que a Assembléa Geral Decretou, e Nós Queremos a Lei seguinte Art. 1º As Forças Navaes em .',
        title: 'A volta de D. Pedro II',
        views: 10,
      },
      {
        description: 'Paranaguá ocupou uma posição, tinha um status, por causa da fábrica de pólvora e do Porto, que era a "internet" da época. O Zé Maria havia comentado que nas obras na sua casa, encontrou pedaços de pedra, que eram possivelmente da fábrica de pólvora. Quem sabe a família do Azuil, Azuiléia tenham mais elementos. Essa foto merece uma exposição e levantamento dos FATOS.',
        title: 'Paranaguá merece mais',
      }
    ])

    await users[1].related('logs').createMany([
      {
        imageId: 1,
        action: 'update',
        type: 'image',
        message: 'Usuário alterou a imagem',
      }
    ])

    await Tag.createMany([
      {
        tag: 'história',
      },
      {
        tag: 'Dom Pedro',
      }
    ])

    await UserImageHasTag.create({
      imageId: 1,
      tagId: 1,
    })

    await PostHasImage.createMany([
      {
        postId: 1,
        imageId: 1,
      },
      {
        postId: 1,
        imageId: 2,
      }
    ])
  }
}
