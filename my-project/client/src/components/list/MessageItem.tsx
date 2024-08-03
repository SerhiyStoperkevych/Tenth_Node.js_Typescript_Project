import React from 'react';
import { Message } from './Message';

interface MessageItemProps {
    message: Message;
    onComplete: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onComplete, onDelete, onEdit }) => (
    <li>
        <h1 style={{ textDecoration: message.completed ? 'line-through' : 'none' }}>{message.title}</h1>
        <p style={{ textDecoration: message.completed ? 'line-through' : 'none' }}>{message.text}</p>
        <p style={{ textDecoration: message.completed ? 'line-through' : 'none' }}>{message.dueDate}</p>
        <p style={{ textDecoration: message.completed ? 'line-through' : 'none' }}>{message.priority}</p>
        <button onClick={onComplete}>
            {message.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
    </li>
);

export default MessageItem;
