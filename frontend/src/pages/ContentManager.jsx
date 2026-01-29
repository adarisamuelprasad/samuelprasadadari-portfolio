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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

    const updateFieldValue = (section, field, value, property = "value") => {
        if (section === "skills") {
            setSkillsContent((prev) => ({
                ...prev,
                [field]: { ...prev[field], [property]: value, section: "skills", field, type: prev[field]?.type || "text" },
            }));
            return;
        }

        const setter = section === "home" ? setHomeContent :
            section === "about" ? setAboutContent :
                setContactContent;

        setter((prev) => ({
            ...prev,
            [field]: { ...prev[field], [property]: value, section, field, type: prev[field]?.type || "text" },
        }));
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

    const renderTextSizeSelect = (section, field, currentValue) => (
        <Select
            value={currentValue || "default"}
            onValueChange={(val) => updateFieldValue(section, field, val === "default" ? "" : val, "textSize")}
        >
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Text Size" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="text-sm">Small</SelectItem>
                <SelectItem value="text-base">Normal</SelectItem>
                <SelectItem value="text-lg">Large</SelectItem>
                <SelectItem value="text-xl">Extra Large</SelectItem>
                <SelectItem value="text-2xl">2XL</SelectItem>
                <SelectItem value="text-3xl">3XL</SelectItem>
                <SelectItem value="text-4xl">4XL</SelectItem>
                <SelectItem value="text-5xl">5XL</SelectItem>
            </SelectContent>
        </Select>
    );

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

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Hero Text</h3>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Full Name</label>
                            {renderTextSizeSelect("home", "name", homeContent.name?.textSize)}
                        </div>
                        <Input
                            value={homeContent.name?.value || ""}
                            onChange={(e) => updateFieldValue("home", "name", e.target.value)}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Primary Headline</label>
                            {renderTextSizeSelect("home", "headline", homeContent.headline?.textSize)}
                        </div>
                        <Input
                            value={homeContent.headline?.value || ""}
                            onChange={(e) => updateFieldValue("home", "headline", e.target.value)}
                            placeholder="e.g., Java Developer | Spring Boot Developer"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">Typewriter Flash Words (Comma Separated)</label>
                        <Input
                            value={homeContent.flashwords?.value || ""}
                            onChange={(e) => updateFieldValue("home", "flashwords", e.target.value)}
                            placeholder="e.g., Java Developer, Spring Boot Developer, AI Enthusiast"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Introduction / Description</label>
                            {renderTextSizeSelect("home", "description", homeContent.description?.textSize)}
                        </div>
                        <Textarea
                            value={homeContent.description?.value || ""}
                            onChange={(e) => updateFieldValue("home", "description", e.target.value)}
                            placeholder="Write your introduction paragraph..."
                            rows={5}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Labels & Visuals</h3>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Tech Stack Label</label>
                            {renderTextSizeSelect("home", "heroTechStackLabel", homeContent.heroTechStackLabel?.textSize)}
                        </div>
                        <Input
                            value={homeContent.heroTechStackLabel?.value || ""}
                            onChange={(e) => updateFieldValue("home", "heroTechStackLabel", e.target.value)}
                            placeholder="Tech Stack:"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Scroll Indicator Text</label>
                            {renderTextSizeSelect("home", "heroScrollText", homeContent.heroScrollText?.textSize)}
                        </div>
                        <Input
                            value={homeContent.heroScrollText?.value || ""}
                            onChange={(e) => updateFieldValue("home", "heroScrollText", e.target.value)}
                            placeholder="Scroll to explore"
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Profile & Visuals</h3>
                <div>
                    <label className="mb-2 block text-sm font-semibold">Availability Status</label>
                    <Input
                        value={homeContent.availabilityStatus?.value || ""}
                        onChange={(e) => updateFieldValue("home", "availabilityStatus", e.target.value)}
                        placeholder="e.g., Available for opportunities"
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Floating Badge 1</label>
                        <Input
                            value={homeContent.heroBadge1?.value || ""}
                            onChange={(e) => updateFieldValue("home", "heroBadge1", e.target.value)}
                            placeholder="Java Developer"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Floating Badge 2</label>
                        <Input
                            value={homeContent.heroBadge2?.value || ""}
                            onChange={(e) => updateFieldValue("home", "heroBadge2", e.target.value)}
                            placeholder="AI Enthusiast"
                        />
                    </div>
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

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Main Content</h3>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Main Heading (Title)</label>
                            {renderTextSizeSelect("about", "title", aboutContent.title?.textSize)}
                        </div>
                        <Input
                            value={aboutContent.title?.value || ""}
                            onChange={(e) => updateFieldValue("about", "title", e.target.value)}
                            placeholder="About Me"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Subtitle</label>
                            {renderTextSizeSelect("about", "subtitle", aboutContent.subtitle?.textSize)}
                        </div>
                        <Input
                            value={aboutContent.subtitle?.value || ""}
                            onChange={(e) => updateFieldValue("about", "subtitle", e.target.value)}
                            placeholder="Get to know the developer..."
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Introduction Headline</label>
                            {renderTextSizeSelect("about", "headline", aboutContent.headline?.textSize)}
                        </div>
                        <Input
                            value={aboutContent.headline?.value || ""}
                            onChange={(e) => updateFieldValue("about", "headline", e.target.value)}
                            placeholder="Backend & AI Developer"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Description</label>
                            {renderTextSizeSelect("about", "description", aboutContent.description?.textSize)}
                        </div>
                        <Textarea
                            value={aboutContent.description?.value || ""}
                            onChange={(e) => updateFieldValue("about", "description", e.target.value)}
                            placeholder="Write about yourself..."
                            rows={6}
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Mission Statement / Goal</label>
                            {renderTextSizeSelect("about", "mission", aboutContent.mission?.textSize)}
                        </div>
                        <Textarea
                            value={aboutContent.mission?.value || ""}
                            onChange={(e) => updateFieldValue("about", "mission", e.target.value)}
                            placeholder="My journey began..."
                            rows={4}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold">Education Text</label>
                            {renderTextSizeSelect("about", "education", aboutContent.education?.textSize)}
                        </div>
                        <Textarea
                            value={aboutContent.education?.value || ""}
                            onChange={(e) => updateFieldValue("about", "education", e.target.value)}
                            placeholder="Your educational background..."
                            rows={3}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Quick Facts</h3>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Section Title</label>
                        <Input
                            value={aboutContent.quickFactsTitle?.value || ""}
                            onChange={(e) => updateFieldValue("about", "quickFactsTitle", e.target.value)}
                            placeholder="Quick Facts"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Label 1</label>
                            <Input value={aboutContent.factRoleLabel?.value || ""} onChange={(e) => updateFieldValue("about", "factRoleLabel", e.target.value)} placeholder="Role" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Value 1</label>
                            <Input value={aboutContent.factRoleValue?.value || ""} onChange={(e) => updateFieldValue("about", "factRoleValue", e.target.value)} placeholder="Java Developer" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Label 2</label>
                            <Input value={aboutContent.factFocusLabel?.value || ""} onChange={(e) => updateFieldValue("about", "factFocusLabel", e.target.value)} placeholder="Focus" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Value 2</label>
                            <Input value={aboutContent.factFocusValue?.value || ""} onChange={(e) => updateFieldValue("about", "factFocusValue", e.target.value)} placeholder="AI Enthusiast" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Label 3</label>
                            <Input value={aboutContent.factStatLabel?.value || ""} onChange={(e) => updateFieldValue("about", "factStatLabel", e.target.value)} placeholder="Coffee Cups" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Value 3</label>
                            <Input value={aboutContent.factStatValue?.value || ""} onChange={(e) => updateFieldValue("about", "factStatValue", e.target.value)} placeholder="Infinity" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Label 4</label>
                            <Input value={aboutContent.factExpLabel?.value || ""} onChange={(e) => updateFieldValue("about", "factExpLabel", e.target.value)} placeholder="Status" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Value 4</label>
                            <Input
                                value={aboutContent.yearsOfExperience?.value || ""}
                                onChange={(e) => updateFieldValue("about", "yearsOfExperience", e.target.value)}
                                placeholder="Open for Work"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Skills Section Headers</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Skills Title</label>
                        <Input
                            value={aboutContent.skillsTitle?.value || ""}
                            onChange={(e) => updateFieldValue("about", "skillsTitle", e.target.value)}
                            placeholder="Skills & Technologies"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Skills Subtitle</label>
                        <Input
                            value={aboutContent.skillsSubtitle?.value || ""}
                            onChange={(e) => updateFieldValue("about", "skillsSubtitle", e.target.value)}
                            placeholder="Tools and technologies..."
                        />
                    </div>
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

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Page Headers</h3>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Subtitle</label>
                        <Input
                            value={contactContent.subtitle?.value || ""}
                            onChange={(e) => updateFieldValue("contact", "subtitle", e.target.value)}
                            placeholder="Have a project in mind?..."
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Form Title</label>
                        <Input
                            value={contactContent.formTitle?.value || ""}
                            onChange={(e) => updateFieldValue("contact", "formTitle", e.target.value)}
                            placeholder="Get in Touch"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Form Description</label>
                        <Textarea
                            value={contactContent.formDescription?.value || ""}
                            onChange={(e) => updateFieldValue("contact", "formDescription", e.target.value)}
                            placeholder="I'm always open to..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Details</h3>
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Email Address (Display)</label>
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
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Messages</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Success Message</label>
                        <Input
                            value={contactContent.successMessage?.value || ""}
                            onChange={(e) => updateFieldValue("contact", "successMessage", e.target.value)}
                            placeholder="Message sent successfully!"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-border pt-4">
                <h3 className="mb-3 text-lg font-semibold">Social Links</h3>

                <div className="grid gap-4 md:grid-cols-2">
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
