<h1 align="center"> Desafio </h1>
<img src="https://github.com/IgorCruzz/desafio-fullstack/blob/igorcruz/chall.gif" width="1100" height="500" />
<hr />

:hammer: Tecnologias utilizadas

Backend:
  Typescript
  NestJS
  TypeORM
  Jest
  SendGrid
  Yup
  JsonWebToken
  Docker
  Bcrypjs
  
Frontend:
  Typescript
  Jest
  Create-react-app
  Styled-components
  React-redux (saga, persist)
  Yup
  Axios


## Instalação

```sh
$ https://github.com/IgorCruzz/desafio-fullstack.git
```

## Como iniciar a aplicação

```sh
$ Docker-compose up
```

## Parar a aplicação

```sh
$ Docker-compose down
```
 

## Testes (backend, frontend)

Lembrando que precisa estár com os container rodando para poder rodar os testes.

### Backend

```sh
$ docker exec app--backend yarn test:cov
```

### Frontend

```sh
$ docker exec app--frontend yarn test
```
  
  
