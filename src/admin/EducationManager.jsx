import React, { useState, useEffect } from 'react';
import { educationAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import '../styles/Manager.css';

const EducationManager = () => {
    const [education, setEducation] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        degree: '',
        institution: '',
        startYear: '',
        endYear: '',
        description: '',
        order: 0
    });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await educationAPI.getAll();
            setEducation(response.data);
        } catch (error) {
            toast.error('Failed to fetch education');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await educationAPI.update(editingId, formData);
                toast.success('Education updated successfully');
            } else {
                await educationAPI.create(formData);
                toast.success('Education added successfully');
            }
            resetForm();
            fetchEducation();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditingId(item._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await educationAPI.delete(id);
                toast.success('Education deleted successfully');
                fetchEducation();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            degree: '',
            institution: '',
            startYear: '',
            endYear: '',
            description: '',
            order: 0
        });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="manager">
            <div className="manager-header">
                <h2>Education Management</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                    <FiPlus /> Add New
                </button>
            </div>

            {showForm && (
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Institution</label>
                                <input
                                    type="text"
                                    name="institution"
                                    value={formData.institution}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Start Year</label>
                                <input
                                    type="text"
                                    name="startYear"
                                    value={formData.startYear}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>End Year</label>
                                <input
                                    type="text"
                                    name="endYear"
                                    value={formData.endYear}
                                    onChange={handleChange}
                                    required
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

            <div className="items-list">
                {education.map((item) => (
                    <div key={item._id} className="item-card">
                        <div className="item-content">
                            <h3>{item.degree}</h3>
                            <h4>{item.institution}</h4>
                            <p className="year">{item.startYear} - {item.endYear}</p>
                            <p>{item.description}</p>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)} className="btn-icon">
                                <FiEdit />
                            </button>
                            <button onClick={() => handleDelete(item._id)} className="btn-icon btn-danger">
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationManager;
