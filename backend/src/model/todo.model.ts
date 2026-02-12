import { model, Schema, Types } from "mongoose";

export interface TodoModel {
    title: string;
    description: string;
    completed?: boolean;
    uid: Types.ObjectId;
}

export type TodoDocument = TodoModel & { _id: Types.ObjectId };

const todoSchema = new Schema<TodoModel>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false, required: false },
    uid: { type: Types.ObjectId, required: true, ref: 'User' }, 
});

export const TodoModel = model<TodoModel>('Todo', todoSchema);