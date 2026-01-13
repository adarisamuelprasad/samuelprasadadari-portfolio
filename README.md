# Adari Samuel Prasad - Personal Portfolio

A full-stack personal portfolio application built with **React (Vite)** for the frontend and **Spring Boot** for the backend.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Vite
- **Backend**: Java, Spring Boot, Spring Data JPA, H2 Database (In-Memory)
- **Tools**: Maven, npm

---

## 🛠️ Prerequisites

Ensure you have the following installed on your machine:

- **Java JDK 17** or higher (Java 24 is compatible)
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

---

## 🏁 Getting Started

### 1. Backend Setup (Spring Boot)

The backend runs on port `9090` and uses an H2 in-memory database, so no external database setup is required.

1.  Open a terminal and navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Run the application using the Maven Wrapper:
    -   **Windows (Command Prompt/PowerShell)**:
        ```powershell
        ./mvnw spring-boot:run
        ```
        *Note: If you encounter syntax errors in PowerShell, try using `cmd /c "mvnw.cmd spring-boot:run"` or run it via a Git Bash terminal as `./mvnw spring-boot:run`.*

    -   **Mac/Linux**:
        ```bash
        ./mvnw spring-boot:run
        ```

3.  The backend should start successfully on `http://localhost:9090`.

### 2. Frontend Setup (React + Vite)

The frontend runs on port `8081` (or `5173` by default, depending on availability).

1.  Open a **new** terminal window and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and visit the URL shown in the terminal (usually `http://localhost:8081`).

---

## ⚙️ Configuration

### Backend Configuration
The backend configuration is located in `backend/src/main/resources/application.properties`.

-   **Port**: `9090`
-   **Database**: H2 In-Memory (`jdbc:h2:mem:portfolio`)
-   **Email**: Configured to use Gmail SMTP.

### Frontend Configuration
The frontend API URL is configured in `frontend/src/api/api.ts`.
It defaults to `http://localhost:9090/api`.

---

## 🐛 Troubleshooting

### Port 9090 Already in Use
If the backend fails to start because port `9090` is in use:
1.  Find the process ID (PID):
    ```powershell
    netstat -ano | findstr :9090
    ```
2.  Kill the process:
    ```powershell
    taskkill /F /PID <PID>
    ```

### CORS Errors
If you see CORS errors in the browser console (e.g., "Access-Control-Allow-Origin"), ensure the backend is running and has the correct CORS configuration in the Controllers.
Currently, it accepts requests from:
-   `http://localhost:5173`
-   `http://localhost:8081`

### "Module not found" in Frontend
If you see import errors, try deleting `node_modules` and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```
