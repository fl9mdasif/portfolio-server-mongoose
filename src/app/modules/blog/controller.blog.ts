import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync'; 
import { response } from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import { BlogServices } from './service..blog';

// create blog
// This one is not wrapped in catchAsync, following your template
const createBlog: RequestHandler = async (req, res) => {
  // Assuming authMiddleware adds user to req.user
  const authorId = req.user.id; 
  const result = await BlogServices.createBlog(authorId, req.body);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created Successfully',
    data: result,
  });
};

// get all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs(req.query);

  response.getSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta, // Using meta from the service
    message: 'Blogs retrieved successfully',
    data: result.data, // Using data from the service
  });
});

// delete blogs
const deleteBlogs = catchAsync(async (req, res) => {
  const blogIds = req.body as string[];

  const resp = await BlogServices.deleteBlogs(blogIds);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs deleted successfully',
    data: resp,
  });
});

// Get single blog
const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;

  const result = await BlogServices.getSingleBlog(blogId);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

// update blog
const updateBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const updatedData = req.body;

  const result = await BlogServices.updateBlog(blogId, updatedData);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlogs,
  deleteBlogs,
  getSingleBlog,
  updateBlog,
};