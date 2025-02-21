# vote.eirb.fr

A voting site to decide among the different lists running in the ENSEIRB-Matmeca campaigns.

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Requirements](#requirements)
- [Running the Project](#running-the-project)
  - [Database](#database)
  - [Backend (Development)](#backend-development)
  - [Frontend (Development)](#frontend-development)
- [Production Deployment](#production-deployment)
  - [Backend Production](#backend-production)
  - [Frontend Production](#frontend-production)
- [Seeding the Admin User](#seeding-the-admin-user)

---

## Overview

Vote.eirb.fr is a web application designed to facilitate the voting process for various lists running in ENSEIRB-Matmeca campaigns. The platform allows users to cast their votes and administrators to manage campaigns and view results.

---

## Installation

### Environment Setup

1. **Create a `.env` file**  
   Copy the provided `.env.example` and configure it according to your environment.  
   **WARNING:** Do not use the default values in production.

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Running the Project

### Database

Start the database container using Docker Compose:

```shell
docker-compose -f ./docker-compose.db.yaml up -d
```

### Backend (Development)

Install dependencies and start the backend in development mode:

```shell
cd backend
yarn
yarn dev
```

### Frontend (Development)

Install dependencies and start the frontend in development mode:

```shell
cd frontend
yarn
yarn start
```

## Production Deployment

Do not forget to start the database container before deploying the backend and frontend.

### Backend Production

Build and run the backend using Docker Compose for production:

```shell
docker-compose -f ./docker-compose.adpi.yaml up -d
```

### Frontend Production

Build and run the frontend using Docker Compose for production:

```shell
docker-compose -f ./docker-compose.www.yaml up -d
```

### Seeding the Admin User

To seed the initial admin user, run:

```shell
docker compose -f docker-compose.cli.yaml up --build
```
