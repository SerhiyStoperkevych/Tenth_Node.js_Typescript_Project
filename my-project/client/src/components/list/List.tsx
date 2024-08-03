import React from 'react';
import { useMessages } from './useMessages';
import MessageItem from './MessageItem';

const List: React.FC = () => {
    const [sortBy, setSortBy] = React.useState<"time" | "head" | "body" | "date" | "importance" | "up" | "down">("time");
    const { lists, error, handleSendMessage, handleDelete, handleComplete, handleEdit, sortedTasks, title, text, dueDate, priority, editingId, setTitle, setText, setDueDate, setPriority } = useMessages({ sortBy });

    return (
        <div>
            <h1>Messages</h1>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "time" | "head" | "body" | "date" | "importance" | "up" | "down")}>
                <option value="time">Time</option>
                <option value="head">Title</option>
                <option value="body">Text</option>
                <option value="date">Due Date</option>
                <option value="importance">Priority</option>
                <option value="up">Completed Up</option>
                <option value="down">Completed Down</option>
            </select>

            <ul>
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((msg) => (
                        <MessageItem 
                            key={msg.id} 
                            message={msg} 
                            onComplete={() => handleComplete(msg.id)} 
                            onDelete={() => handleDelete(msg.id)}
                            onEdit={() => handleEdit(msg.id)}
                        />
                    ))
                ) : (
                    <p>No messages yet.</p>
                )}
            </ul>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
            />
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text"
            />
            <input
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button onClick={handleSendMessage}>
                {editingId ? 'Update' : 'Send'}
            </button>

            {error && <p>{error}</p>}
        </div>
    );
};

export default List;
