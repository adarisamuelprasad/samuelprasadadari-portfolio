import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Save,
    X,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentApi, uploadApi } from "@/api/api";
import SkillsManager from "@/components/SkillsManager";

const ContentManager = ({ section }) => {
    // We use the prop 'section' instead of internal state for navigation
    const activeSection = section || "home";

    const [homeContent, setHomeContent] = useState({});
    const [aboutContent, setAboutContent] = useState({});
    const [skillsContent, setSkillsContent] = useState({ skillsList: [] });
    const [contactContent, setContactContent] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [savedSection, setSavedSection] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(null);

    useEffect(() => {
        loadAllContent();
    }, []);

    const loadAllContent = async () => {
        setLoading(true);
        try {
            // Load all sections
            const [homeRes, aboutRes, skillsRes, contactRes] = await Promise.all([
                contentApi.getBySection("home"),
                contentApi.getBySection("about"),
                contentApi.getBySection("skills"),
                contentApi.getBySection("contact"),
            ]);

            // Parse home content
            const homeData = {};
            homeRes.data.forEach((item) => {
                homeData[item.field] = { ...item };
            });
            setHomeContent(homeData);

            // Parse about content
            const aboutData = {};
            aboutRes.data.forEach((item) => {
                aboutData[item.field] = { ...item };
            });
            setAboutContent(aboutData);

            // Parse skills content
            const skillsData = {};
            const skillsList = [];
            skillsRes.data.forEach((item) => {
                if (item.field.startsWith("skill_")) {
                    skillsList.push({ ...item });
                } else {
                    skillsData[item.field] = { ...item };
                }
            });
            setSkillsContent({ ...skillsData, skillsList });

            // Parse contact content
            const contactData = {};
            contactRes.data.forEach((item) => {
                contactData[item.field] = { ...item };
            });
            setContactContent(contactData);
        } catch (error) {
            console.error("Failed to load content:", error);
        }
        setLoading(false);
    };

    const handleImageUpload = async (section, field, file) => {
        if (!file) return;

        setUploadingImage(`${section}_${field}`);
        try {
            const response = await uploadApi.uploadImage(file);
            updateFieldValue(section, field, response.data.url);
        } catch (error) {
            console.error("Failed to upload image:", error);
            alert("Failed to upload image");
        }
        setUploadingImage(null);
    };

    const updateFieldValue = (section, field, value) => {
        if (section === "home") {
            setHomeContent((prev) => ({
                ...prev,
                [field]: { ...prev[field], value, section: "home", field, type: prev[field]?.type || "text" },
            }));
        } else if (section === "about") {
            setAboutContent((prev) => ({
                ...prev,
                [field]: { ...prev[field], value, section: "about", field, type: prev[field]?.type || "text" },
            }));
        } else if (section === "skills") {
            setSkillsContent((prev) => ({
                ...prev,
                [field]: { ...prev[field], value, section: "skills", field, type: prev[field]?.type || "text" },
            }));
        } else if (section === "contact") {
            setContactContent((prev) => ({
                ...prev,
                [field]: { ...prev[field], value, section: "contact", field, type: prev[field]?.type || "text" },
            }));
        }
    };

    const saveSection = async (sectionToSave) => {
        setSaving(true);
        setSavedSection(null);
        try {
            let contentToSave = [];
            if (sectionToSave === "home") {
                contentToSave = Object.values(homeContent);
            } else if (sectionToSave === "about") {
                contentToSave = Object.values(aboutContent);
            } else if (sectionToSave === "skills") {
                const { skillsList, ...otherSkills } = skillsContent;
                contentToSave = [...Object.values(otherSkills), ...(skillsList || [])];
            } else if (sectionToSave === "contact") {
                contentToSave = Object.values(contactContent);
            }

            for (const item of contentToSave) {
                if (item.id) {
                    await contentApi.update(item.id, item);
                } else {
                    await contentApi.create(item);
                }
            }

            setSavedSection(sectionToSave);
            setTimeout(() => setSavedSection(null), 3000);
            loadAllContent(); // Reload to get IDs
        } catch (error) {
            console.error("Failed to save content:", error);
            alert("Failed to save content");
        }
        setSaving(false);
    };

    const renderHomeSection = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-2xl font-bold">🏠 Home Page Content</h2>
                <Button onClick={() => saveSection("home")} disabled={saving} className="btn-primary">
                    {saving ? (
                        <>Saving...</>
                    ) : savedSection === "home" ? (
                        <>
                            <Check size={16} className="mr-2" /> Saved!
                        </>
                    ) : (
                        <>
                            <Save size={16} className="mr-2" /> Save Home Page
                        </>
                    )}
                </Button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold">Full Name</label>
                    <Input
                        value={homeContent.name?.value || ""}
                        onChange={(e) => updateFieldValue("home", "name", e.target.value)}
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Primary Headline</label>
                    <Input
                        value={homeContent.headline?.value || ""}
                        onChange={(e) => updateFieldValue("home", "headline", e.target.value)}
                        placeholder="e.g., Java Developer | Spring Boot Developer"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Secondary Headline / Subheadline</label>
                    <Input
                        value={homeContent.subheadline?.value || ""}
                        onChange={(e) => updateFieldValue("home", "subheadline", e.target.value)}
                        placeholder="e.g., AI & ML Enthusiast | Computer Vision Enthusiast"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Introduction / Description</label>
                    <Textarea
                        value={homeContent.description?.value || ""}
                        onChange={(e) => updateFieldValue("home", "description", e.target.value)}
                        placeholder="Write your introduction paragraph..."
                        rows={5}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Profile Image</label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload("home", "profileImage", file);
                        }}
                        disabled={uploadingImage === "home_profileImage"}
                        className="cursor-pointer"
                    />
                    {uploadingImage === "home_profileImage" && <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>}
                    {homeContent.profileImage?.value && (
                        <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border">
                            <img src={homeContent.profileImage.value} alt="Profile" className="h-full w-full object-cover" />
                            <button
                                onClick={() => updateFieldValue("home", "profileImage", "")}
                                className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Availability Status</label>
                    <Input
                        value={homeContent.availabilityStatus?.value || ""}
                        onChange={(e) => updateFieldValue("home", "availabilityStatus", e.target.value)}
                        placeholder="e.g., Available for opportunities"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Resume / CV Link</label>
                    <Input
                        value={homeContent.resumeUrl?.value || ""}
                        onChange={(e) => updateFieldValue("home", "resumeUrl", e.target.value)}
                        placeholder="https://your-resume-link.com"
                        type="url"
                    />
                </div>
            </div>
        </div>
    );

    const renderAboutSection = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-2xl font-bold">👤 About Me Section</h2>
                <Button onClick={() => saveSection("about")} disabled={saving} className="btn-primary">
                    {saving ? (
                        <>Saving...</>
                    ) : savedSection === "about" ? (
                        <>
                            <Check size={16} className="mr-2" /> Saved!
                        </>
                    ) : (
                        <>
                            <Save size={16} className="mr-2" /> Save About Section
                        </>
                    )}
                </Button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold">Section Title</label>
                    <Input
                        value={aboutContent.title?.value || ""}
                        onChange={(e) => updateFieldValue("about", "title", e.target.value)}
                        placeholder="e.g., About Me"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">About Me Description</label>
                    <Textarea
                        value={aboutContent.description?.value || ""}
                        onChange={(e) => updateFieldValue("about", "description", e.target.value)}
                        placeholder="Write about yourself, your background, expertise..."
                        rows={6}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Mission Statement / Goal</label>
                    <Textarea
                        value={aboutContent.mission?.value || ""}
                        onChange={(e) => updateFieldValue("about", "mission", e.target.value)}
                        placeholder="Your professional mission or career goal..."
                        rows={4}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Years of Experience</label>
                    <Input
                        value={aboutContent.yearsOfExperience?.value || ""}
                        onChange={(e) => updateFieldValue("about", "yearsOfExperience", e.target.value)}
                        placeholder="e.g., 2+ years"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Education</label>
                    <Textarea
                        value={aboutContent.education?.value || ""}
                        onChange={(e) => updateFieldValue("about", "education", e.target.value)}
                        placeholder="Your educational background..."
                        rows={3}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">About Image (Optional)</label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload("about", "aboutImage", file);
                        }}
                        disabled={uploadingImage === "about_aboutImage"}
                        className="cursor-pointer"
                    />
                    {uploadingImage === "about_aboutImage" && <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>}
                    {aboutContent.aboutImage?.value && (
                        <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border">
                            <img src={aboutContent.aboutImage.value} alt="About" className="h-full w-full object-cover" />
                            <button
                                onClick={() => updateFieldValue("about", "aboutImage", "")}
                                className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderSkillsSection = () => (
        <SkillsManager
            onSave={() => saveSection("skills")}
            saving={saving}
            savedSection={savedSection}
        />
    );

    const renderContactSection = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-2xl font-bold">📧 Contact Information</h2>
                <Button onClick={() => saveSection("contact")} disabled={saving} className="btn-primary">
                    {saving ? (
                        <>Saving...</>
                    ) : savedSection === "contact" ? (
                        <>
                            <Check size={16} className="mr-2" /> Saved!
                        </>
                    ) : (
                        <>
                            <Save size={16} className="mr-2" /> Save Contact Info
                        </>
                    )}
                </Button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold">Email Address</label>
                    <Input
                        type="email"
                        value={contactContent.email?.value || ""}
                        onChange={(e) => updateFieldValue("contact", "email", e.target.value)}
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Phone Number</label>
                    <Input
                        value={contactContent.phone?.value || ""}
                        onChange={(e) => updateFieldValue("contact", "phone", e.target.value)}
                        placeholder="+91 XXXXXXXXXX"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Location / City</label>
                    <Input
                        value={contactContent.location?.value || ""}
                        onChange={(e) => updateFieldValue("contact", "location", e.target.value)}
                        placeholder="e.g., Mumbai, India"
                    />
                </div>

                <div className="border-t border-border pt-4">
                    <h3 className="mb-3 text-lg font-semibold">Social Links</h3>

                    <div className="space-y-3">
                        <div>
                            <label className="mb-2 block text-sm font-semibold">LinkedIn Profile URL</label>
                            <Input
                                type="url"
                                value={contactContent.linkedin?.value || ""}
                                onChange={(e) => updateFieldValue("contact", "linkedin", e.target.value)}
                                placeholder="https://www.linkedin.com/in/yourprofile"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold">GitHub Profile URL</label>
                            <Input
                                type="url"
                                value={contactContent.github?.value || ""}
                                onChange={(e) => updateFieldValue("contact", "github", e.target.value)}
                                placeholder="https://github.com/yourusername"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold">Twitter / X Profile URL</label>
                            <Input
                                type="url"
                                value={contactContent.twitter?.value || ""}
                                onChange={(e) => updateFieldValue("contact", "twitter", e.target.value)}
                                placeholder="https://twitter.com/yourusername"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold">Portfolio / Personal Website</label>
                            <Input
                                type="url"
                                value={contactContent.website?.value || ""}
                                onChange={(e) => updateFieldValue("contact", "website", e.target.value)}
                                placeholder="https://yourwebsite.com"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const getSectionTitle = (sec) => {
        switch (sec) {
            case "home": return "Home Page Content";
            case "about": return "About Me Section";
            case "skills": return "Skills & Technologies";
            case "contact": return "Contact Information";
            default: return "Content Manager";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{getSectionTitle(activeSection)}</h2>
                    <p className="text-muted-foreground">Manage content for this section.</p>
                </div>
            </div>

            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
            >
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {activeSection === "home" && renderHomeSection()}
                        {activeSection === "about" && renderAboutSection()}
                        {activeSection === "skills" && renderSkillsSection()}
                        {activeSection === "contact" && renderContactSection()}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default ContentManager;
