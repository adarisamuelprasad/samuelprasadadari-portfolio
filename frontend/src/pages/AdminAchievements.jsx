import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { achievementsApi, uploadApi } from "@/api/api";

const AdminAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [editingAchievement, setEditingAchievement] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        year: "",
        description: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadAchievements();
    }, []);

    const loadAchievements = async () => {
        try {
            setLoading(true);
            const response = await achievementsApi.getAll();
            setAchievements(response.data);
        } catch (error) {
            console.error("Failed to load achievements:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (editingAchievement) {
                await achievementsApi.update(editingAchievement.id, formData);
            } else {
                await achievementsApi.create(formData);
            }
            loadAchievements();
            resetForm();
        } catch (error) {
            console.error("Failed to save achievement:", error);
            alert("Failed to save achievement");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this achievement?")) return;
        try {
            await achievementsApi.delete(id);
            loadAchievements();
        } catch (error) {
            console.error("Failed to delete achievement:", error);
            alert("Failed to delete achievement");
        }
    };

    const handleEdit = (achievement) => {
        setEditingAchievement(achievement);
        setFormData(achievement);
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
            year: "",
            description: "",
            imageUrl: ""
        });
        setEditingAchievement(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Achievements</h2>
                    <p className="text-muted-foreground">Showcase your certifications and awards.</p>
                </div>
                <Button onClick={() => setShowForm(true)} className="btn-primary">
                    <Plus size={18} className="mr-2" /> Add Achievement
                </Button>
            </div>

            {loading && <div className="text-center py-10">Loading achievements...</div>}

            {!loading && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all flex flex-col"
                        >
                            {achievement.imageUrl && (
                                <div className="h-40 w-full overflow-hidden bg-muted">
                                    <img src={achievement.imageUrl} alt={achievement.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                            )}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                    <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">{achievement.year}</span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{achievement.description}</p>

                                <div className="flex gap-2 mt-auto">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(achievement)} className="flex-1">
                                        <Edit size={14} className="mr-2" /> Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(achievement.id)} className="flex-1">
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
                        className="w-full max-w-lg rounded-xl border border-border bg-card shadow-lg p-6"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-semibold">{editingAchievement ? "Edit Achievement" : "Add Achievement"}</h3>
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
                                    placeholder="Achievement Title"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Year</label>
                                <Input
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    placeholder="2024"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Details about the certification or award..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image (Optional)</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                                {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
                                {formData.imageUrl && (
                                    <div className="mt-2 relative rounded-md overflow-hidden border border-border h-32 w-full">
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
                                    <Save size={16} className="mr-2" /> Save
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminAchievements;
