/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { Blog } from './model.blog';
import { TBlog } from './interface.blog';


// 1. Create a new blog
// We also need to pass the author ID from the controller
const createBlog = async (authorId: string, blogData: Omit<TBlog, 'author'>) => {
  const fullBlogData = {
    ...blogData,
    author: authorId, // Add author from authenticated user
  };
  const result = await Blog.create(fullBlogData);
  return result;
};

// 2. Get all blogs with filtering, sorting, and pagination
const getAllBlogs = async (payload: Record<string, unknown>) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      title,
      status,
      // You can also add filtering by author ID if needed
    } = payload;

    const filter: any = {};

    if (title) {
      filter.title = { $regex: new RegExp(title as string, 'i') };
    }
    // Only show PUBLISHED blogs to the public, or all if a status is specified
    if (status) {
      filter.status = status as string;
    } else {
      filter.status = 'PUBLISHED'; // Default to public blogs
    }

    const sort: Record<string, any> = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);

    const result = await Blog.find(filter)
      .populate('author', 'name email') // Show author's name and email
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Blog.countDocuments(filter);

    return {
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
      data: result,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// 3. Get a single blog by ID
const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id).populate('author', 'name email');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found with this ID');
  }

  return result;
};

// 4. Delete one or more blogs by ID(s)
const deleteBlogs = async (ids: string[]) => {
  const result = await Blog.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No blogs found to delete');
  }

  return result;
};

// 5. Update a blog
const updateBlog = async (id: string, updatedData: Partial<TBlog>) => {
  // If status is changing to PUBLISHED, set the publishedAt date
  if (updatedData.status === 'PUBLISHED') {
    const blog = await Blog.findById(id);
    if (blog && blog.status === 'DRAFT') {
      updatedData.publishedAt = new Date();
    }
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true, runValidators: true },
  ).populate('author', 'name email');

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to update blog. Blog not found.',
    );
  }

  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlogs,
};