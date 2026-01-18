import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-wrapper">
                    <Link to="/" className="logo">
                        <h1>Portfolio</h1>
                    </Link>
                    
                    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <button className="nav-link" onClick={() => scrollToSection("introduction")}>
                            Home
                            </button>
                            <button className="nav-link" onClick={() => scrollToSection("education")}>
                            Education
                            </button>
                            <button className="nav-link" onClick={() => scrollToSection("projects")}>
                            Projects
                            </button>
                            <button className="nav-link" onClick={() => scrollToSection("contact")}>
                            Contact
                            </button>

                        {isAuthenticated && (
                            <Link to="/admin" className="admin-link">Admin</Link>
                        )}
                    </div>

                    <div className="hamburger" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
