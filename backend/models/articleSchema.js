import mongoose from "mongoose";

const articleSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    coverImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: false,
    },

    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: false,
    },

    published: {
        type: Boolean,
        default: false,
    },

    publishedAt: {
        type: Date,
    }

},{
    timestamps: true
});

export default mongoose.models('Article', articleSchema);