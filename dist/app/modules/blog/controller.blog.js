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
exports.blogControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const service_blog_1 = require("./service.blog");
// create blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Assuming authMiddleware adds user to req.user
    const authorId = req.user._id;
    const result = yield service_blog_1.BlogServices.createBlog(authorId, req.body);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog created Successfully',
        data: result,
    });
});
// get all blogs
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_blog_1.BlogServices.getAllBlogs(req.query);
    sendResponse_1.response.getSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blogs retrieved successfully',
        data: result,
    });
}));
// delete blogs
const deleteBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const resp = yield service_blog_1.BlogServices.deleteBlogs(blogId);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blogs deleted successfully',
        data: resp,
    });
}));
// Get single blog
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield service_blog_1.BlogServices.getSingleBlog(blogId);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog retrieved successfully',
        data: result,
    });
}));
// update blog
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const updatedData = req.body;
    const result = yield service_blog_1.BlogServices.updateBlog(blogId, updatedData);
    sendResponse_1.response.createSendResponse(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog updated successfully',
        data: result,
    });
}));
exports.blogControllers = {
    createBlog,
    getAllBlogs,
    deleteBlogs,
    getSingleBlog,
    updateBlog,
};
