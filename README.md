# ED Academy - Système de Gestion des Présences Scolaires

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-24.0.5-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Une application moderne de gestion des présences scolaires développée avec TypeScript**

[Fonctionnalités](#-fonctionnalités) • [Stack Technique](#-stack-technique) • [Démarrage Rapide (Docker)](#-démarrage-rapide-docker) • [Déploiement](#-déploiement)

</div>

---

## Déploiement

- **Frontend**: [https://ed-academy.onrender.com](https://ed-academy.onrender.com)
- **Backend API**: [https://ed-academy-api.onrender.com](https://ed-academy-api.onrender.com)

---

## Vue d'ensemble

ED Academy est un système complet de gestion des présences scolaires conçu pour simplifier le processus de suivi des présences des étudiants. L'application prend en charge trois rôles utilisateurs (**Administrateur**, **Enseignant**, **Étudiant**) avec un contrôle d'accès basé sur les rôles, offrant à chaque type d'utilisateur une expérience de tableau de bord personnalisée.

---

## Démarrage Rapide (Docker)

Le projet est entièrement professionnel avec Docker. Vous pouvez lancer l'ensemble de la pile (Frontend, Backend, Base de données) avec une seule commande.

### 1. Prérequis
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et en cours d'exécution.

### 2. Lancement du projet
Clonez le dépôt et exécutez :
```bash
docker-compose up -d --build
```

### 3. Seeding de la base de données et tests
Nous avons implémenté un seeder flexible pour vous aider à tester l'application immédiatement.

#### Seeding Admin
Assure que le compte administrateur existe sans ajouter de données factices.
```bash
docker exec -it -e SEED_MODE=admin edAcademy-backend npm run seed:prod
```

#### Seeding des données d'exemple
Remplit la base de données avec 3 enseignants, 4 classes, 20 étudiants et l'historique des présences.
```bash
docker exec -it -e SEED_MODE=full edAcademy-backend npm run seed:prod
```

**Identifiants Admin :**
- **Email**: `admin@edacademy.com`
- **Mot de passe**: `password123`

---

### Architecture
- **Backend**: Node.js (Express) dans un build Docker multi-étapes.
- **Frontend**: React (Vite) servi via **Nginx** pour une performance maximale.
- **Base de données**: PostgreSQL avec Prisma ORM.

### Migrations automatiques
Le conteneur Docker est configuré pour exécuter automatiquement `prisma migrate deploy` au démarrage, garantissant que votre base de données de production est toujours à jour.

---

## Fonctionnalités

### Fonctionnalités Administrateur
- **Tableau de bord** - Statistiques globales (étudiants, enseignants, classes, sessions)
- **Gestion des utilisateurs** - Créer, modifier et supprimer des enseignants et des étudiants
- **Gestion des classes** - Créer des classes, assigner des enseignants et gérer les étudiants
- **Gestion des matières** - Définir des matières et les assigner aux classes/enseignants
- **Vue globale des présences** - Surveiller les présences dans toutes les classes avec options de filtrage
- **Calendrier des présences** - Calendrier visuel montrant les absences avec statut de justification

### Fonctionnalités Enseignant

- **Tableau de bord personnel** - Statistiques pour les classes assignées et présences en attente
- **Mes classes** - Voir toutes les classes assignées avec le nombre d'étudiants
- **Gestion des sessions** - Créer et gérer des sessions d'enseignement avec détection de conflits
- **Prise de présence** - Marquer les étudiants comme Présent, Absent ou En retard
- **Gestion des justifications** - Mettre à jour le statut de justification pour les absences
- **Vue d'ensemble des étudiants** - Voir tous les étudiants dans les classes assignées

### Fonctionnalités Étudiant
- **Tableau de bord personnel** - Statistiques de présence avec diagramme circulaire visuel
- **Historique des présences** - Voir les enregistrements personnels de présence
- **Emploi du temps hebdomadaire** - Voir les sessions et classes à venir
- **Calendrier des absences** - Vue mensuelle des absences avec détails de justification

---

## Stack Technique

### Backend
| Technologie    | Description                                   |
| -------------- | -------------------------------------------- |
| **Node.js**    | Environnement d'exécution JavaScript          |
| **Express 5**  | Framework web pour Node.js                    |
| **TypeScript** | Développement typé                            |
| **Prisma ORM** | Gestion de base de données nouvelle génération|
| **PostgreSQL** | Base de données relationnelle                 |
| **JWT**        | JSON Web Tokens pour l'authentification       |
| **bcryptjs**   | Hachage de mots de passe                      |
| **Winston**    | Bibliothèque de journalisation                |
| **Helmet**     | Middleware de sécurité                        |
| **CORS**       | Partage de ressources entre origines          |

### Frontend
| Technologie        | Description                                  |
| ------------------ | -------------------------------------------- |
| **React 19**       | Bibliothèque UI                              |
| **TypeScript**     | JavaScript typé                              |
| **Vite**           | Outillage frontend nouvelle génération       |
| **Tailwind CSS 4** | Framework CSS utilitaire                     |
| **Lucide React**   | Bibliothèque d'icônes                        |
| **React Router 7** | Routage côté client                          |
| **Nginx**          | Serveur statique de production               |
| **Axios**          | Client HTTP                                  |


---

## Structure du Projet

```
EdTech/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Schéma de base de données
│   │   └── migrations/            # Migrations de base de données
│   └── src/
│       ├── config/                # Configuration (client Prisma)
│       ├── controllers/           # Contrôleurs de routes
│       ├── dtos/                  # Objets de Transfert de Données
│       ├── generated/             # Client Prisma généré
│       ├── middlewares/           # Middlewares Express
│       ├── routes/                # Routes API
│       ├── services/              # Logique métier
│       ├── types/                 # Types TypeScript
│       ├── utils/                 # Fonctions utilitaires
│       ├── app.ts                 # Configuration de l'application Express
│       └── server.ts              # Point d'entrée du serveur
│
├── frontend/
│   └── src/
│       ├── api/                   # Configuration Axios
│       ├── components/            # Composants UI réutilisables
│       ├── context/               # React Context (Auth, Toast)
│       ├── features/              # Modules basés sur les fonctionnalités
│       │   ├── admin/             # Tableau de bord Admin & services
│       │   ├── auth/              # Authentification
│       │   ├── student/           # Tableau de bord Étudiant
│       │   └── teacher/           # Tableau de bord Enseignant
│       ├── hooks/                 # Hooks React personnalisés
│       ├── layouts/               # Composants de mise en page
│       └── routes/                # Configuration du routage
│
└── README.md
```

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL (v14 ou supérieur)
- npm ou yarn

### 1. Cloner le dépôt

```bash
git clone https://github.com/Mo7amed-Boukab/ED-Academy.git
cd ED-Academy
```

### 2. Configuration du Backend

```bash
cd backend  # Naviguer vers le répertoire backend

# Installer les dépendances
npm install

# Créer le fichier d'environnement
cp .env.example .env
```

Configurez votre fichier `.env` :

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ed_academy_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

```bash
# Générer le client Prisma
npx prisma generate

# Exécuter les migrations de base de données
npx prisma migrate dev

# Démarrer le serveur de développement
npm run dev
```

### 3. Configuration du Frontend

```bash
cd frontend  # Naviguer vers le répertoire frontend

# Installer les dépendances
npm install

# Créer le fichier d'environnement (si nécessaire)
# L'URL de l'API par défaut est http://localhost:3000/api

# Démarrer le serveur de développement
npm run dev
```

### 4. Accéder à l'application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

---

## Authentification

L'application utilise **JWT (JSON Web Token)** pour l'authentification avec contrôle d'accès basé sur les rôles.

### Rôles et Permissions par défaut

| Rôle            | Permissions                                      |
| --------------- | ------------------------------------------------ |
| **ADMIN**       | Accès complet à toutes les ressources           |
| **TEACHER**     | Gérer ses propres classes, sessions, présences  |
| **STUDENT**     | Voir sa propre présence et emploi du temps       |

---


---

## Auteur

**Mohamed Boukab**
- GitHub: [@Mo7amed-Boukab](https://github.com/Mo7amed-Boukab)

---
