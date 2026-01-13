# Frontend Documentation - Adari Samuel Prasad Portfolio

This directory contains the React frontend application for Adari Samuel Prasad's Portfolio. It is built using **React**, **Vite**, and **Tailwind CSS**.

## 📂 Project Structure

### `src/`
The main source code directory.

#### `src/api/`
- **`api.js`**: Configures the Axios instance for making HTTP requests to the backend. It exports specific API objects (`projectsApi`, `contactApi`, `authApi`) to handle data fetching and submissions.

#### `src/components/`
Reusable UI components used throughout the application.
- **`Navbar.jsx`**: The top navigation bar, responsive for mobile and desktop.
- **`Footer.jsx`**: The site footer.
- **`ProjectCard.jsx`**: Displays individual project details in a card format.
- **`ProtectedRoute.jsx`**: A wrapper component that redirects unauthenticated users away from admin pages.
- **`ui/`**: Contains base UI components (buttons, inputs, cards, etc.) built with Radix UI and styled with Tailwind (shadcn/ui pattern).

#### `src/contexts/`
- **`AuthContext.jsx`**: Manages the global authentication state (login/logout) and provides the `useAuth` hook to access user status anywhere in the app.

#### `src/hooks/`
Custom React hooks.
- **`use-toast.js`**: Provides the `toast` function to display temporary notification messages (success/error alerts).

#### `src/layouts/`
- **`MainLayout.jsx`**: Defines the common page structure (e.g., ensuring the Navbar and Footer are present on standard pages).

#### `src/pages/`
The main views corresponding to different routes.
- **`Index.jsx`**: The landing/home page with the hero section and introduction.
- **`About.jsx`**: Detailed information about the developer.
- **`Projects.jsx`**: Lists all projects fetched from the backend.
- **`Achievements.jsx`**: Displays a timeline of career milestones.
- **`Contact.jsx`**: Contains the contact form for sending messages.
- **`AdminLogin.jsx`**: Login page for the admin dashboard.
- **`AdminDashboard.jsx`**: Protected area for managing projects and achievements (CRUD operations).

#### `src/App.jsx`
The root component that sets up the **Routing** (via `react-router-dom`), `QueryClient` (for data fetching), and global providers (Auth, Toast, Tooltip).

#### `src/main.jsx`
The entry point of the application. It mounts the `App` component into the DOM.

---

## ⚙️ Configuration Files

- **`vite.config.js`**: Configuration for the Vite build tool, including plugins and server settings (proxy, ports).
- **`tailwind.config.js`**: Configuration for Tailwind CSS, defining custom colors, fonts, and animations.
- **`jsconfig.json`**: Configures JavaScript path aliases (e.g., allowing `@/components` imports).
