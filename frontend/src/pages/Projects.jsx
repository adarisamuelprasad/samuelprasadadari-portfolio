import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { projectsApi } from "@/api/api";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsApi.getAll();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  return <><Navbar /><main className="min-h-screen pt-24"><div className="container mx-auto px-6 py-12"><SectionTitle
    title="Projects"
    subtitle="A showcase of my work and contributions"
  />{loading ? <div className="flex justify-center py-20"><div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div> : <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</motion.div>}{!loading && projects.length === 0 && <div className="py-20 text-center"><p className="text-muted-foreground">No projects found.</p></div>}</div></main><Footer /></>;
};
var stdin_default = Projects;
export {
  stdin_default as default
};
