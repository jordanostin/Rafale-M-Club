import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    }

},{
    timestamps: true
});

export default mongoose.model('Event', eventSchema);