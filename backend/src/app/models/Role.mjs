import mongoose from "mongoose";
import Permission from "./Permission.mjs";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        index: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Permission
    }],
    created_at: { 
        type: Date, 
        default: Date.now
    },
    updated_at: { 
        type: Date, 
        default: Date.now
    }
});

export default mongoose.model('Role', roleSchema);