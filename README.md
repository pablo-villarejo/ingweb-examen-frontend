# Backend Exam

## Requirements

Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

>[!NOTE]
>If you are rebuilding the containers, you may need to remove the existing ones to avoid conflicts. You can do this by running the following command.
>```bash
>docker system prune -a
>```

## Deploying the project

1. Clone the repository to your local machine and cd into it.

```bash
git clone https://github.com/pablo-villarejo/ingweb-examen-backend.git
cd ingweb-examen-backend
```

2. cd into the `backend` directory.

```bash
cd backend
```

3. Copy the `.env.example` into a new file called `.env`. (Since we are not deploying to the cloud, you can leave the values as they are.)

```bash
cp .env.example .env
```

4. Deploy the project running the following command.

```bash
docker compose up -d
```

This will build and start the project and the database. The services will be available at port 3000. (You can change the port in the .env file if needed.)

5. Seed the database with some initial data, accessing the corresponding endpoint.
[http://localhost:3000/seeding](http://localhost:3000/seeding), OR

```bash
curl http://localhost:3000/seed
```

6. By default, the backend will be deployed at the following port:
- [http://localhost:3000/users](http://localhost:3000/users) - Users service
- [http://localhost:3000/wikis](http://localhost:3000/wikis) - Wiki service
- Adittionally, a mongo-express instance will be available at [http://localhost:8081](http://localhost:8081) to manage the database, with the credentials defined in the .env file, by default `admin:admin`.