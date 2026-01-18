import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FiTrash2, FiMail, FiCheck } from 'react-icons/fi';
import '../styles/Manager.css';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await contactAPI.getAll();
            setMessages(response.data);
        } catch (error) {
            toast.error('Failed to fetch messages');
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await contactAPI.updateStatus(id, status);
            toast.success('Status updated');
            fetchMessages();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await contactAPI.delete(id);
                toast.success('Message deleted');
                fetchMessages();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'unread':
                return 'status-unread';
            case 'read':
                return 'status-read';
            case 'replied':
                return 'status-replied';
            default:
                return '';
        }
    };

    return (
        <div className="manager">
            <div className="manager-header">
                <h2>Contact Messages</h2>
                <div className="stats">
                    <span>Total: {messages.length}</span>
                    <span>Unread: {messages.filter(m => m.status === 'unread').length}</span>
                </div>
            </div>

            <div className="messages-list">
                {messages.map((message) => (
                    <div key={message._id} className={`message-card ${getStatusColor(message.status)}`}>
                        <div className="message-header">
                            <div>
                                <h3>{message.name}</h3>
                                <p className="email">{message.email}</p>
                            </div>
                            <div className="message-status">
                                <span className={`status-badge ${message.status}`}>
                                    {message.status}
                                </span>
                            </div>
                        </div>
                        <div className="message-body">
                            <p>{message.message}</p>
                        </div>
                        <div className="message-footer">
                            <span className="date">
                                {new Date(message.createdAt).toLocaleDateString()}
                            </span>
                            <div className="message-actions">
                                {message.status === 'unread' && (
                                    <button
                                        onClick={() => handleStatusChange(message._id, 'read')}
                                        className="btn-icon"
                                        title="Mark as read"
                                    >
                                        <FiMail />
                                    </button>
                                )}
                                {message.status !== 'replied' && (
                                    <button
                                        onClick={() => handleStatusChange(message._id, 'replied')}
                                        className="btn-icon btn-success"
                                        title="Mark as replied"
                                    >
                                        <FiCheck />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(message._id)}
                                    className="btn-icon btn-danger"
                                    title="Delete"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactMessages;
