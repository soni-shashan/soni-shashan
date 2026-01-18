import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EducationManager from '../admin/EducationManager';
import ProjectManager from '../admin/ProjectManager';
import ContactMessages from '../admin/ContactMessages';
import { FiLogOut, FiBook, FiFolderPlus, FiMail } from 'react-icons/fi';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('education');
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    <p>Welcome, {user?.username}</p>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={activeTab === 'education' ? 'active' : ''}
                        onClick={() => setActiveTab('education')}
                    >
                        <FiBook /> Education
                    </button>
                    <button
                        className={activeTab === 'projects' ? 'active' : ''}
                        onClick={() => setActiveTab('projects')}
                    >
                        <FiFolderPlus /> Projects
                    </button>
                    <button
                        className={activeTab === 'messages' ? 'active' : ''}
                        onClick={() => setActiveTab('messages')}
                    >
                        <FiMail /> Messages
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={() => navigate('/')} className="btn-secondary">
                        View Portfolio
                    </button>
                    <button onClick={handleLogout} className="btn-danger">
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>
            <main className="dashboard-content">
                {activeTab === 'education' && <EducationManager />}
                {activeTab === 'projects' && <ProjectManager />}
                {activeTab === 'messages' && <ContactMessages />}
            </main>
        </div>
    );
};

export default AdminDashboard;
