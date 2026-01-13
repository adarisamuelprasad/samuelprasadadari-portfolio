import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Database, Brain, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import TypeWriter from "@/components/TypeWriter";
import { contentApi } from "@/api/api";

const Index = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentApi.getBySection("home");
        const contentMap = {};
        response.data.forEach(item => {
          contentMap[item.field] = item.value;
        });
        setContent(contentMap);
      } catch (error) {
        console.error("Failed to load home content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const roles = ["Java Developer", "Spring Boot Developer", "AI & ML Enthusiast", "Computer Vision Enthusiast"];

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  return <main className="relative min-h-screen overflow-hidden">{
    /* Background effects */
  }<div className="pointer-events-none absolute inset-0"><div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" /><div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" /></div>{
      /* Hero Section */
    }<section className="relative flex min-h-screen items-center pt-20"><div className="container mx-auto px-6"><div className="grid items-center gap-12 lg:grid-cols-2">{
      /* Left content */
    }<motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="order-2 lg:order-1"
    ><motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2"
    ><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary" /></span><span className="text-sm text-primary">{content.availabilityStatus || "Available for opportunities"}</span></motion.div><h1 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Hi, I'm{" "}<span className="gradient-text">{content.name || "Adari Samuel Prasad"}</span><br />
          <span className="text-xl md:text-3xl lg:text-4xl">
            <TypeWriter words={[content.headline || roles[0], content.headline?.split("|")[1]?.trim() || roles[1], content.subheadline || roles[2], content.subheadline?.split("|")[1]?.trim() || roles[3]].filter(Boolean)} />
          </span></h1><p className="mb-8 max-w-lg text-lg text-muted-foreground">
          {content.description || "A passionate B.Tech student specializing in Artificial Intelligence & Machine Learning..."}
        </p><div className="flex flex-wrap gap-4"><Link to="/projects" className="btn-primary">
          View My Work
        </Link><Link to="/contact" className="btn-outline">
            Get in Touch
          </Link></div>{
          /* Tech stack icons */
        }<motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex items-center gap-6"
        ><span className="text-sm text-muted-foreground">Tech Stack:</span><div className="flex gap-3">{[Code2, Database, Brain, Cpu].map((Icon, i) => <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50"
        ><Icon size={18} className="text-primary" /></motion.div>)}</div></motion.div></motion.div>{
        /* Right content - Developer image */
      }<motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="order-1 flex justify-center lg:order-2"
      ><div className="relative">{
        /* Glow effect */
      }<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl" />{
            /* Profile image container */
          }<div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 md:h-80 md:w-80"><div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" /><img
            src={content.profileImage || "/images/Samuel.jpg"}
            alt="Adari Samuel Prasad"
            className="h-full w-full object-cover"
          /></div>{
            /* Floating badges */
          }<motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="glass-card absolute -left-20 top-1/4 px-4 py-2"
          ><span className="text-sm font-medium text-primary">Java Developer</span></motion.div><motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="glass-card absolute -right-4 bottom-1/4 px-4 py-2"
          ><span className="text-sm font-medium text-accent">AI Enthusiast</span></motion.div></div></motion.div></div>{
        /* Scroll indicator */
      }<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      ><motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex flex-col items-center gap-2 text-muted-foreground"
      ><span className="text-xs">Scroll to explore</span><ArrowDown size={16} /></motion.div></motion.div></div></section></main>;
};
export default Index;
