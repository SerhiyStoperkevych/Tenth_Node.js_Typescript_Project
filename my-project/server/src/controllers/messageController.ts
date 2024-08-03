import { Request, Response } from 'express';
import Message, { IMessage } from '../models/message';
import mongoose from 'mongoose';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { sortBy } = req.query;

        // Fetch messages from MongoDB
        const messages = await Message.find().exec();

        // Sorting logic
        const sortedMessages = [...messages].sort((a, b) => {
            // Explicitly cast _id to mongoose.Types.ObjectId
            const idA = a._id as mongoose.Types.ObjectId;
            const idB = b._id as mongoose.Types.ObjectId;

            switch (sortBy) {
                case 'time':
                    return idA.getTimestamp().getTime() - idB.getTimestamp().getTime();
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

        res.json(sortedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
};

export const postMessage = async (req: Request, res: Response) => {
    const { title, text, dueDate, priority, completed } = req.body;

    // Validate required fields
    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required' });
    }

    const validPriorities: Array<IMessage['priority']> = ["Low", "Medium", "High"];
    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority' });
    }

    try {
        const newMessage = new Message({
            title,
            text,
            dueDate,
            priority,
            completed: completed ?? false
        });

        await newMessage.save();

        res.status(201).json({ message: 'Message saved', newMessage });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'An error occurred while saving the message' });
    }
};

export const deleteMessage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await Message.findByIdAndDelete(id).exec();

        if (!result) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'An error occurred while deleting the message' });
    }
};

export const updateMessage = async (req: Request, res: Response) => {
    const messageId = req.params.id;
    const updatedMessageData: Partial<IMessage> = req.body;

    try {
        const updatedMessage = await Message.findByIdAndUpdate(messageId, updatedMessageData, { new: true }).exec();
        if (!updatedMessage) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error('Error updating message', error);
        res.status(500).json({ error: 'An error occurred while updating the message' });
    }
};
