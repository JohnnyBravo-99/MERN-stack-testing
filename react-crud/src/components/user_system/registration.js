import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/auth/signup', {  // Updated URL
            username, password, email
        });
        setMessage('Registration successful!');

        setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
        setMessage('Registration failed. Please try again.');
        console.error('Registration failed:', error);
    }
};

return ( 
    <div> 
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
            />
            <input 
            type="password"  // Changed type to 'password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
            />
            <input 
            type="email"  // Changed type to 'email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
            />
            <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
    </div>
)

}

export default Register;