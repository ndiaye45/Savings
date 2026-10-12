Structure attendue :

mon-projet/
├── docker-compose.yml          <- ce fichier (à la racine)
├── demo/                       <- ton projet Spring (pom.xml, src/...)
│   ├── Dockerfile              <- ajouter ici
│   └── .dockerignore           <- ajouter ici
└── savings-frontend/           <- le front React (package.json, src/...)
    ├── Dockerfile              <- ajouter ici
    ├── nginx.conf              <- ajouter ici
    └── .dockerignore           <- ajouter ici

Lancer :   docker compose up --build
Ouvrir :   http://localhost:3000
Arrêter :  Ctrl+C puis docker compose down
