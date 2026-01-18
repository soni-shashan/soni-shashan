import React, { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import '../styles/Manager.css';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        order: 0
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectAPI.getAll();
            setProjects(response.data);
        } catch (error) {
            toast.error('Failed to fetch projects');
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim())));
        submitData.append('liveUrl', formData.liveUrl);
        submitData.append('githubUrl', formData.githubUrl);
        submitData.append('featured', formData.featured);
        submitData.append('order', formData.order);
        
        if (imageFile) {
            submitData.append('image', imageFile);
        }

        try {
            if (editingId) {
                await projectAPI.update(editingId, submitData);
                toast.success('Project updated successfully');
            } else {
                await projectAPI.create(submitData);
                toast.success('Project added successfully');
            }
            resetForm();
            fetchProjects();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            technologies: project.technologies.join(', '),
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            featured: project.featured,
            order: project.order
        });
        setEditingId(project._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectAPI.delete(id);
                toast.success('Project deleted successfully');
                fetchProjects();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            technologies: '',
            liveUrl: '',
            githubUrl: '',
            featured: false,
            order: 0
        });
        setImageFile(null);
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="manager">
            <div className="manager-header">
                <h2>Project Management</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                    <FiPlus /> Add New
                </button>
            </div>

            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Technologies (comma-separated)</label>
                            <input
                                type="text"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Live URL</label>
                                <input
                                    type="url"
                                    name="liveUrl"
                                    value={formData.liveUrl}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>GitHub URL</label>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Project Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Order</label>
                                <input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                    Featured Project
                                </label>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button type="button" onClick={resetForm} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="items-grid">
                {projects.map((project) => (
                    <div key={project._id} className="project-card-admin">
                        {project.image && (
                            <img src={`http://localhost:5000${project.image}`} alt={project.title} />
                        )}
                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="technologies">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(project)} className="btn-icon">
                                <FiEdit />
                            </button>
                            <button onClick={() => handleDelete(project._id)} className="btn-icon btn-danger">
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManager;
