import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            const { data } = await axios.get('/api/complaints/my-complaints', {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setComplaints(data);
        };
        fetchComplaints();
    }, []);

    return (
        <div className="container mt-5">
            <h2>My Complaints</h2>
            <ul className="list-group">
                {complaints.map((complaint) => (
                    <li key={complaint._id} className="list-group-item">
                        <strong>{complaint.title}</strong> - {complaint.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyComplaints;
