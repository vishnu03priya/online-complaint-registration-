import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
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
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint) => (
                        <tr key={complaint._id}>
                            <td>{complaint.title}</td>
                            <td>{complaint.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
