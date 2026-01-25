"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED'],
        default: 'DRAFT',
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User', // Assumes your User model is named 'User'
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    publishedAt: {
        type: Date,
        // default: null,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
