# Spring Boot Backend API Specification

## Tech Stack
- Java 21, Spring Boot 3.x, PostgreSQL, Spring Security + JWT

## Database Schema

```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL -- BCrypt hashed
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  technologies VARCHAR(500),
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(10),
  description TEXT
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Auth
- `POST /api/auth/login` → `{ email, password }` → Returns `{ token: "JWT..." }`

### Projects (Public)
- `GET /api/projects` → Returns all projects

### Projects (Admin - JWT Required)
- `POST /api/admin/projects` → Create project
- `PUT /api/admin/projects/{id}` → Update project
- `DELETE /api/admin/projects/{id}` → Delete project

### Achievements (Public)
- `GET /api/achievements` → Returns all achievements

### Achievements (Admin - JWT Required)
- `POST /api/admin/achievements` → Create
- `PUT /api/admin/achievements/{id}` → Update
- `DELETE /api/admin/achievements/{id}` → Delete

### Contact (Public)
- `POST /api/contact` → `{ name, email, message }`
- Rate limit: 1 message per 20 seconds per IP

## Environment Variables
```
SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/portfolio
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-256-bit-secret
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your-email
MAIL_PASSWORD=app-password
FRONTEND_URL=https://your-frontend.vercel.app
```

## CORS Config
Allow origin: `${FRONTEND_URL}`
