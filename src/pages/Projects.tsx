import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/api/api';

// Mock data - Replace with API call when backend is ready
const mockProjects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Microservices',
    description: 'Scalable e-commerce platform built with Spring Boot microservices, Kafka for event streaming, and Redis for caching.',
    technologies: 'Java, Spring Boot, PostgreSQL, Kafka, Redis, Docker',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'AI-Powered Analytics',
    description: 'Real-time analytics dashboard with ML-based predictions using Python, TensorFlow, and React visualization.',
    technologies: 'Python, TensorFlow, FastAPI, React, PostgreSQL',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'DevOps Automation Platform',
    description: 'CI/CD pipeline automation tool with Kubernetes orchestration and infrastructure as code.',
    technologies: 'Go, Kubernetes, Terraform, AWS, GitHub Actions',
    githubUrl: 'https://github.com',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Real-time Chat Application',
    description: 'WebSocket-based chat platform with end-to-end encryption and offline message sync.',
    technologies: 'Node.js, Socket.io, MongoDB, React, Redis',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Financial Trading Bot',
    description: 'Algorithmic trading bot with ML-based market analysis and automated execution.',
    technologies: 'Python, PyTorch, PostgreSQL, Celery, Docker',
    githubUrl: 'https://github.com',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Healthcare API Platform',
    description: 'HIPAA-compliant healthcare data platform with secure API gateway and audit logging.',
    technologies: 'Java, Spring Boot, PostgreSQL, Keycloak, AWS',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchProjects = async () => {
    //   try {
    //     const response = await projectsApi.getAll();
    //     setProjects(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch projects:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchProjects();

    // Using mock data for now
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <div className="container mx-auto px-6 py-12">
          <SectionTitle
            title="Projects"
            subtitle="A showcase of my work and contributions"
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}

          {!loading && projects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
