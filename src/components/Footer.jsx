import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <FiGithub />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FiLinkedin />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FiTwitter />
                        </a>
                    </div>
                    <p>&copy; 2026 Your Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
