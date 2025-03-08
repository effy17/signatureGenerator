# Email Signature Engine

An application for generating email signatures using a Node.js backend (with TypeScript, Express, Bull/Redis for bulk processing, and Nunjucks templates) and a Vue/React frontend. This project also demonstrates a bulk upload feature and a webhook server for asynchronous processing.

---

## Table of Contents

1. [Requirements & Versions](#requirements--versions)
2. [Project Structure](#project-structure)
3. [Local Development Setup](#local-development-setup)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Webhook Test Server](#webhook-test-server)
4. [Dockerized Deployment](#dockerized-deployment)

   - [docker-compose Configuration](#docker-compose-configuration)
5. [Bulk Upload Feature](#bulk-upload-feature)

---

## 1. Requirements & Versions

- **Node.js**: v18 or higher is recommended (latest pnpm requires Node v18+).
- **pnpm**: v7 or higher (if using pnpm as the package manager).
- **Docker**: 20.10+ (or a recent version that supports BuildKit).
- **Docker Compose**: v1.29+ or Docker Compose Plugin 2.0+ (supports `version: "3.8"`).

> **Note:** If you need to use Node 16 for compatibility, install an older version of pnpm (e.g., `pnpm@7`).

---

## 2. Project Structure

A typical layout for the project might be:

. ├── backend/ │ ├── src/ │ │ ├── templates/ # Nunjucks templates (e.g., template1.html, template2.html) │ │ ├── jobQueue.ts # Bull queue logic and worker processing │ │ ├── signatureService.ts # Signature rendering function (Nunjucks) │ │ ├── server.ts # Main Express server │ │ └── webhook/ # (Optional) Webhook server source files │ │ └── simpleWebhookServer.ts # Webhook server (TypeScript) │ ├── Dockerfile # Backend Dockerfile │ ├── package.json │ ├── pnpm-lock.yaml │ └── tsconfig.json ├── frontend/ │ ├── src/ # Vue/React source code │ ├── Dockerfile # Frontend Dockerfile │ ├── package.json │ └── pnpm-lock.yaml ├── docker-compose.yml # Docker Compose configuration └── README.md


---

## 3. Local Development Setup

### Backend Setup

1. **Install Dependencies:**
   ```bash
   cd backend
   pnpm install

2. **Build & Start the Server:**
   ```bash
   pnpm run build
   pnpm run start

The backend server will be available at http://localhost:3000.


### Frontend Setup
1. **Install Dependencies:**
   ```bash
   cd ../frontend
   pnpm install

2. **Run the Development Server:**
   ```bash
   pnpm run serve
   pnpm run start

The frontend dev server runs at http://localhost:8080.

### Webhook Test Server Setup
1. **Run the Webhook Server:**
   ```bash
   npx ts-node backend/src/webhook/bulkUploadServer/simpleWebhookServer.ts

The test server runs at http://localhost:4000/webhook if enabled.

### Run Dockerized
1. **To build and run all containers, run in your project root:**
   ```bash
   docker-compose up --build


### Webhook Test Server Setup
1. **Run the Webhook Server:**
   ```bash
   npx ts-node backend/src/webhook/simpleWebhookServer.ts

The test server runs at http://localhost:4000/webhook if enabled.







