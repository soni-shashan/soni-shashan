import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FiMail, FiMapPin } from 'react-icons/fi';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await contactAPI.submit(formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title">Contact Me</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Connect!</h3>
                        <p>
                            I'm always open to discussing new projects, creative ideas, or 
                            opportunities to be part of your vision.
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <FiMail className="icon" />
                                <div>
                                    <strong>Email</strong>
                                    <p>contact@shashanlumbhani.dev</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <FiMapPin className="icon" />
                                <div>
                                    <strong>Location</strong>
                                    <p>Gujarat, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <button type="submit" className="btn" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
