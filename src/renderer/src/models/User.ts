import { TUser } from "../types";
import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // * For get username from session in next-auth, use "name" instead username or fullname field
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        is_search_started: {
            type: Boolean,
            required: true,
        },
        is_seed_sended: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model<TUser>("User", userSchema);
export default User;
