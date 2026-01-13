import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X, Plus, Trash2, Check, GripVertical, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { skillsApi, contentApi } from "@/api/api";

const SkillsManager = ({ onSave, saving, savedSection }) => {
    const [skillCategories, setSkillCategories] = useState([]);
    const [skillsMetadata, setSkillsMetadata] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSkillsData();
    }, []);

    const loadSkillsData = async () => {
        setLoading(true);
        try {
            // Load skill categories
            const categoriesRes = await skillsApi.getAll();
            setSkillCategories(categoriesRes.data || []);

            // Load skills metadata (title, description)
            const metadataRes = await contentApi.getBySection("skills");
            const metadata = {};
            metadataRes.data.forEach((item) => {
                if (!item.field.startsWith("skill_")) {
                    metadata[item.field] = item;
                }
            });
            setSkillsMetadata(metadata);
        } catch (error) {
            console.error("Failed to load skills:", error);
        }
        setLoading(false);
    };

    const updateMetadata = (field, value) => {
        setSkillsMetadata((prev) => ({
            ...prev,
            [field]: { ...prev[field], value, section: "skills", field, type: prev[field]?.type || "text" },
        }));
    };

    const addCategory = () => {
        const newCategory = {
            categoryName: "",
            displayOrder: skillCategories.length,
            skills: [],
        };
        setSkillCategories([...skillCategories, newCategory]);
    };

    const updateCategory = (index, field, value) => {
        const newCategories = [...skillCategories];
        newCategories[index] = { ...newCategories[index], [field]: value };
        setSkillCategories(newCategories);
    };

    const deleteCategory = async (index) => {
        const category = skillCategories[index];
        if (category.id && !confirm("Are you sure you want to delete this entire category?")) return;

        try {
            if (category.id) {
                await skillsApi.delete(category.id);
            }
            setSkillCategories(skillCategories.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Failed to delete category:", error);
            alert("Failed to delete category");
        }
    };

    const addSkill = (categoryIndex) => {
        const newCategories = [...skillCategories];
        if (!newCategories[categoryIndex].skills) {
            newCategories[categoryIndex].skills = [];
        }
        newCategories[categoryIndex].skills.push({
            name: "",
            proficiency: "Intermediate",
            icon: "",
        });
        setSkillCategories(newCategories);
    };

    const updateSkill = (categoryIndex, skillIndex, field, value) => {
        const newCategories = [...skillCategories];
        newCategories[categoryIndex].skills[skillIndex] = {
            ...newCategories[categoryIndex].skills[skillIndex],
            [field]: value,
        };
        setSkillCategories(newCategories);
    };

    const deleteSkill = (categoryIndex, skillIndex) => {
        const newCategories = [...skillCategories];
        newCategories[categoryIndex].skills = newCategories[categoryIndex].skills.filter((_, i) => i !== skillIndex);
        setSkillCategories(newCategories);
    };

    const handleSave = async () => {
        try {
            // Save metadata
            for (const item of Object.values(skillsMetadata)) {
                if (item.id) {
                    await contentApi.update(item.id, item);
                } else {
                    await contentApi.create(item);
                }
            }

            // Save skill categories
            for (const category of skillCategories) {
                if (category.id) {
                    await skillsApi.update(category.id, category);
                } else {
                    await skillsApi.create(category);
                }
            }

            if (onSave) await onSave();
            loadSkillsData();
        } catch (error) {
            console.error("Failed to save skills:", error);
            alert("Failed to save skills");
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-2xl font-bold">💼 Skills & Technologies Management</h2>
                <Button onClick={handleSave} disabled={saving} className="btn-primary">
                    {saving ? (
                        <>Saving...</>
                    ) : savedSection === "skills" ? (
                        <>
                            <Check size={16} className="mr-2" /> Saved!
                        </>
                    ) : (
                        <>
                            <Save size={16} className="mr-2" /> Save All Skills
                        </>
                    )}
                </Button>
            </div>

            {/* Metadata Section */}
            <div className="rounded-lg border border-border bg-card/30 p-4">
                <h3 className="mb-4 text-lg font-semibold">Section Settings</h3>
                <div className="space-y-3">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Section Title</label>
                        <Input
                            value={skillsMetadata.title?.value || ""}
                            onChange={(e) => updateMetadata("title", e.target.value)}
                            placeholder="e.g., Technical Skills, My Expertise"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Section Description</label>
                        <Textarea
                            value={skillsMetadata.description?.value || ""}
                            onChange={(e) => updateMetadata("description", e.target.value)}
                            placeholder="Brief description about your overall skills..."
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            {/* Skill Categories */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Skill Categories</h3>
                    <Button onClick={addCategory} variant="outline" size="sm">
                        <Plus size={14} className="mr-1" /> Add Category
                    </Button>
                </div>

                {skillCategories.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                        <p className="text-muted-foreground">No skill categories yet. Click "Add Category" to create one!</p>
                    </div>
                ) : (
                    skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg border border-border bg-card p-4"
                        >
                            {/* Category Header */}
                            <div className="mb-4 flex items-start gap-3">
                                <GripVertical className="mt-2 text-muted-foreground" size={18} />
                                <div className="flex-1 space-y-3">
                                    <div className="flex gap-2">
                                        <Input
                                            value={category.categoryName}
                                            onChange={(e) => updateCategory(catIndex, "categoryName", e.target.value)}
                                            placeholder="Category Name (e.g., Frontend, Backend, Tools)"
                                            className="flex-1 font-semibold"
                                        />
                                        <Button onClick={() => deleteCategory(catIndex)} variant="destructive" size="sm">
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>

                                    {/* Skills in this category */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-muted-foreground">Skills in this category:</label>
                                            <Button onClick={() => addSkill(catIndex)} variant="outline" size="sm">
                                                <Plus size={12} className="mr-1" /> Add Skill
                                            </Button>
                                        </div>

                                        {category.skills && category.skills.length > 0 ? (
                                            <div className="space-y-2">
                                                {category.skills.map((skill, skillIndex) => (
                                                    <div key={skillIndex} className="flex gap-2 rounded border border-border/50 bg-background p-2">
                                                        <div className="flex-1 space-y-2">
                                                            <Input
                                                                value={skill.name}
                                                                onChange={(e) => updateSkill(catIndex, skillIndex, "name", e.target.value)}
                                                                placeholder="Skill name (e.g., Java, React, Docker)"
                                                                size="sm"
                                                            />
                                                            <select
                                                                value={skill.proficiency}
                                                                onChange={(e) => updateSkill(catIndex, skillIndex, "proficiency", e.target.value)}
                                                                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                                                            >
                                                                <option value="Beginner">Beginner</option>
                                                                <option value="Intermediate">Intermediate</option>
                                                                <option value="Advanced">Advanced</option>
                                                                <option value="Expert">Expert</option>
                                                            </select>
                                                        </div>
                                                        <Button
                                                            onClick={() => deleteSkill(catIndex, skillIndex)}
                                                            variant="ghost"
                                                            size="sm"
                                                            className="self-start"
                                                        >
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="rounded bg-muted/30 p-3 text-center text-sm text-muted-foreground">
                                                No skills in this category yet.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Helper Text */}
            <div className="rounded-lg bg-primary/5 p-4 text-sm text-muted-foreground">
                <p className="font-semibold">💡 Tips:</p>
                <ul className="ml-4 mt-2 list-disc space-y-1">
                    <li>Create categories like "Frontend", "Backend", "Database", "DevOps", "Tools", etc.</li>
                    <li>Add individual skills within each category</li>
                    <li>Set proficiency level for each skill (Beginner to Expert)</li>
                    <li>Drag categories to reorder (coming soon!)</li>
                </ul>
            </div>
        </div>
    );
};

export default SkillsManager;
