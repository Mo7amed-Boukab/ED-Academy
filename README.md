# ED Academy - School Attendance Management System

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A modern, full-stack school attendance management application built with TypeScript**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-endpoints) • [Screenshots](#-screenshots)

</div>

---

## Overview

ED Academy is a comprehensive school attendance management system designed to streamline the process of tracking student attendance. The application supports three user roles (**Admin**, **Teacher**, **Student**) with role-based access control, providing each user type with a tailored dashboard experience.

### Key Objectives

- Enable teachers to efficiently record student attendance for their sessions
- Provide administrators with global visibility into attendance data across all classes
- Allow students to view their personal attendance records and schedules
- Generate attendance statistics and analytics for informed decision-making

---

## Features

### Administrator Features

- **Dashboard Overview** - Global statistics (students, teachers, classes, sessions)
- **User Management** - Create, update, and delete teachers and students
- **Class Management** - Create classes, assign teachers, and manage students
- **Subject Management** - Define subjects and assign them to classes/teachers
- **Global Attendance View** - Monitor attendance across all classes with filtering options
- **Attendance Calendar** - Visual calendar showing absences with justification status

### Teacher Features

- **Personal Dashboard** - Statistics for assigned classes and pending attendance
- **My Classes** - View all assigned classes with student counts
- **Session Management** - Create and manage teaching sessions with conflict detection
- **Take Attendance** - Mark students as Present, Absent, or Late
- **Justification Management** - Update justification status for absences
- **Student Overview** - View all students in assigned classes

### Student Features

- **Personal Dashboard** - Attendance statistics with visual pie chart
- **Attendance History** - View personal attendance records
- **Weekly Schedule** - See upcoming sessions and classes
- **Absence Calendar** - Monthly view of absences with justification details

---

## Tech Stack

### Backend

| Technology     | Description                                  |
| -------------- | -------------------------------------------- |
| **Node.js**    | JavaScript runtime environment               |
| **Express 5**  | Web framework for Node.js                    |
| **TypeScript** | Typed superset of JavaScript                 |
| **Prisma ORM** | Next-generation ORM for Node.js & TypeScript |
| **PostgreSQL** | Relational database                          |
| **JWT**        | JSON Web Tokens for authentication           |
| **bcryptjs**   | Password hashing                             |
| **Winston**    | Logging library                              |
| **Helmet**     | Security middleware                          |
| **CORS**       | Cross-Origin Resource Sharing                |

### Frontend

| Technology         | Description                      |
| ------------------ | -------------------------------- |
| **React 19**       | UI library                       |
| **TypeScript**     | Type-safe JavaScript             |
| **Vite**           | Next-generation frontend tooling |
| **React Router 7** | Client-side routing              |
| **Tailwind CSS 4** | Utility-first CSS framework      |
| **Axios**          | HTTP client                      |
| **Lucide React**   | Icon library                     |

---

## Project Structure

```
EdTech/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # Database migrations
│   └── src/
│       ├── config/                # Configuration (Prisma client)
│       ├── controllers/           # Route controllers
│       ├── dtos/                  # Data Transfer Objects
│       ├── generated/             # Generated Prisma client
│       ├── middlewares/           # Express middlewares
│       ├── routes/                # API routes
│       ├── services/              # Business logic
│       ├── types/                 # TypeScript types
│       ├── utils/                 # Utility functions
│       ├── app.ts                 # Express app configuration
│       └── server.ts              # Server entry point
│
├── frontend/
│   └── src/
│       ├── api/                   # Axios configuration
│       ├── components/            # Reusable UI components
│       ├── context/               # React Context (Auth, Toast)
│       ├── features/              # Feature-based modules
│       │   ├── admin/             # Admin dashboard & services
│       │   ├── auth/              # Authentication
│       │   ├── student/           # Student dashboard
│       │   └── teacher/           # Teacher dashboard
│       ├── hooks/                 # Custom React hooks
│       ├── layouts/               # Layout components
│       └── routes/                # Routing configuration
│
└── README.md
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Mo7amed-Boukab/EdTech.git
cd EdTech
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/edtech_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (if needed)
# The API URL defaults to http://localhost:3000/api

# Start the development server
npm run dev
```

### 4. Access the application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

---

## Authentication

The application uses **JWT (JSON Web Token)** for authentication with role-based access control.

### Default Roles & Permissions

| Role        | Permissions                              |
| ----------- | ---------------------------------------- |
| **ADMIN**   | Full access to all resources             |
| **TEACHER** | Manage own classes, sessions, attendance |
| **STUDENT** | View own attendance and schedule         |

---

## API Endpoints

### Authentication

| Method | Endpoint          | Description |
| ------ | ----------------- | ----------- |
| `POST` | `/api/auth/login` | User login  |

### Users

| Method   | Endpoint         | Description                  |
| -------- | ---------------- | ---------------------------- |
| `GET`    | `/api/users`     | Get all users (with filters) |
| `GET`    | `/api/users/:id` | Get user by ID               |
| `POST`   | `/api/users`     | Create new user              |
| `PUT`    | `/api/users/:id` | Update user                  |
| `DELETE` | `/api/users/:id` | Delete user                  |

### Classes

| Method   | Endpoint                          | Description           |
| -------- | --------------------------------- | --------------------- |
| `GET`    | `/api/classes`                    | Get all classes       |
| `GET`    | `/api/classes/:id`                | Get class by ID       |
| `GET`    | `/api/classes/my-classes`         | Get teacher's classes |
| `POST`   | `/api/classes`                    | Create new class      |
| `PUT`    | `/api/classes/:id`                | Update class          |
| `PUT`    | `/api/classes/:id/assign-teacher` | Assign teacher        |
| `DELETE` | `/api/classes/:id`                | Delete class          |

### Sessions

| Method   | Endpoint            | Description        |
| -------- | ------------------- | ------------------ |
| `GET`    | `/api/sessions`     | Get all sessions   |
| `GET`    | `/api/sessions/:id` | Get session by ID  |
| `POST`   | `/api/sessions`     | Create new session |
| `PUT`    | `/api/sessions/:id` | Update session     |
| `DELETE` | `/api/sessions/:id` | Delete session     |

### Attendance

| Method | Endpoint                            | Description            |
| ------ | ----------------------------------- | ---------------------- |
| `GET`  | `/api/attendance/session/:id`       | Get session attendance |
| `POST` | `/api/attendance/session/:id`       | Mark attendance        |
| `PUT`  | `/api/attendance/:id/justification` | Update justification   |

### Statistics

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| `GET`  | `/api/stats/global`  | Get global statistics  |
| `GET`  | `/api/stats/teacher` | Get teacher statistics |
| `GET`  | `/api/stats/student` | Get student statistics |

---

## Scripts

### Backend

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm run start    # Start production server
```

### Frontend

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Configuration

### Backend Environment Variables

| Variable       | Description                  | Default |
| -------------- | ---------------------------- | ------- |
| `DATABASE_URL` | PostgreSQL connection string | -       |
| `JWT_SECRET`   | Secret key for JWT signing   | -       |
| `PORT`         | Server port                  | `3000`  |

### Frontend Environment Variables

| Variable       | Description     | Default                     |
| -------------- | --------------- | --------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Mohamed Boukab**

- GitHub: [@Mo7amed-Boukab](https://github.com/Mo7amed-Boukab)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

</div>
