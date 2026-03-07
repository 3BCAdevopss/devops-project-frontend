DevOps Project – Frontend

This repository contains the frontend application for my DevOps project.
The application is built using React, follows DevOps best practices, and is integrated with CI/CD, SonarCloud analysis, GitHub workflows, and cloud deployment.

🌐 Live Application (Frontend + Backend Integrated)
👉 https://devops-project-frontend.vercel.app

Domain:([raviportfolio.me](https://raviportfolio.me/))

Tried buying domain name from namecheap.com and try to use my domain name to deploy my project but i got 404 error on browser 

Steps:

Buy domain from namecheap using git student developer pack

Use my domain name on git=>frontrepo=>setting=>pages=>domain name:raviportfolio.me(DNS verified)

On namecheap changed some advanced domain name settings with ip addresses and organisation name 

But failed integrating...

📌 Project Overview

!)Frontend developed using React (Create React App)

2)Code quality analyzed using SonarCloud

3)CI/CD implemented with GitHub Actions

4)Deployed using Vercel

5)Backend integrated via API endpoints

6)Version control and collaboration handled through GitHub

🛠️ Tools & Technologies Used

Frontend Framework: React (CRA)

Programming Language: JavaScript

Package Manager: npm

Code Quality: SonarCloud

CI/CD: GitHub Actions

Hosting / Deployment: Vercel

Version Control: Git & GitHub

Testing: Jest (default CRA setup)

⚙️ Project Build & Setup Steps
1️⃣ Clone the Repository
git clone https://github.com/3BCAdevopss/devops-project-frontend.git
cd devops-project-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Run Application Locally
npm start


Application runs at:

http://localhost:3000

4️⃣ Build the Project
npm run build


This generates the optimized production build in the build/ folder.

🔄 Git Workflow & Pull Request Process

Created a feature branch from main

Implemented frontend features / fixes

Committed changes with meaningful messages

Raised a Pull Request (PR) to main

GitHub Actions triggered automatically

SonarCloud analysis executed

After checks passed, PR was merged into main

🔍 SonarCloud Code Analysis

Integrated SonarCloud with GitHub Actions

Analyzed:

Code quality

Maintainability

Reliability

Security hotspots

Issues identified were fixed before merging

Quality Gate status validated during PR checks

✅ SonarCloud Analysis Status: Passed after resolving issues

sonar passed image:
<img width="1920" height="1080" alt="Screenshot (295)" src="https://github.com/user-attachments/assets/0e4cff05-9285-4e2a-b1c0-769889efd53b" />


🚀 Deployment (Vercel)
Deployment Steps:

Connected GitHub repository to Vercel

Selected frontend repository

Configured build settings:

Build Command: npm run build

Output Directory: build

Automatic deployment triggered on every push to main

Environment variables configured for backend API integration

🌐 Live URL:
👉 https://devops-project-frontend.vercel.app

🔗 Backend Integration

Frontend communicates with backend APIs

API base URL configured in frontend services

Backend deployed separately and consumed via REST APIs

End-to-end integration tested on Vercel deployment

⚠️ Challenges Faced & Solutions
🔴 SonarCloud Issues

Initial analysis failed due to:

Missing coverage

ESLint warnings

Solution:

Fixed lint issues

Adjusted SonarCloud configuration

Re-ran analysis until Quality Gate passed

🔴 GitHub Pages & Deployment Confusion

Faced 404 errors during initial GitHub Pages setup

Issues with homepage configuration and gh-pages

Solution:

Corrected homepage in package.json

Ensured proper branch and folder selection

Understood custom domain vs GitHub Pages behavior

🔴 Vercel Deployment Issues

Build failures due to environment variable mismatch

Backend API not reachable initially

Solution:

Added correct environment variables in Vercel

Verified API endpoints

Rebuilt and redeployed successfully

📈 Key Learnings

Practical understanding of CI/CD pipelines

Real-world experience with SonarCloud quality gates

Handling frontend deployment in production

Debugging build, deployment, and DNS issues

End-to-end DevOps workflow for frontend applications

