import React, { useState } from 'react';
import axios from 'axios';

const SubmitComplaint = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/complaints', { title, description }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            console.log('Complaint submitted:', data);
        } catch (error) {
            console.error('Complaint submission failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Submit a Complaint</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SubmitComplaint;
