import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Save, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectsApi, uploadApi } from "@/api/api";

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const response = await projectsApi.getAll();
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to load projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (editingProject) {
                await projectsApi.update(editingProject.id, formData);
            } else {
                await projectsApi.create(formData);
            }
            loadProjects();
            resetForm();
        } catch (error) {
            console.error("Failed to save project:", error);
            alert("Failed to save project");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await projectsApi.delete(id);
            loadProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
            alert("Failed to delete project");
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData(project);
        setShowForm(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setUploading(true);
                const response = await uploadApi.uploadImage(file);
                setFormData({ ...formData, imageUrl: response.data.url });
            } catch (error) {
                console.error("Failed to upload image:", error);
                alert("Failed to upload image");
            } finally {
                setUploading(false);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            technologies: "",
            githubUrl: "",
            liveUrl: "",
            imageUrl: ""
        });
        setEditingProject(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">Manage your portfolio projects.</p>
                </div>
                <Button onClick={() => setShowForm(true)} className="btn-primary">
                    <Plus size={18} className="mr-2" /> Add Project
                </Button>
            </div>

            {loading && <div className="text-center py-10">Loading projects...</div>}

            {!loading && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all"
                        >
                            {project.imageUrl && (
                                <div className="aspect-video w-full overflow-hidden">
                                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                            )}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{project.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.technologies?.split(",").map((tech, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground">{tech.trim()}</span>
                                    ))}
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)} className="w-full">
                                        <Edit size={14} className="mr-2" /> Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)} className="w-full">
                                        <Trash2 size={14} className="mr-2" /> Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg rounded-xl border border-border bg-card shadow-lg p-6 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-semibold">{editingProject ? "Edit Project" : "Add Project"}</h3>
                            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Project Title"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Project Description"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Technologies</label>
                                <Input
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    placeholder="Java, Spring Boot, React (comma separated)"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">GitHub URL</label>
                                    <Input
                                        value={formData.githubUrl}
                                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Live URL</label>
                                    <Input
                                        value={formData.liveUrl}
                                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cover Image</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                                {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
                                {formData.imageUrl && (
                                    <div className="mt-2 relative rounded-md overflow-hidden border border-border aspect-video">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" onClick={resetForm} className="flex-1">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="flex-1" disabled={uploading}>
                                    <Save size={16} className="mr-2" /> Save Project
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
