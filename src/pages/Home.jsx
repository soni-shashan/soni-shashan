import React from 'react';
import Navbar from '../components/Navbar';
import Introduction from '../components/Introduction';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Introduction />
            <Education />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
