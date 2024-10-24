import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const socket = io.connect('http://localhost:5000'); // Adjust based on server URL

const ChatPage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('join_complaint', id);

        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    const sendMessage = async () => {
        const newMessage = { complaintId: id, message };
        socket.emit('send_message', newMessage);

        // Save message in DB
        await axios.post(`/api/complaints/${id}/messages`, { message });

        setMessage('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;
