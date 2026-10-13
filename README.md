<div align="center">

# 💰 Savings

Application de gestion financière personnelle permettant aux utilisateurs de suivre leurs dépenses et leurs objectifs d'épargne.

API REST sécurisée développée avec Spring Boot, authentification JWT, persistance PostgreSQL et déploiement via Docker.

</div>

---

## ✨ Fonctionnalités

### Authentification et sécurité

- Inscription utilisateur
- Authentification via JWT
- Hachage des mots de passe avec BCrypt
- Gestion des rôles USER et ADMIN
- Protection des endpoints avec Spring Security

### Gestion des dépenses

- Création de dépenses
- Modification de dépenses
- Suppression de dépenses
- Consultation de l'historique des dépenses

### Objectifs d'épargne

- Création d'objectifs financiers
- Suivi de la progression
- Dépôts sur un objectif
- Gestion des échéances

### API REST

- Documentation interactive avec Swagger/OpenAPI
- Validation des données entrantes
- Gestion centralisée des erreurs

---

## 🚀 Démarrage rapide

### Prérequis

- Docker
- Docker Compose

### Cloner le projet

```bash
git clone https://github.com/ndiaye45/Savings.git
cd Savings
```

### Lancer l'application

```bash
docker compose up --build
```

### Accès aux services

| Service | URL |
|----------|----------|
| API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| Frontend | http://localhost:3000 |

---

## 🏗️ Architecture

```text
Client
   │
   ▼
React Frontend
   │
   ▼
Spring Boot REST API
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
PostgreSQL
```

Le backend suit une architecture en couches favorisant la séparation des responsabilités :

- Controllers : exposition des endpoints REST
- Services : logique métier
- Repositories : accès aux données
- Security : authentification et autorisation
- Entities : modèle de données

---

## 📡 Principaux Endpoints

### Authentification

```http
POST /auth/login
POST /users
```

### Utilisateurs

```http
GET    /users
GET    /users/{id}
PUT    /users/{id}
```

### Dépenses

```http
GET    /expenses
POST   /expenses
PUT    /expenses/{id}
DELETE /expenses/{id}
```

### Objectifs d'épargne

```http
GET    /savings-goals
POST   /savings-goals
PUT    /savings-goals/{id}
DELETE /savings-goals/{id}

POST   /savings-goals/{id}/deposit
GET    /savings-goals/{id}/progress
```

---

## 🔐 Sécurité

Le projet implémente plusieurs mécanismes de sécurité :

- Authentification JWT
- Spring Security
- BCrypt pour le hachage des mots de passe
- Contrôle d'accès basé sur les rôles
- Validation des données avec Bean Validation
- Gestion centralisée des exceptions
- Configuration sécurisée via variables d'environnement

---

## 🧰 Stack Technique

### Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT (JJWT)
- Maven

### Base de données

- PostgreSQL 16

### Outils

- Docker
- Docker Compose
- Swagger / OpenAPI

---

## 📁 Structure du projet

```text
Savings
├── docker-compose.yml
├── savings-backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── security
│   ├── exception
│   └── config
└── savings-frontend
```

---

## 🧠 Compétences mises en œuvre

Ce projet m'a permis de développer mes compétences en :

- Développement backend avec Spring Boot
- Conception d'API REST sécurisées
- Authentification et autorisation avec JWT
- Modélisation de données relationnelles avec JPA/Hibernate
- Conteneurisation d'applications avec Docker
- Gestion des erreurs et validation des données
- Architecture logicielle en couches

---

## 🗺️ Améliorations futures

- Tests unitaires et d'intégration
- CI/CD avec GitHub Actions
- Pagination et filtrage des dépenses
- Export CSV des transactions
- Déploiement cloud avec HTTPS
- Notifications et alertes financières

---

## 👤 Auteur

**Youssou Ndiaye**

Étudiant en Master Informatique, spécialisé dans le développement backend Java et Spring Boot.

- GitHub : https://github.com/ndiaye45
`
