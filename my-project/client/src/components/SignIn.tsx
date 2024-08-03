import React from 'react';
import { useMyContext } from '../MyContext';
import UseEffectSigning from './UseEffectSigning';

const SignIn: React.FC = () => {
    const { username, setUsername, message, setMessage, password, setPassword, users, navigate } = useMyContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userExists = users.some(user => user.username === username && user.password === password);

        if (userExists) {
            navigate('/menu');
        } else {
            setMessage('Username or password is incorrect');
        }

        setPassword('');
    };

    return (
        <div>
            <UseEffectSigning />
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Sign In</button>
                <button type="button" onClick={() => navigate('/signUp')}>Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignIn;
