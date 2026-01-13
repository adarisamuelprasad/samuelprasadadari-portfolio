import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard"; // Deprecated
import AdminProjects from "./pages/AdminProjects";
import AdminAchievements from "./pages/AdminAchievements";
import AdminExperience from "./pages/AdminExperience";
import AdminEducation from "./pages/AdminEducation";
import ContentManager from "./pages/ContentManager";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><Index /></MainLayout>} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/home" replace />} />

              <Route path="home" element={<ContentManager section="home" />} />
              <Route path="about" element={<ContentManager section="about" />} />
              <Route path="skills" element={<ContentManager section="skills" />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="achievements" element={<AdminAchievements />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="education" element={<AdminEducation />} />
              <Route path="contact" element={<ContentManager section="contact" />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);
var stdin_default = App;
export {
  stdin_default as default
};
