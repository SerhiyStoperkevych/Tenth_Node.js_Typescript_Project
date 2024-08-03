import React from 'react';
import axios from 'axios';
import { useMyContext } from '../MyContext';
import UseEffectSigning from './UseEffectSigning';

const SignUp: React.FC = () => {
    const { username, setUsername, password, setPassword, setUsers, navigate } = useMyContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username.trim() && password.trim()) {
            try {
                await axios.post('http://localhost:3001/users', { username, password });
                setUsers((prevUsers) => [...prevUsers, { username, password }]);
                setUsername('');
                setPassword('');
                navigate('/logIn');
            } catch (error) {
                console.error('Error signing up:', error);
            }
        } else {
            console.error('Username and password are required.');
        }
    };

    return (
        <div>
            <UseEffectSigning />
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
