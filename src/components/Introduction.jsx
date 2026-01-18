import React from 'react';
import '../styles/Introduction.css';

const Introduction = () => {
    return (
        <section id="introduction" className="introduction">
            <div className="container">
                <div className="intro-content">
                    <h1>Hi, I'm <span className="highlight">Shashan Lumbhani</span></h1>
                    <h2>AIML & Cloud Enthusiast</h2>
                    <p>
                        Welcome to my portfolio! I'm passionate about providing beautiful and 
                        functional real world solutions. Let's build something amazing together!
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
