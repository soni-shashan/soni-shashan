import React, { useState, useEffect } from 'react';
import { educationAPI } from '../services/api';
import '../styles/Education.css';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await educationAPI.getAll();
            setEducation(response.data);
        } catch (error) {
            console.error('Error fetching education:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <section id="education" className="education">
            <div className="container">
                <h2 className="section-title">Education</h2>
                <div className="education-timeline">
                    {education.map((item) => (
                        <div key={item._id} className="education-item">
                            <div className="year">{item.startYear} - {item.endYear}</div>
                            <h3>{item.degree}</h3>
                            <h4>{item.institution}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
