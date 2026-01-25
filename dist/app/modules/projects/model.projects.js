"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    category: { type: String, required: true },
    image: { type: String }, // Main image URL
    gallery: [{ type: String }],
    liveUrl: { type: String },
    githubClient: { type: String },
    githubServer: { type: String },
    status: {
        type: String,
        enum: ['Live', 'In Development', 'Completed', 'On Hold'],
        default: 'In Development',
    },
}, { timestamps: true });
exports.Projects = (0, mongoose_1.model)('Project', projectSchema);
