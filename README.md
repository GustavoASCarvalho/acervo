<p align="center">
  <h1 align="center">Sistema de Acervo</h1>
</p>

<p>Você acaba de encontrar meu repositório do sistema de imagens para preservação do patrimonio histórico de paranaguá no GitHub, nele você como usuario podera visualizar as imagens e suas histórias, e como moderador você podera cadastra-las</p>

## Index

- [Index](#index)
- [Como rodar](#como-rodar)
- [Classes](#classes)
- [CheckList](#checklist)
- [Participantes](#participantes)

## Como rodar

Requisitos

- nodejs^14.17.0
- npm^6.14.12
- postgresql^13

Na raiz do projeto

- Criar o arquivo .env seguindo os padrões do .env.example

```shell
  npm i                   # Instala as dependencias do projeto
  node ace migration:run  # Inicializa o banco de dados
  node ace db:seed        # Insere alguns dados de teste no banco de dados
  node ace serve          # Roda um servidor local para visualização do projeto
```

## Classes

- Image
- Auth
- Post
- Tags
- Collections

## CheckList

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
- [x] ...

## Participantes

1. [@GustavoAlexandre](https://github.com/GustavoASCarvalho)
