import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, LogOut, FolderKanban, Award, Terminal,
  Save, X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Project, Achievement } from '@/api/api';
import { Link, useNavigate } from 'react-router-dom';

// Mock data for demo
const initialProjects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Microservices',
    description: 'Scalable e-commerce platform built with Spring Boot microservices.',
    technologies: 'Java, Spring Boot, PostgreSQL',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    imageUrl: '',
  },
];

const initialAchievements: Achievement[] = [
  {
    id: 1,
    title: 'AWS Solutions Architect',
    year: '2024',
    description: 'Professional-level AWS certification.',
  },
];

type Tab = 'projects' | 'achievements';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);

  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
  });

  const [achievementForm, setAchievementForm] = useState<Partial<Achievement>>({
    title: '',
    year: '',
    description: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSaveProject = () => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? { ...p, ...projectForm } : p
      ));
    } else {
      const newProject: Project = {
        ...projectForm as Project,
        id: Date.now(),
      };
      setProjects([...projects, newProject]);
    }
    resetProjectForm();
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm(project);
    setShowProjectForm(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
    });
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const handleSaveAchievement = () => {
    if (editingAchievement) {
      setAchievements(achievements.map(a => 
        a.id === editingAchievement.id ? { ...a, ...achievementForm } : a
      ));
    } else {
      const newAchievement: Achievement = {
        ...achievementForm as Achievement,
        id: Date.now(),
      };
      setAchievements([...achievements, newAchievement]);
    }
    resetAchievementForm();
  };

  const handleDeleteAchievement = (id: number) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setAchievementForm(achievement);
    setShowAchievementForm(true);
  };

  const resetAchievementForm = () => {
    setAchievementForm({
      title: '',
      year: '',
      description: '',
    });
    setEditingAchievement(null);
    setShowAchievementForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">Admin</span> Panel
            </span>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
              activeTab === 'projects'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <FolderKanban size={18} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
              activeTab === 'achievements'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <Award size={18} />
            Achievements
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="projects"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Manage Projects</h2>
              <Button
                onClick={() => setShowProjectForm(true)}
                className="btn-primary"
              >
                <Plus size={18} className="mr-2" />
                Add Project
              </Button>
            </div>

            {/* Project Form Modal */}
            {showProjectForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card mx-4 w-full max-w-lg p-6"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      {editingProject ? 'Edit Project' : 'Add Project'}
                    </h3>
                    <button onClick={resetProjectForm} className="text-muted-foreground hover:text-foreground">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    />
                    <Input
                      placeholder="Technologies (comma-separated)"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    />
                    <Input
                      placeholder="GitHub URL"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    />
                    <Input
                      placeholder="Live URL"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    />
                    <Input
                      placeholder="Image URL (optional)"
                      value={projectForm.imageUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    />
                    <div className="flex gap-3">
                      <Button onClick={handleSaveProject} className="btn-primary flex-1">
                        <Save size={16} className="mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={resetProjectForm}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="glass-card flex items-center justify-between p-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">{project.technologies}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                      <Edit size={14} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="achievements"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Manage Achievements</h2>
              <Button
                onClick={() => setShowAchievementForm(true)}
                className="btn-primary"
              >
                <Plus size={18} className="mr-2" />
                Add Achievement
              </Button>
            </div>

            {/* Achievement Form Modal */}
            {showAchievementForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card mx-4 w-full max-w-lg p-6"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      {editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
                    </h3>
                    <button onClick={resetAchievementForm} className="text-muted-foreground hover:text-foreground">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Title"
                      value={achievementForm.title}
                      onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                    />
                    <Input
                      placeholder="Year"
                      value={achievementForm.year}
                      onChange={(e) => setAchievementForm({ ...achievementForm, year: e.target.value })}
                    />
                    <Textarea
                      placeholder="Description"
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                    />
                    <div className="flex gap-3">
                      <Button onClick={handleSaveAchievement} className="btn-primary flex-1">
                        <Save size={16} className="mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={resetAchievementForm}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Achievements List */}
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="glass-card flex items-center justify-between p-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.year}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditAchievement(achievement)}>
                      <Edit size={14} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteAchievement(achievement.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
