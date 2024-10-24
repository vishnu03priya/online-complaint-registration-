import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/register', { name, email, password });
            localStorage.setItem('authToken', data.token);
            history.push('/dashboard');
        } catch (error) {
            console.error('Registration failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={registerHandler}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
