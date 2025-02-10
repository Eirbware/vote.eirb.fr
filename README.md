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

### Starting the backend

```
yarn && yarn run start
```

### Starting the frontend

```
yarn && yarn dev
```

# TODO

- [ ] Easter egg on admin page with a fake score on current campaign, this score should be proportional to the amount of time remaining before the end of the vote session.
