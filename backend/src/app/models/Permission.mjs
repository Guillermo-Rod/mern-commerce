import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        index: true,
    },
    created_at: { 
        type: Date, 
        default: Date.now
    },
    updated_at: { 
        type: Date, 
        default: Date.now
    }
});

export default mongoose.model('Permission', permissionSchema);