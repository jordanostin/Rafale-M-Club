import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({

    title: {
        type: String,
    },

    url: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },

    description: {
        type: String
    }

},{
    timestamps: true
});

export default mongoose.models('Media', mediaSchema);