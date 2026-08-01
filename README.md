# TIC - Desenvolvimento em Node.js

API REST desenvolvida em **Node.js** utilizando **Express**, **Sequelize** e **MySQL**, com autenticação baseada em **JSON Web Token (JWT)**. O projeto demonstra a implementação de boas práticas de desenvolvimento back-end, incluindo organização em camadas, autenticação, persistência de dados e testes automatizados.

## Objetivo

Este projeto foi desenvolvido com fins de estudo e prática dos principais conceitos envolvidos na construção de APIs REST utilizando o ecossistema Node.js.

Entre os conceitos abordados estão:

* Arquitetura em camadas (Routes, Controllers e Models);
* ORM com Sequelize;
* Persistência de dados em MySQL;
* Autenticação utilizando JWT;
* Criptografia de senhas com Bcrypt;
* Testes automatizados utilizando Jest e Supertest;
* Migrations e Seeders para gerenciamento do banco de dados.

---

# Tecnologias utilizadas

* Node.js
* Express
* Sequelize
* MySQL
* JSON Web Token (JWT)
* Bcrypt
* Jest
* Supertest
* Docker (utilizado durante o desenvolvimento do banco de dados)

---

# Estrutura do projeto

```
.
├── config/
├── controllers/
├── middleware/
├── migrations/
├── models/
├── routes/
├── seeders/
├── tests/
├── app.js
├── package.json
└── README.md
```

---

# Funcionalidades

* Cadastro de usuários
* Login com autenticação JWT
* CRUD completo de funcionários (Employees)
* CRUD completo de cargos (Positions)
* Proteção de rotas privadas
* Persistência em banco de dados MySQL
* Testes automatizados da API

---

# Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Node.js
* npm
* MySQL

---

# Banco de dados

Durante o desenvolvimento foi utilizado um servidor **MySQL executando em um container Docker**.

Entretanto, **o Docker não é obrigatório** para executar o projeto.

Você pode utilizar qualquer instância compatível de MySQL, por exemplo:

* MySQL instalado localmente;
* Docker;
* Docker Compose;
* XAMPP;
* WAMP;
* Laragon;
* Servidor MySQL remoto.

Basta configurar corretamente as credenciais de acesso ao banco de dados conforme o arquivo de configuração do projeto.

## Exemplo utilizando Docker

```bash
docker run \
--name mysql-estudos \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=software_house \
-p 3306:3306 \
-d mysql:8
```

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/Nicolas-KS24/TIC-Desenvolvimento_em_Node-JS.git
```

Entre na pasta:

```bash
cd TIC-Desenvolvimento_em_Node-JS
```

Instale as dependências:

```bash
npm install
```

---

# Configuração

Configure a conexão com o banco de dados conforme as credenciais utilizadas em seu ambiente.

Após isso execute as migrations:

```bash
npx sequelize-cli db:migrate
```

Caso deseje popular o banco com dados iniciais:

```bash
npx sequelize-cli db:seed:all
```

---

# Executando a aplicação

```bash
node app.js
```

O servidor será iniciado na porta configurada pelo projeto.

---

# Autenticação

A API utiliza autenticação baseada em **JWT (JSON Web Token)**.

Após realizar o login, um token é retornado.

Esse token deve ser enviado no cabeçalho das requisições protegidas:

```
Authorization: Bearer SEU_TOKEN
```

---

# Endpoints

## Usuários

| Método | Endpoint             | Descrição           |
| ------ | -------------------- | ------------------- |
| POST   | `/users/create-user` | Cadastro de usuário |
| POST   | `/users/login`       | Login               |

## Funcionários

| Método | Endpoint         |
| ------ | ---------------- |
| GET    | `/employees`     |
| GET    | `/employees/:id` |
| POST   | `/employees`     |
| PUT    | `/employees/:id` |
| DELETE | `/employees/:id` |

## Cargos

| Método | Endpoint         |
| ------ | ---------------- |
| GET    | `/positions`     |
| GET    | `/positions/:id` |
| POST   | `/positions`     |
| PUT    | `/positions/:id` |
| DELETE | `/positions/:id` |

---

# Testes

Para executar os testes automatizados:

```bash
npm test
```

Os testes foram desenvolvidos utilizando:

* Jest
* Supertest

---

# Documentação da API

A documentação Swagger poderá ser acessada em:

```
http://localhost:8000/api-docs
```
