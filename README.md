# Savings API

API REST de gestion financière personnelle développée avec Spring Boot.

L'objectif de ce projet est de fournir une plateforme sécurisée permettant aux utilisateurs de gérer leurs dépenses, suivre leurs objectifs d'épargne et visualiser leur situation financière à travers une architecture backend moderne basée sur Java et Spring.

## Fonctionnalités

### Authentification et sécurité

- Inscription utilisateur
- Connexion sécurisée
- Authentification JWT
- Protection des routes avec Spring Security

### Gestion des dépenses

- Création, modification et suppression des dépenses
- Consultation de l'historique des dépenses

### Gestion des objectifs d'épargne

- Création et suivi d'objectifs d'épargne
- Consultation de la progression des objectifs

### Tableau de bord financier

- Visualisation des données financières
- Calcul du montant épargné
- Suivi des dépenses

## Stack Technique

### Backend

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Maven

### Base de données

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose

## Architecture

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

### Controllers

Gestion des requêtes HTTP et exposition des endpoints REST.

### Services

Implémentation de la logique métier.

### Repositories

Accès aux données via Spring Data JPA.

### Entities

Modélisation du domaine métier.

## Structure du projet

```text
src/main/java
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── exception
└── config
```

## API REST

### Authentification

```http
POST /api/auth/register
POST /api/auth/login
```

### Dépenses

```http
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/{id}
DELETE /api/expenses/{id}
```

### Objectifs d'épargne

```http
GET    /api/saving-goals
POST   /api/saving-goals
PUT    /api/saving-goals/{id}
DELETE /api/saving-goals/{id}
```

## Installation

### Cloner le projet

```bash
git clone https://github.com/ndiaye45/Savings.git
cd Savings
```

### Lancer l'environnement

```bash
docker-compose up --build
```

## Concepts techniques mis en œuvre

- Architecture REST
- Authentification JWT
- Spring Security
- Validation des données
- Gestion des exceptions
- Persistance avec JPA/Hibernate
- PostgreSQL
- Docker

## Objectifs d'apprentissage

Ce projet m'a permis de renforcer mes compétences en :

- Développement backend avec Spring Boot
- Sécurisation d'API REST
- Modélisation de bases de données relationnelles
- Utilisation de JPA/Hibernate
- Conteneurisation avec Docker

## Évolutions futures

- Documentation Swagger/OpenAPI
- Tests d'intégration
- Pipeline CI/CD
- Statistiques financières avancées
- Support multi-devises

## Auteur

**Youssou Ndiaye**

GitHub : https://github.com/ndiaye45
