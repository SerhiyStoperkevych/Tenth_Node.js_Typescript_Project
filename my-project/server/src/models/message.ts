import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    title: string;
    text: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
    completed: boolean;
}

const messageSchema = new Schema<IMessage>({
    title: { type: String, required: true },
    text: { type: String, required: true },
    dueDate: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    completed: { type: Boolean, default: false }
});

const Message = mongoose.model<IMessage>('messages', messageSchema);

export default Message;
