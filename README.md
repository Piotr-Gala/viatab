# VIATAB

VIATAB is a small VIA Tabloid application built for the DOC1 DevOps assignment.

The application contains:
- React + TypeScript frontend
- Spring Boot backend
- PostgreSQL database
- Docker setup
- Docker Compose setup
- Kubernetes manifests for Minikube
- GitHub Actions CI/CD workflows

## Features

- List stories
- Add stories
- Delete stories
- Three departments:
  - Software
  - Business
  - Design

## Project Structure

```text
viatab/
  backend/
  frontend/
  k8s/
  docker-compose.yml
  .github/workflows/
```

## Backend

The backend is a Spring Boot application using:
- Java 21
- Maven
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Validation

API endpoints:

```text
GET    /api/stories
POST   /api/stories
DELETE /api/stories/{id}
```

## Frontend

The frontend is a React + TypeScript application built with Vite.

In Docker and Kubernetes, Nginx serves the frontend and proxies API requests:

```text
/api -> backend:8080
```

## Run with Docker Compose

Start the full application:

```bash
docker compose up --build
```

Open the frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8080/api/stories
```

Stop the application:

```bash
docker compose down
```

Database data is stored in a Docker named volume:

```text
postgres-data
```

To remove containers and database data:

```bash
docker compose down -v
```

## Run with Kubernetes / Minikube

Start Minikube:

```bash
minikube start --driver=docker
```

Build images inside Minikube:

```bash
eval $(minikube docker-env)
docker build -t viatab-backend:latest ./backend
docker build -t viatab-frontend:latest ./frontend
```

Apply Kubernetes manifests:

```bash
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

Check resources:

```bash
kubectl get pods
kubectl get svc
kubectl get pvc
```

Open frontend:

```bash
minikube service frontend --url
```

Test backend:

```bash
minikube service backend --url
```

Then call:

```bash
curl <backend-url>/api/stories
```

Clean up Kubernetes resources:

```bash
kubectl delete -f k8s/frontend.yaml
kubectl delete -f k8s/backend.yaml
kubectl delete -f k8s/postgres.yaml
minikube stop
```

## CI/CD

GitHub Actions workflows are located in:

```text
.github/workflows/
```

### CI

`ci.yml` runs on pull requests and pushes to `main`.

It checks:
- backend Maven build
- frontend npm build
- backend Docker image build
- frontend Docker image build

### CD

`cd.yml` runs on pushes to `main`.

It builds and publishes Docker images to GitHub Container Registry:

```text
ghcr.io/piotr-gala/viatab-backend:latest
ghcr.io/piotr-gala/viatab-frontend:latest
```

## Notes

This project is intentionally simple because the main goal is learning DevOps tools, not building a production-grade application.

Some production topics are simplified:
- database credentials are stored directly in local config files
- Hibernate uses `ddl-auto=update`
- Kubernetes uses local Minikube images with `imagePullPolicy: Never`
