import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
const placeholderImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop";
const ProjectCard = ({ project, index }) => {
  return <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="glass-card group overflow-hidden"
  ><div className="relative h-48 overflow-hidden"><img
    src={project.imageUrl || placeholderImage}
    alt={project.title}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
  /><div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex gap-2">{project.repoUrl && <a
    href={project.repoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
  ><Github size={16} /></a>}{project.liveUrl && <a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
  ><ExternalLink size={16} /></a>}</div></div><div className="p-6"><h3 className="mb-2 text-xl font-semibold text-foreground">{project.title}</h3><p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{project.description}</p><div className="flex flex-wrap gap-2">{project.technologies.split(",").map((tech, i) => <span
    key={i}
    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
  >{tech.trim()}</span>)}</div></div></motion.div>;
};
var stdin_default = ProjectCard;
export {
  stdin_default as default
};
