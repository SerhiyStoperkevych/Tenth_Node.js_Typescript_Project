import { useState, useEffect } from 'react';
import { fetchMessages, createMessage, deleteMessage, updateMessage } from './api';
import { Message } from './Message';
import axios from 'axios';

interface UseMessagesParams {
    sortBy: "time" | "head" | "body" | "date" | "importance" | "up" | "down";
}

export const useMessages = ({ sortBy }: UseMessagesParams) => {
    const [lists, setLists] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
    const [editingId, setEditingId] = useState<number | null>(null); // Add this line

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const messages = await fetchMessages();
                setLists(messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError('Failed to load messages.');
            }
        };

        fetchLists();
    }, []);

    const handleSendMessage = async () => {
        if (text.trim() && title.trim()) {
            try {
                if (editingId !== null) {
                    // Update existing message
                    const updatedMessage = await updateMessage(editingId, { title, text, dueDate, priority, completed: false });
                    setLists(prevLists => prevLists.map(msg => (msg.id === editingId ? updatedMessage : msg)));
                    setEditingId(null); // Reset editing ID
                } else {
                    // Create new message
                    const newMessage = await createMessage({ title, text, dueDate, priority, completed: false });
                    setLists(prevLists => [...prevLists, newMessage]);
                }
                setTitle('');
                setText('');
                setDueDate('');
                setPriority("Medium");
                window.location.reload();
            } catch (error) {
                console.error('Error sending message:', error);
                // Log the full error response
                if (axios.isAxiosError(error)) {
                    console.error('Error details:', error.response?.data);
                }
                setError('Failed to send message.');
            }
        } else {
            setError('Title and text are required.');
        }
    };
    

    const handleDelete = async (id: number) => {
        try {
            await deleteMessage(id);
            setLists(prevLists => prevLists.filter(msg => msg.id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
            setError('Failed to delete message.');
        }
    };

    const handleComplete = (id: number) => {
        setLists(prevLists => prevLists.map(msg =>
            msg.id === id ? { ...msg, completed: !msg.completed } : msg
        ));
    };

    const handleEdit = (id: number) => {
        const messageToEdit = lists.find(msg => msg.id === id);
        if (messageToEdit) {
            setTitle(messageToEdit.title);
            setText(messageToEdit.text);
            setDueDate(messageToEdit.dueDate);
            setPriority(messageToEdit.priority);
            setEditingId(id);
        }
    };

    const sortedTasks = [...lists].sort((a, b) => {
        switch (sortBy) {
            case 'time':
                return a.id - b.id;
            case 'head':
                return a.title.localeCompare(b.title);
            case 'body':
                return a.text.localeCompare(b.text);
            case 'date':
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            case 'importance':
                const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
                return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
            case 'up':
                return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
            case 'down':
                return a.completed === b.completed ? 0 : b.completed ? 1 : -1;
            default:
                return 0;
        }
    });

    return {
        lists,
        error,
        handleSendMessage,
        handleDelete,
        handleComplete,
        handleEdit,
        sortedTasks,
        title,
        text,
        dueDate,
        priority,
        editingId, // Add this line
        setTitle,
        setText,
        setDueDate,
        setPriority
    };
};
