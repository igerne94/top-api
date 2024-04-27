# TODO:

- Advanced MongoDB ✅
- Prod..
  - Docker/docker compose ✅
  - Set up github actions ✅
  - Set up Container Registry: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry ✅
- Integration w Telegram
- Tests for Auth
- Tests for Review, Product, Page, etc
- Files uploads

# Top API

![Top API logo](https://raw.githubusercontent.com/igerne94/top-api/main/logo.webp)

**Top API** helps users to find the best products in various categories based on comprehensive reviews (with advantages and disadvantages) and ratings.

## Features

- **Comprehensive Product Reviews:** Access detailed reviews for a wide range of products.
- **Advanced Filtering:** Utilize complex queries to find products based on specific criteria.
- **User Authentication:** Secure user management with encrypted passwords and JWT for sessions.
- **Docker Integration:** Ready to deploy with Docker for easy setup and scalability.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```

## Architecture Patters / Code Style

The project is writted with [Nest.js](https://docs.nestjs.com/).

- Tools to set up environment: Node.js, MongoDB, TSLint, nvm, nestjs-cli;
- ~~docker-compose.yml to run MongoDB;~~
- dockerfile to build the image of the app, and docker-compose.yml to run the container;
- Data validation:
  - ![Data-validation logo](https://raw.githubusercontent.com/igerne94/top-api/main/data-validation.webp);
  - Validation Pipes and Exception filters;
  - On this step the Winston logger can be considered;
- Authorization and authentication:
  - Since passwords will not be stored openly in DB, the bcrypt library will be used to encrypt and hash passwords, and then compare them sync or async with the plain string provided by the user while logging in;
  - Authorization will be done with JWT, nestjs/jwt library, passport (pasport-wrapper, passport itself, and one of the strategies);
    - ![jwt logo](https://github.com/igerne94/top-api/blob/main/jwt.png);
    - in auth.service: when a user logs in, an access_token is generated and returned to the client;

## Debugging notes

- Something to pay attention: https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-handle-errors-gracefully-and-return-standard-error-codes

- When testing product with reviews, in mongoDB the "productId" field by default is string, but should be converted to ObjectId(). It is possible to change type manually from compas and then the request with getting a product with appropriate reviews will be correct, otherwise some reviews can be missed.

- When setting up workflows, DOCKER_USERNAME and DOCKER_PASSWORD consts are used. DOCKER_USERNAME set up in github repo secrets and is an owner username, while DOCKER_PASSWORD is a personal access token value, which is added to github secrets as well.
