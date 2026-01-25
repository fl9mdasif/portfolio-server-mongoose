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
exports.ProjectServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const http_status_1 = __importDefault(require("http-status"));
const model_projects_1 = require("./model.projects");
// 1. Create a new project
const createProject = (projectData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_projects_1.Projects.create(projectData);
    return result;
});
// 2. Get all projects with filtering, sorting, and pagination
const getAllProjects = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', title, technology, category, status, createdAfter, } = payload;
        const filter = {};
        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }
        if (category) {
            filter.category = { $regex: new RegExp(category, 'i') };
        }
        if (status) {
            filter.status = { $regex: new RegExp(status, 'i') };
        }
        if (technology) {
            filter.technologies = { $regex: new RegExp(technology, 'i') };
        }
        if (createdAfter) {
            const releaseDate = new Date(createdAfter);
            if (!isNaN(releaseDate.getTime())) {
                filter.createdAt = { $gte: releaseDate };
            }
        }
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);
        const result = yield model_projects_1.Projects.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));
        const total = yield model_projects_1.Projects.countDocuments(filter);
        return {
            meta: {
                page: Number(page),
                limit: Number(limit),
                total,
            },
            data: result,
        };
    }
    catch (err) {
        throw new Error(err.message);
    }
});
// 3. Get a single project by ID
const getSingleProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_projects_1.Projects.findById(id);
    if (!result) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'Project not found with this ID');
    }
    return result;
});
// 4. Delete one or more projects by ID(s)
const deleteProjects = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_projects_1.Projects.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'No projects found to delete');
    }
    return result;
});
// 5. Update a project
const updateProject = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_projects_1.Projects.findByIdAndUpdate(id, { $set: updatedData }, { new: true, runValidators: true });
    if (!result) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'Failed to update project. Project not found.');
    }
    return result;
});
exports.ProjectServices = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProjects,
};
