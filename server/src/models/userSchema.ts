import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    role?: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User4", userSchema);
