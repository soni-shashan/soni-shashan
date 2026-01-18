import React from 'react';
import '../styles/Introduction.css';

const Introduction = () => {
    return (
        <section id="introduction" className="introduction">
            <div className="container">
                <div className="intro-content">
                    <h1>Hi, I'm <span className="highlight">Your Name</span></h1>
                    <h2>Full Stack Developer</h2>
                    <p>
                        Welcome to my portfolio! I'm passionate about creating beautiful and 
                        functional web applications. I specialize in React, Node.js, and modern 
                        web technologies. Let's build something amazing together!
                    </p>
                    <div className="intro-buttons">
                        <a href="#contact" className="btn btn-primary">Get In Touch</a>
                        <a href="#projects" className="btn btn-secondary">View Projects</a>
                    </div>
                </div>
                <div className="intro-image">
                    <div className="image-wrapper">
                        <img src="/placeholder-profile.jpg" alt="Profile" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Introduction;
