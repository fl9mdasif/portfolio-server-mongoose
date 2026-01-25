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
exports.BlogServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const model_blog_1 = require("./model.blog");
// 1. Create a new blog
// We also need to pass the author ID from the controller
const createBlog = (authorId, blogData) => __awaiter(void 0, void 0, void 0, function* () {
    const fullBlogData = Object.assign(Object.assign({}, blogData), { author: authorId });
    const result = yield model_blog_1.Blog.create(fullBlogData);
    return result;
});
const getAllBlogs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', title, status, } = payload;
        const filter = {};
        // টাইটেল দিয়ে সার্চ
        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') };
        }
        if (status) {
            filter.status = status;
        }
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const skip = (Number(page) - 1) * Number(limit);
        const result = yield model_blog_1.Blog.find(filter)
            .populate('author', 'name email') // আপনার User মডেলে 'name' আছে, 'username' নয়
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));
        const total = yield model_blog_1.Blog.countDocuments(filter);
        // console.log(result);
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
// 3. Get a single blog by ID
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_blog_1.Blog.findById(id).populate('author', 'name email');
    if (!result) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'Blog not found with this ID');
    }
    return result;
});
// 4. Delete one or more blogs by ID(s)
const deleteBlogs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_blog_1.Blog.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'No blogs found to delete');
    }
    return result;
});
// 5. Update a blog
const updateBlog = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    // If status is changing to PUBLISHED, set the publishedAt date
    if (updatedData.status === 'PUBLISHED') {
        const blog = yield model_blog_1.Blog.findById(id);
        if (blog && blog.status === 'DRAFT') {
            updatedData.publishedAt = new Date();
        }
    }
    const result = yield model_blog_1.Blog.findByIdAndUpdate(id, { $set: updatedData }, { new: true, runValidators: true }).populate('author', 'username email');
    if (!result) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, 'Failed to update blog. Blog not found.');
    }
    return result;
});
exports.BlogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlogs,
};
