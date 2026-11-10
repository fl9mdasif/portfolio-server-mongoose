"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = void 0;
const mongoose_1 = require("mongoose");
const skillSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isSelect: { type: Boolean, default: false },
}, { timestamps: true });
exports.Skill = (0, mongoose_1.model)('Skill', skillSchema);
