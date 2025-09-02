import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        status: {
            type: String,
            enum: ['draft', 'in progress', 'completed'],
            default: 'draft',
        }
    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    }]

},{
    timestamps: true
});

export default mongoose.model('Project', projectSchema);