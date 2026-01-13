import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Save, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { experienceApi } from "@/api/api";

const AdminExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [editingExperience, setEditingExperience] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        duration: "",
        description: "",
        location: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        try {
            setLoading(true);
            const response = await experienceApi.getAll();
            setExperiences(response.data);
        } catch (error) {
            console.error("Failed to load experience:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (editingExperience) {
                await experienceApi.update(editingExperience.id, formData);
            } else {
                await experienceApi.create(formData);
            }
            loadExperiences();
            resetForm();
        } catch (error) {
            console.error("Failed to save experience:", error);
            alert("Failed to save experience");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this experience entry?")) return;
        try {
            await experienceApi.delete(id);
            loadExperiences();
        } catch (error) {
            console.error("Failed to delete experience:", error);
            alert("Failed to delete experience");
        }
    };

    const handleEdit = (exp) => {
        setEditingExperience(exp);
        setFormData(exp);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            company: "",
            role: "",
            duration: "",
            description: "",
            location: ""
        });
        setEditingExperience(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                    <p className="text-muted-foreground">Manage your work history.</p>
                </div>
                <Button onClick={() => setShowForm(true)} className="btn-primary">
                    <Plus size={18} className="mr-2" /> Add Experience
                </Button>
            </div>

            {loading && <div className="text-center py-10">Loading experience...</div>}

            {!loading && (
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative rounded-xl border border-border bg-card shadow-sm p-6 hover:shadow-md transition-all flex justify-between items-start gap-4"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                                        <p className="text-muted-foreground font-medium">{exp.company}</p>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground grid grid-cols-2 gap-2 mb-3">
                                    <span>{exp.duration}</span>
                                    <span>{exp.location}</span>
                                </div>
                                <p className="text-sm border-t border-border pt-3">{exp.description}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEdit(exp)}>
                                    <Edit size={16} />
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(exp.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    {experiences.length === 0 && (
                        <div className="text-center p-12 border border-dashed border-border rounded-xl text-muted-foreground">
                            No experience entries found. Add your first job!
                        </div>
                    )}
                </div>
            )}

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg rounded-xl border border-border bg-card shadow-lg p-6"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-semibold">{editingExperience ? "Edit Experience" : "Add Experience"}</h3>
                            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Company Name</label>
                                <Input
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="e.g. Google"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role / Job Title</label>
                                <Input
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="e.g. Senior Software Engineer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Duration</label>
                                    <Input
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="e.g. Jan 2023 - Present"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g. New York, NY"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe your responsibilities and achievements..."
                                    rows={4}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" onClick={resetForm} className="flex-1">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="flex-1">
                                    <Save size={16} className="mr-2" /> Save Experience
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminExperience;
