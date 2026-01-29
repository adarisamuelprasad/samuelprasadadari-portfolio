import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Cloud,
  Brain,
  Cog,
  GitBranch,
  Terminal,
  Box,
  Layers,
  Shield,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import SkillCard from "@/components/SkillCard";
import { contentApi } from "@/api/api";
const skills = [
  { name: "Java", Icon: Code2 },
  { name: "Spring Boot", Icon: Layers },
  { name: "PostgreSQL", Icon: Database },
  { name: "Docker", Icon: Box },
  { name: "Kubernetes", Icon: Cloud },
  { name: "AWS", Icon: Server },
  { name: "Python", Icon: Terminal },
  { name: "TensorFlow", Icon: Brain },
  { name: "Git", Icon: GitBranch },
  { name: "REST APIs", Icon: Zap },
  { name: "Security", Icon: Shield },
  { name: "CI/CD", Icon: Cog }
];
const About = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentApi.getBySection("about");
        const contentMap = {};
        response.data.forEach(item => {
          contentMap[item.field] = { ...item };
        });
        setContent(contentMap);
      } catch (error) {
        console.error("Failed to load about content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  return <><Navbar /><main className="min-h-screen pt-24"><div className="container mx-auto px-6 py-12">{
    /* About Section */
    /* About Section */
  }<section className="mb-20"><SectionTitle
    title={content.title?.value || "About Me"}
    subtitle={content.subtitle?.value || "Get to know the developer behind the code"}
    titleClassName={content.title?.textSize}
    subtitleClassName={content.subtitle?.textSize}
  /><div className="grid gap-12 lg:grid-cols-2"><motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  ><div className="glass-card p-8"><h3 className={`mb-4 text-2xl font-semibold text-foreground ${content.headline?.textSize || ''}`}>
    {content.headline?.value || "Backend & AI Developer"}
  </h3><div className="space-y-4 text-muted-foreground"><p className={content.description?.textSize}>
    {content.description?.value || "Passionate about software development, I specialize in building robust backend systems and implementing AI solutions that solve real-world problems."}
  </p><p className={content.mission?.textSize}>
          {content.mission?.value || "My journey began with a passion for algorithms and data structures, which evolved into expertise in distributed systems, microservices architecture, and machine learning."}
        </p><p className={content.education?.textSize}>
          {content.education?.value || "I believe in writing clean, maintainable code and following best practices in software engineering. When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects."}
        </p></div></div></motion.div><motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        ><div className="glass-card p-8"><h3 className="mb-6 text-2xl font-semibold text-foreground">
          {content.quickFactsTitle?.value || "Quick Facts"}
        </h3><div className="grid grid-cols-2 gap-6">{[
          { label: content.factRoleLabel?.value || "Role", value: content.factRoleValue?.value || "Java Developer" },
          { label: content.factFocusLabel?.value || "Focus", value: content.factFocusValue?.value || "AI Enthusiast" },
          { label: content.factStatLabel?.value || "Coffee Cups", value: content.factStatValue?.value || "\u221E" },
          { label: content.factExpLabel?.value || "Status", value: content.yearsOfExperience?.value || "Open for Work" }
        ].map((fact, i) => <motion.div
          key={fact.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="text-center"
        ><div className="mb-1 text-3xl font-bold gradient-text">{fact.value}</div><div className="text-sm text-muted-foreground">{fact.label}</div></motion.div>)}</div></div></motion.div></div></section>{
      /* Skills Section */
    }<section><SectionTitle
      title={content.skillsTitle?.value || "Skills & Technologies"}
      subtitle={content.skillsSubtitle?.value || "Tools and technologies I work with daily"}
    /><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{skills.map((skill, index) => <SkillCard key={skill.name} {...skill} index={index} />)}</div></section></div></main><Footer /></>;
};
var stdin_default = About;
export {
  stdin_default as default
};
