import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  text: string;
};

const ChatSchema: Schema = new Schema({
  text: { type: String, required: true }
});

export default mongoose.model<IChat>('chat', ChatSchema);