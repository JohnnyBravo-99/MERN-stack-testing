import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/login.css';
import Register from './user_system/registration.js';

const Login = ({setUser}) => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {username, password});
        setUser(response.data);
        navigate('/calendar');
    } catch (error) {
        console.error("Failed to login: ", error);
        alert("Login failed. Please check your username and password.");
    }
};

return ( 

<form onSubmit={handleSubmit}>
    <div className="d-flex justify-content-center ">
    <div className="login-container">
    <input 
    type="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Please type in your username!"
    className="login-input"
    required
    />
    <input 
    type="password"
    value={password}  // Added missing value attribute
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Please type in your password"
    required
    className="login-input"
    />
    <button type="submit" className="loginButton">Login</button>  
    <button type="button" className="loginButton" onClick={() => navigate('/Register')}>Register</button>
    </div>
    </div>

</form>

);
};

export default Login;