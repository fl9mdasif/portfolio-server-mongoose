"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const http_status_1 = __importDefault(require("http-status"));
const model_skills_1 = require("./model.skills");
// 1. Create a new skill
const createSkillIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_skills_1.Skill.create(payload);
    return result;
});
// 2. Get all skills with optional filtering
const getAllSkillsFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, isSelect, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = payload;
    const filter = {};
    if (category) {
        filter.category = { $regex: new RegExp(category, 'i') };
    }
    if (isSelect !== undefined) {
        filter.isSelect = isSelect === 'true';
    }
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);
    const result = yield model_skills_1.Skill.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));
    const total = yield model_skills_1.Skill.countDocuments(filter);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: result,
    };
});
// 3. Get single skill
const getSingleSkillFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_skills_1.Skill.findById(id);
    if (!result) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'Skill not found with this ID');
    }
    return result;
});
// 4. Update skill
const updateSkillIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_skills_1.Skill.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
    if (!result) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'Failed to update skill. Skill not found.');
    }
    return result;
});
// 5. Delete skill
const deleteSkillFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_skills_1.Skill.findByIdAndDelete(id);
    if (!result) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'Skill not found to delete');
    }
    return result;
});
exports.SkillServices = {
    createSkillIntoDB,
    getAllSkillsFromDB,
    getSingleSkillFromDB,
    updateSkillIntoDB,
    deleteSkillFromDB,
};
