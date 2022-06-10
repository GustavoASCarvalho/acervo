<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] 
[![MIT License][license-shield]][license-url]-->
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">Acervo Digital</h1>

  <p align="center">
    <i>Acervo Digital</i> is a image storage system to preserve the historical heritage of Paranaguá, you as a user can view the images and their stories, and as a moderator you can register them.
    <br />
    <a href="https://github.com/GustavoASCarvalho/Acervo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/GustavoASCarvalho/Acervo">View Demo</a>
    ·
    <a href="https://github.com/GustavoASCarvalho/Acervo/issues">Report Bug</a>
    ·
    <a href="https://github.com/GustavoASCarvalho/Acervo/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

[![Acervo Digital Screen Shot][product-screenshot]](https://acervo-paranagua.herokuapp.com/)

### Built With

* [Adonis.js](https://adonisjs.com/)
* [Bootstrap](https://getbootstrap.com)
* [Bootstrap-Icons](https://icons.getbootstrap.com/)
* [SASS](https://sass-lang.com/)
* [Heroku](https://www.heroku.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you can set up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [nodejs](https://nodejs.org/en/)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/GustavoASCarvalho/Acervo.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create database called "acervo"
4. Copy `.env.example` and set your envs
   ```env
   DATABASE_URL=postgresql://postgres:123@localhost/acervo
   S3_KEY=YOUR_S3_KEY
   S3_SECRET=YOUR_S3_SECRET
   S3_BUCKET=YOUR_S3_BUCKET 
   S3_REGION=YOUT_S3_REGION 
   ```
5. Initialize your database and populate it
   ```sh
   node ace migration:run
   node ace db:seed
   ```
6. Run the project
   ```sh
   node ace serve
   ```

  
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Implementação do [AdonisJS](https://adonisjs.com/)
- [x] Implementação do [Bootstrap](https://getbootstrap.com/)
- [x] Implementação do banco de dados Postgresql
- [x] Models e migrations aplicados
- [x] Autenticação adicionada
- [x] Atribuição de relações
- [x] Criação de um seeder paro banco de dados
- [x] Estilização de paginas
- [x] Adicionado validações de formulários
- [x] Adicionado bibliotecas de segurança
- [x] Atualizando relação de modelagem imagem/post para N pra N

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Gustavo Alexandre da Silva Carvalho - [Linkedin](https://www.linkedin.com/in/gustavo-alexandre-da-silva-carvalho-228b64210/) - gustavoalexandrescarvalho@gmail.com

Project Link: [https://github.com/GustavoASCarvalho/Acervo](https://github.com/GustavoASCarvalho/Acervo)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [Repository README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[contributors-url]: https://github.com/GustavoASCarvalho/Acervo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[forks-url]: https://github.com/GustavoASCarvalho/Acervo/network/members
[stars-shield]: https://img.shields.io/github/stars/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[stars-url]: https://github.com/GustavoASCarvalho/Acervo/stargazers
[issues-shield]: https://img.shields.io/github/issues/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[issues-url]: https://github.com/GustavoASCarvalho/Acervo/issues
[license-shield]: https://img.shields.io/github/license/GustavoASCarvalho/Acervo.svg?style=for-the-badge
[license-url]: https://github.com/GustavoASCarvalho/Acervo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/gustavo-alexandre-da-silva-carvalho-228b64210
[product-screenshot]: resources/images/screencapture.png
