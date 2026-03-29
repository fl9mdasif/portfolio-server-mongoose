import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    userName: z.string({ 
      message: 'User name is required' 
    }),
    userTitle: z.string().optional(),
    rating: z.number({ 
      message: 'Rating is required' 
    })
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
    comment: z.string({ 
      message: 'Comment is required' 
    }),
    isPublished: z.boolean().optional(),
  }),
});

const updateReviewValidationSchema = z.object({
  body: createReviewValidationSchema.shape.body.partial(),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
