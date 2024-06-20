import mongoose, { mongo } from "mongoose";
import User from "./User.mjs";
import authConfig from '../config/auth.mjs';

const refreshTokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "User ID is required!"],
        index: true,
    },
    token: {
        type: String,
        required: [true, "Token is required!"],
        index: true,
    },
    created_at: { 
        type: Date, 
        default: Date.now, 
        expires: authConfig.refresh_token.expires_in  // Automatic expiration time
    }
});

export default mongoose.model('RefreshToken', refreshTokenSchema);