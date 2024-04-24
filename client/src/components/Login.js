// src/components/Login.js
import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the login logic
        console.log("Login attempt with:", username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
