# 💰 Savings API

API REST de gestion financière personnelle développée avec Java et Spring Boot.

Ce projet permet aux utilisateurs de gérer leurs dépenses, suivre leurs objectifs d'épargne et consulter des statistiques financières à travers une API sécurisée utilisant JWT et Spring Security.

---

## ✨ Fonctionnalités

### 🔐 Authentification et sécurité

- Inscription utilisateur
- Authentification JWT
- Hachage des mots de passe avec BCrypt
- Gestion des rôles USER et ADMIN
- Protection des routes avec Spring Security
- Contrôle d'accès basé sur l'utilisateur connecté

### 💸 Gestion des dépenses

- Création de dépenses
- Modification de dépenses
- Suppression de dépenses
- Consultation de l'historique des dépenses

### 🎯 Objectifs d'épargne

- Création d'objectifs financiers
- Gestion des échéances
- Dépôt d'argent sur un objectif
- Suivi en temps réel de la progression

### 📊 Statistiques financières

- Total des dépenses enregistrées
- Montant total épargné
- Nombre de dépenses
- Nombre d'objectifs d'épargne

### 📚 Documentation API

- Documentation interactive avec Swagger / OpenAPI

---

## 🚀 Démarrage rapide

### Prérequis

- Java 17+
- Maven
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

### Services disponibles

| Service | URL |
|----------|----------|
| API | http://localhost:8080 |
| Swagger | http://localhost:8080/swagger-ui.html |
| Frontend | http://localhost:3000 |

---

## 🏗️ Architecture

L'application suit une architecture en couches afin de garantir la séparation des responsabilités.

```text
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
PostgreSQL
```

### Structure backend

```text
savings-backend
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── config
└── exception
```

---

## 📡 Principaux Endpoints

### Authentification

```http
POST /users
POST /auth/login
```

### Utilisateurs

```http
GET    /users
GET    /users/{id}
PUT    /users/{id}
DELETE /users/{id}
```

### Dépenses

```http
GET    /expenses
POST   /expenses
GET    /expenses/{id}
PUT    /expenses/{id}
DELETE /expenses/{id}
```

### Objectifs d'épargne

```http
GET    /savings-goals
POST   /savings-goals
GET    /savings-goals/{id}
PUT    /savings-goals/{id}
DELETE /savings-goals/{id}
POST   /savings-goals/{id}/deposit
GET    /savings-goals/{id}/progress
```

### Statistiques

```http
GET /statistics
```

---

## 🔐 Sécurité

Le projet implémente plusieurs mécanismes de sécurité :

- Authentification basée sur JWT
- Spring Security
- Hachage des mots de passe avec BCrypt
- Contrôle d'accès par rôle
- Validation des données entrantes
- Gestion centralisée des exceptions
- Protection des ressources utilisateur

---

## ✅ Tests

Le projet comprend des tests unitaires réalisés avec :

- JUnit 5
- Mockito

Services testés :

- UserService
- ExpenseService
- SavingsGoalService
- StatisticsService

Exécution des tests :

```bash
mvn test
```

---

## 🧰 Technologies utilisées

### Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT (JJWT)
- Maven

### Base de données

- PostgreSQL

### Documentation

- Swagger / OpenAPI

### Tests

- JUnit 5
- Mockito

### Outils

- Git
- GitHub
- Docker
- Docker Compose

---

## 🧠 Compétences développées

Ce projet m'a permis de travailler sur :

- La conception d'API REST sécurisées
- L'authentification et l'autorisation avec JWT
- La gestion des rôles et des permissions
- La persistance de données avec JPA/Hibernate
- La modélisation de bases de données relationnelles
- Les tests unitaires avec JUnit et Mockito
- La conteneurisation avec Docker
- La documentation d'API avec Swagger

---

## 📁 Structure du projet

```text
Savings
├── docker-compose.yml
├── savings-backend
└── savings-frontend
```

---

## 🗺️ Évolutions possibles

- Pipeline CI/CD avec GitHub Actions
- Pagination et filtrage des dépenses
- Export CSV des transactions
- Notifications financières
- Déploiement cloud (AWS, Azure, Render)

---

## 👤 Auteur

**Youssou Ndiaye**

Étudiant en Master 1 Informatique  
Parcours Applications Réparties, Intelligence Artificielle et Sécurité  
Université d'Orléans

GitHub : https://github.com/ndiaye45
