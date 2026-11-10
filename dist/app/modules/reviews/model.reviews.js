"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    userTitle: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
