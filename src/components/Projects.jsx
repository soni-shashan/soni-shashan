import React, { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import '../styles/Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectAPI.getAll();
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <section id="projects" className="projects">
            <div className="container">
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project._id} className="project-card">
                            <div className="project-image">
                                <img 
                                    src={project.image || '/placeholder-project.jpg'} 
                                    alt={project.title} 
                                />
                            </div>
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="technologies">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {project.liveUrl && (
                                        <a 
                                            href={project.liveUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn-small"
                                        >
                                            <FiExternalLink /> Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a 
                                            href={project.githubUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn-small"
                                        >
                                            <FiGithub /> GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
