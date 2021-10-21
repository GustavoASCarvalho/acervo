import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class AppSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        email: 'admin@gmail.com',
        isAdmin: true,
        name: 'administrador',
        password: '12345678',
        profileImg: 'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg',
      },
      {
        email: 'moderador@gmail.com',
        isModerator: true,
        name: 'moderador',
        password: '12345678',
        profileImg: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      }
    ])

    const user = await User.create({
        email: 'gustavoalexandrescarvalho@gmail.com',
        isAdmin: true,
        name: 'Gustavo Alexandre',
        password: '12345678',
        profileImg: 'https://conteudo.imguol.com.br/c/entretenimento/d5/2020/10/07/homem-com-vergonha-1602098705397_v2_450x450.jpg',
    })

    await user.related('images').createMany([
      {
        font: 'José Gonçalves',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/241535322_4076352785797995_5805993625528863302_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=973b4a&_nc_ohc=Cc5e8q2VARoAX_MuMWG&_nc_ht=scontent.fjoi9-1.fna&oh=f2ee7e913ce7f43ed5c4026d871144a9&oe=61944F1C',
        name: '150 anos da independencia do brasil - Coral',
        year: 1972,
      },
      {
        font: 'Gonçalves Dias',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/240602037_4066202943479646_1071727867294061609_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=973b4a&_nc_ohc=l-bvy0pEW_4AX-GTC96&_nc_ht=scontent.fjoi9-1.fna&oh=120ff72542acfa5ec9d4a0e8c549c4f3&oe=61943CC1',
        name: 'eusébio de queirós',
        year: 1850,
      },
      {
        font: 'Renan',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/240663845_4055302411236366_6121010034442026588_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=973b4a&_nc_ohc=pxmct65_isgAX90Dbyq&_nc_ht=scontent.fjoi9-1.fna&oh=4321ce1fd022cadc7d06ef4832448531&oe=61963A87',
        name: 'Morre parnanguara',
        year: 1940,
      },
      {
        font: 'Samantha',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/240706828_4054535751313032_7587016396876387896_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=973b4a&_nc_ohc=WR_PjaIP2qUAX9v8Fqw&_nc_ht=scontent.fjoi9-1.fna&oh=cbe9a5499cff87532f4139dd6bd53fec&oe=6195D812',
        name: 'Diario do Commercio',
        year: 1992,
      },
      {
        font: 'Gabriela',
        url: 'https://scontent.fjoi9-1.fna.fbcdn.net/v/t1.6435-9/240411467_4027820420651232_13091553573406744_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=973b4a&_nc_ohc=ygRUaWvZFkMAX_SdreR&_nc_ht=scontent.fjoi9-1.fna&oh=59ffe72fe957f0ec408b75b4d365cbb4&oe=61975D79',
        name: 'IVETE CECYN Rainha do Carnaval 1955',
        year: 1955,
      }
    ])

    await user.related('posts').createMany([
      {
      description: 'D. Pedro II, por Graça de Deus, e Unanime Acclamação dos Povos, Imperador Constitucional e Defensor Perpetuo do Brasil. Fazemos saber a todos os Nossos subditos, que a Assembléa Geral Decretou, e Nós Queremos a Lei seguinte Art. 1º As Forças Navaes em .',
      imageId: 1,
      title: 'A volta de D. Pedro II',      
      },
      {
        description: 'Paranaguá ocupou uma posição, tinha um status, por causa da fábrica de pólvora e do Porto, que era a "internet" da época. O Zé Maria havia comentado que nas obras na sua casa, encontrou pedaços de pedra, que eram possivelmente da fábrica de pólvora. Quem sabe a família do Azuil, Azuiléia tenham mais elementos. Essa foto merece uma exposição e levantamento dos FATOS.',
        imageId: 2,
        title: 'Paranaguá merece mais',      
      }
    ])
  }

  
}
