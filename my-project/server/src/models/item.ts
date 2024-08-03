import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
    name: string;
    description: string;
    cost: number;
    onCart: boolean;
};

const ItemSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: true},
    onCart: {type: Boolean, default: false},
});

export default mongoose.model<IItem>('items', ItemSchema);