/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { TReview } from './interface.reviews';
import { Review } from './model.reviews';

// 1. Create a new review
const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

// 2. Get all reviews with optional filtering and pagination
const getAllReviewsFromDB = async (payload: Record<string, unknown>) => {
  const { 
    isPublished, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    page = 1,
    limit = 10 
  } = payload;
  
  const filter: any = {};
  if (isPublished !== undefined) {
    filter.isPublished = isPublished === 'true';
  }

  const sort: any = {};
  sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

  const skip = (Number(page) - 1) * Number(limit);

  const result = await Review.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Review.countDocuments(filter);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

// 3. Get single review
const getSingleReviewFromDB = async (id: string) => {
  const result = await Review.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found with this ID');
  }
  return result;
};

// 4. Update review
const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
  const result = await Review.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update review. Review not found.');
  }
  return result;
};

// 5. Delete review
const deleteReviewFromDB = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found to delete');
  }
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getSingleReviewFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
};
