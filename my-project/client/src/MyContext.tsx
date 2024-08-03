import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Chatz {
    id: number;
    text: string;
}

interface User {
    username: string;
    password: string;
}

interface MyContextType {
    username: string;
    setUsername: (newValue: string) => void;
    message: string;
    setMessage: (newValue: string) => void;
    password: string;
    setPassword: (newValue: string) => void;
    text: string;
    setText: (newValue: string) => void;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    texts: Chatz[];
    setTexts: React.Dispatch<React.SetStateAction<Chatz[]>>;
    navigate: (path: string, options?: { replace?: boolean; state?: any }) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [text, setText] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [texts, setTexts] = useState<Chatz[]>([]);
    const navigate = useNavigate();

    const contextValue: MyContextType = {
        username,
        setUsername,
        message,
        setMessage,
        password,
        setPassword,
        text,
        setText,
        users,
        setUsers,
        texts,
        setTexts,
        navigate,
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = (): MyContextType => {
    const context = useContext(MyContext);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
