# ⚡ Distributed Provisioning Engine

> A full-stack distributed cloud infrastructure provisioning platform with asynchronous event-driven architecture.

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-green?style=flat-square&logo=springboot)
![Kafka](https://img.shields.io/badge/Apache_Kafka-black?style=flat-square&logo=apachekafka)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=flat-square&logo=postgresql)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)

---

## 📌 Overview

**Distributed Provisioning Engine** simulates a real-world cloud infrastructure provisioning platform where users can provision PostgreSQL database servers **asynchronously** through a modern dashboard UI.

The system demonstrates enterprise-grade backend architecture concepts including:

- Distributed asynchronous processing
- Event-driven architecture using Apache Kafka
- API Gateway routing
- JWT-based authentication & authorization
- Docker orchestration
- Retry handling
- Secure REST APIs
- Modern React frontend
- Monorepo architecture

---

## 🏗️ Architecture

```
React UI (Vite)
      ↓
  API Gateway  (:8081)
      ↓
Provisioning Service  (:8080)
      ↓
  Kafka Producer
      ↓
  Kafka Consumer
      ↓
 Provision Worker
      ↓
Docker / PostgreSQL Provisioning
```

---

## 🗂️ Monorepo Structure

```
distributedProvisioningEngine/
│
├── api-gateway/              # Spring Cloud API Gateway
│
├── provisioning-ui/          # React + Vite frontend
│
├── src/
│   ├── controller/           # REST controllers
│   ├── service/              # Business logic
│   ├── repository/           # JPA repositories
│   ├── entity/               # JPA entities
│   ├── dto/                  # Data transfer objects
│   ├── security/             # JWT security config
│   ├── config/               # App & Kafka config
│   └── exception/            # Global exception handling
│
├── docker-compose.yml        # Infrastructure orchestration
└── pom.xml                   # Maven root config
```

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| **Language**   | Java 21                              |
| **Backend**    | Spring Boot 3, Spring Security, JPA  |
| **Messaging**  | Apache Kafka                         |
| **Database**   | PostgreSQL                           |
| **Auth**       | JWT (JSON Web Tokens)                |
| **Frontend**   | React, Vite, Axios, React Router     |
| **Infra**      | Docker, Docker Compose               |
| **Build**      | Maven                                |

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based login and token validation
- Protected API routes with `Authorization: Bearer <token>`
- Frontend protected routes with login redirect
- Password visibility toggle on login UI
- Secure logout flow

### ⚙️ Provisioning Engine
- Asynchronous PostgreSQL server provisioning workflow
- Kafka-based event publishing and consumption
- Provision request tracking with status updates
- Retry handling for failed provisioning attempts

### 🖥️ Dashboard UI
- Modern responsive admin dashboard
- PostgreSQL server management panel
- Real-time provisioning status tracking
- Retry count display per server

### 🐳 Infrastructure
- Fully Dockerized PostgreSQL, Kafka, and Zookeeper
- API Gateway routing layer
- Monorepo project structure

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Maven 3.8+
- Node.js 18+
- Docker & Docker Compose

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd distributedProvisioningEngine
```

---

### 2. Start Docker Infrastructure

```bash
docker-compose up -d
```

Starts the following services:

| Service      | Port   |
|--------------|--------|
| PostgreSQL   | 5432   |
| Kafka        | 9092   |
| Zookeeper    | 2181   |

---

### 3. Run the Backend (Provisioning Service)

```bash
mvn spring-boot:run
```

> Runs on: `http://localhost:8080`

---

### 4. Run the API Gateway

```bash
cd api-gateway
mvn spring-boot:run
```

> Runs on: `http://localhost:8081`

---

### 5. Run the React Frontend

```bash
cd provisioning-ui
npm install
npm run dev
```

> Runs on: `http://localhost:5173`

---

## 🔑 Default Credentials

```
Username: admin
Password: admin123
```

---

## 📡 API Reference

### Auth

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| POST   | `/auth/login` | Authenticate user |

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

### Provisioning

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | `/provision`       | Create a new PostgreSQL server |
| GET    | `/provision`       | List all provision requests    |
| DELETE | `/provision/{id}`  | Delete a provision request     |

**All provisioning endpoints require:**
```http
Authorization: Bearer <your-jwt-token>
```

---

## 🐳 Docker Services

```yaml
# PostgreSQL
Host: localhost
Port: 5432
Database: cloud_db

# Kafka
Host: localhost
Port: 9092

# Zookeeper
Host: localhost
Port: 2181
```

---

## 🔭 Future Improvements

- [ ] Multi-user registration & onboarding
- [ ] Role-based access control (RBAC)
- [ ] Kubernetes deployment manifests
- [ ] Prometheus + Grafana metrics & monitoring
- [ ] Redis caching layer
- [ ] CI/CD pipelines (GitHub Actions)
- [ ] Swagger / OpenAPI documentation
- [ ] Email notifications on provisioning events

---

## 💡 Key Concepts Demonstrated

| Concept                     | Implementation                        |
|-----------------------------|---------------------------------------|
| Distributed Systems         | Multi-service architecture            |
| Event-Driven Architecture   | Apache Kafka producer/consumer        |
| Asynchronous Processing     | Kafka-based async provisioning flow   |
| Secure API Development      | JWT authentication & Spring Security  |
| Docker Orchestration        | Docker Compose multi-service setup    |
| Microservice Gateway        | Spring Cloud API Gateway routing      |
| Full-Stack Development      | Spring Boot backend + React frontend  |

---

## 👤 Author

**Pranay Pulipaka**

---

> Built to demonstrate real-world distributed systems, event-driven architecture, and full-stack engineering practices.