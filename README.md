# vote.eirb.fr

> A voting site to decide among the different lists running in the ENSEIRB-Matmeca campaigns.

## Installation

> Before running the project, take a time to create a `.env` file based on the `.env.example` file. **WARNING**: Do not keep the default values in production.

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Starting the database

```shell
docker-compose up -f ./docker-compose.db.yaml up -d
```

### Starting the backend in production mode

```
yarn && yarn run start
```

### Starting the frontend in production mode

```
yarn && yarn dev
```

### PODUCTION MODE BACKEND

```shell
docker compose -f docker-compose.api.yaml up --build -d
```
