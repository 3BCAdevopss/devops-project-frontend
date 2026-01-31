#Frontend Application – DevOps Project

This repository contains the frontend application for a full-stack DevOps project.
The frontend is built with React, containerized using Docker, analyzed using SonarCloud, deployed via GitHub Actions, and hosted on Vercel.

##Project Overview

Frontend built using React

Dockerized using multi-stage Dockerfile

CI/CD enabled with GitHub Actions

Static code analysis using SonarCloud

Deployed on Vercel with a public domain

###Tech Stack

Frontend: React (JavaScript)
Package Manager: npm
Containerization: Docker, Docker Compose
CI/CD: GitHub Actions
Code Quality: SonarCloud
Deployment: Vercel
Environment Variables

The frontend communicates with the backend using an environment variable.

.env (local)
REACT_APP_API_URL=http://localhost:8080

Vercel Environment Variable
REACT_APP_API_URL=https://<BACKEND_PUBLIC_URL>





##Application will be available at:

http://localhost:3000

##Run Using Docker
Build Docker Image
docker build -t devops-frontend .

##Run Container
docker run -d -p 3000:80 devops-frontend


Open:
http://localhost:3000

When running frontend + backend together:

docker compose up --build


#Frontend:

http://localhost:3000


#Backend:

http://localhost:8080

CI/CD Pipeline
Triggered on every git push to main

Steps:

Checkout code
Build Docker image
Push image to Docker Hub
Run SonarCloud analysis
GitHub Actions handles the automation.
Code Quality – SonarCloud
Static analysis using SonarCloud
Quality Gate enforced
Security hotspots reviewed and resolved
Deployment on Vercel
Frontend deployed using Vercel
Connected directly to GitHub repository
Auto-deployment on every push

Live URL:https://devops-project-frontend.vercel.app/
