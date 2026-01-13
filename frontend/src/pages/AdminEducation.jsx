import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Save, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { educationApi } from "@/api/api";

const AdminEducation = () => {
    const [educationList, setEducationList] = useState([]);
    const [editingEducation, setEditingEducation] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        institution: "",
        degree: "",
        years: "",
        description: "",
        grade: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadEducation();
    }, []);

    const loadEducation = async () => {
        try {
            setLoading(true);
            const response = await educationApi.getAll();
            setEducationList(response.data);
        } catch (error) {
            console.error("Failed to load education:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (editingEducation) {
                await educationApi.update(editingEducation.id, formData);
            } else {
                await educationApi.create(formData);
            }
            loadEducation();
            resetForm();
        } catch (error) {
            console.error("Failed to save education:", error);
            alert("Failed to save education");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this education entry?")) return;
        try {
            await educationApi.delete(id);
            loadEducation();
        } catch (error) {
            console.error("Failed to delete education:", error);
            alert("Failed to delete education");
        }
    };

    const handleEdit = (edu) => {
        setEditingEducation(edu);
        setFormData(edu);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            institution: "",
            degree: "",
            years: "",
            description: "",
            grade: ""
        });
        setEditingEducation(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Education</h2>
                    <p className="text-muted-foreground">Manage your educational background.</p>
                </div>
                <Button onClick={() => setShowForm(true)} className="btn-primary">
                    <Plus size={18} className="mr-2" /> Add Education
                </Button>
            </div>

            {loading && <div className="text-center py-10">Loading education...</div>}

            {!loading && (
                <div className="space-y-4">
                    {educationList.map((edu) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative rounded-xl border border-border bg-card shadow-sm p-6 hover:shadow-md transition-all flex justify-between items-start gap-4"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <GraduationCap size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{edu.institution}</h3>
                                        <p className="text-muted-foreground font-medium">{edu.degree}</p>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground grid grid-cols-2 gap-2 mb-3">
                                    <span>{edu.years}</span>
                                    <span>Grade/GPA: {edu.grade}</span>
                                </div>
                                <p className="text-sm border-t border-border pt-3">{edu.description}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEdit(edu)}>
                                    <Edit size={16} />
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(edu.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    {educationList.length === 0 && (
                        <div className="text-center p-12 border border-dashed border-border rounded-xl text-muted-foreground">
                            No education entries found. Add your degree!
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
                            <h3 className="text-xl font-semibold">{editingEducation ? "Edit Education" : "Add Education"}</h3>
                            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Institution / University</label>
                                <Input
                                    value={formData.institution}
                                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                    placeholder="e.g. Stanford University"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Degree / Certification</label>
                                <Input
                                    value={formData.degree}
                                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                    placeholder="e.g. B.S. Computer Science"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Years</label>
                                    <Input
                                        value={formData.years}
                                        onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                                        placeholder="e.g. 2018 - 2022"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Grade / GPA</label>
                                    <Input
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        placeholder="e.g. 3.8/4.0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Relevant coursework, honors, etc."
                                    rows={4}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" onClick={resetForm} className="flex-1">
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} className="flex-1">
                                    <Save size={16} className="mr-2" /> Save Education
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminEducation;
