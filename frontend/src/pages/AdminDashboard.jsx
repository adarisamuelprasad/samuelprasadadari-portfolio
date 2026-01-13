import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  FolderKanban,
  Award,
  Terminal,
  Save,
  X,
  Settings
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { projectsApi, achievementsApi, uploadApi } from "@/api/api";
const initialProjects = [
  {
    id: 1,
    title: "E-Commerce Microservices",
    description: "Scalable e-commerce platform built with Spring Boot microservices.",
    technologies: "Java, Spring Boot, PostgreSQL",
    githubUrl: "https://github.com",
    liveUrl: "https://demo.com",
    imageUrl: ""
  }
];
const initialAchievements = [
  {
    id: 1,
    title: "AWS Solutions Architect",
    year: "2024",
    description: "Professional-level AWS certification."
  }
];
const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: ""
  });
  const [achievementForm, setAchievementForm] = useState({
    title: "",
    year: "",
    description: "",
    imageUrl: ""
  });

  // Fetch projects and achievements on mount
  useEffect(() => {
    loadProjects();
    loadAchievements();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectsApi.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  const loadAchievements = async () => {
    try {
      const response = await achievementsApi.getAll();
      setAchievements(response.data);
    } catch (error) {
      console.error("Failed to load achievements:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleSaveProject = async () => {
    try {
      if (editingProject) {
        await projectsApi.update(editingProject.id, projectForm);
      } else {
        await projectsApi.create(projectForm);
      }
      loadProjects(); // Reload list
      resetProjectForm();
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Failed to save project");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectsApi.delete(id);
      loadProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project");
    }
  };
  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm(project);
    setShowProjectForm(true);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await uploadApi.uploadImage(file);
        setProjectForm({ ...projectForm, imageUrl: response.data.url });
      } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Failed to upload image");
      }
    }
  };
  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
      imageUrl: ""
    });
    setEditingProject(null);
    setShowProjectForm(false);
  };
  const handleSaveAchievement = async () => {
    try {
      if (editingAchievement) {
        await achievementsApi.update(editingAchievement.id, achievementForm);
      } else {
        await achievementsApi.create(achievementForm);
      }
      loadAchievements(); // Reload list
      resetAchievementForm();
    } catch (error) {
      console.error("Failed to save achievement:", error);
      alert("Failed to save achievement");
    }
  };
  const handleDeleteAchievement = async (id) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      await achievementsApi.delete(id);
      loadAchievements();
    } catch (error) {
      console.error("Failed to delete achievement:", error);
      alert("Failed to delete achievement");
    }
  };
  const handleEditAchievement = (achievement) => {
    setEditingAchievement(achievement);
    setAchievementForm(achievement);
    setShowAchievementForm(true);
  };
  const resetAchievementForm = () => {
    setAchievementForm({
      title: "",
      year: "",
      description: "",
      imageUrl: ""
    });
    setEditingAchievement(null);
    setShowAchievementForm(false);
  };
  return <div className="min-h-screen bg-background">{
    /* Header */
  }<header className="border-b border-border bg-card/50"><div className="container mx-auto flex items-center justify-between px-6 py-4"><Link to="/" className="flex items-center gap-2"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"><Terminal className="h-5 w-5 text-primary" /></div><span className="text-xl font-bold"><span className="gradient-text">Admin</span> Panel
  </span></Link><div className="flex items-center gap-3"><Link to="/admin/content"><Button variant="outline"><Settings size={16} className="mr-2" />
    Manage Content
  </Button></Link><Button variant="outline" onClick={handleLogout}><LogOut size={16} className="mr-2" />
        Logout
      </Button></div></div></header><main className="container mx-auto px-6 py-8">{
        /* Tabs */
      }<div className="mb-8 flex gap-4"><button
        onClick={() => setActiveTab("projects")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${activeTab === "projects" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
      ><FolderKanban size={18} />
        Projects
      </button><button
        onClick={() => setActiveTab("achievements")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${activeTab === "achievements" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
      ><Award size={18} />
          Achievements
        </button></div>{
        /* Projects Tab */
      }{activeTab === "projects" && <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key="projects"
      ><div className="mb-6 flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Manage Projects</h2><Button
        onClick={() => setShowProjectForm(true)}
        className="btn-primary"
      ><Plus size={18} className="mr-2" />
        Add Project
      </Button></div>{
          /* Project Form Modal */
        }{showProjectForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"><motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card mx-4 w-full max-w-lg p-6"
        ><div className="mb-6 flex items-center justify-between"><h3 className="text-xl font-semibold">{editingProject ? "Edit Project" : "Add Project"}</h3><button onClick={resetProjectForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button></div><div className="space-y-4"><Input
          placeholder="Title"
          value={projectForm.title}
          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
        /><Textarea
              placeholder="Description"
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            /><Input
              placeholder="Technologies (comma-separated)"
              value={projectForm.technologies}
              onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
            /><Input
              placeholder="GitHub URL"
              value={projectForm.githubUrl}
              onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
            /><Input
              placeholder="Live URL"
              value={projectForm.liveUrl}
              onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
            /><div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Project Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              {projectForm.imageUrl && (
                <div className="mt-2 h-40 w-full overflow-hidden rounded-md border">
                  <img
                    src={projectForm.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {/* Hidden input to store URL if needed, but projectForm.imageUrl is state */}
            </div><div className="flex gap-3"><Button onClick={handleSaveProject} className="btn-primary flex-1"><Save size={16} className="mr-2" />
              Save
            </Button><Button variant="outline" onClick={resetProjectForm}>
                Cancel
              </Button></div></div></motion.div></div>}{
          /* Projects List */
        }<div className="space-y-4">{projects.map((project) => <div key={project.id} className="glass-card flex items-center justify-between p-4"><div><h4 className="font-semibold text-foreground">{project.title}</h4><p className="text-sm text-muted-foreground">{project.technologies}</p></div><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => handleEditProject(project)}><Edit size={14} /></Button><Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}><Trash2 size={14} /></Button></div></div>)}</div></motion.div>}{
        /* Achievements Tab */
      }{activeTab === "achievements" && <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key="achievements"
      ><div className="mb-6 flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Manage Achievements</h2><Button
        onClick={() => setShowAchievementForm(true)}
        className="btn-primary"
      ><Plus size={18} className="mr-2" />
        Add Achievement
      </Button></div>{
          /* Achievement Form Modal */
        }{showAchievementForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"><motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card mx-4 w-full max-w-lg p-6"
        ><div className="mb-6 flex items-center justify-between"><h3 className="text-xl font-semibold">{editingAchievement ? "Edit Achievement" : "Add Achievement"}</h3><button onClick={resetAchievementForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button></div><div className="space-y-4"><Input
          placeholder="Title"
          value={achievementForm.title}
          onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
        /><Input
              placeholder="Year"
              value={achievementForm.year}
              onChange={(e) => setAchievementForm({ ...achievementForm, year: e.target.value })}
            /><div className="space-y-2">
              <label className="text-sm font-medium">Achievement Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const response = await uploadApi.uploadImage(file);
                      setAchievementForm({ ...achievementForm, imageUrl: response.data.url });
                    } catch (error) {
                      console.error("Failed to upload image:", error);
                      alert("Failed to upload image");
                    }
                  }
                }}
                className="cursor-pointer"
              />
              {achievementForm.imageUrl && (
                <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border">
                  <img
                    src={achievementForm.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => setAchievementForm({ ...achievementForm, imageUrl: "" })}
                    className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
            <Textarea
              placeholder="Description"
              value={achievementForm.description}
              onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
            /><div className="flex gap-3"><Button onClick={handleSaveAchievement} className="btn-primary flex-1"><Save size={16} className="mr-2" />
              Save
            </Button><Button variant="outline" onClick={resetAchievementForm}>
                Cancel
              </Button></div></div></motion.div></div>}{
          /* Achievements List */
        }<div className="space-y-4">{achievements.map((achievement) => <div key={achievement.id} className="glass-card flex items-center justify-between p-4"><div><h4 className="font-semibold text-foreground">{achievement.title}</h4><p className="text-sm text-muted-foreground">{achievement.year}</p></div><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => handleEditAchievement(achievement)}><Edit size={14} /></Button><Button variant="destructive" size="sm" onClick={() => handleDeleteAchievement(achievement.id)}><Trash2 size={14} /></Button></div></div>)}</div></motion.div>}</main></div>;
};
var stdin_default = AdminDashboard;
export {
  stdin_default as default
};
