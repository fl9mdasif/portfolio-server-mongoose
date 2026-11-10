"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string({
            message: 'User name is required'
        }),
        userTitle: zod_1.z.string().optional(),
        rating: zod_1.z.number({
            message: 'Rating is required'
        })
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating cannot exceed 5'),
        comment: zod_1.z.string({
            message: 'Comment is required'
        }),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
const updateReviewValidationSchema = zod_1.z.object({
    body: createReviewValidationSchema.shape.body.partial(),
});
exports.ReviewValidations = {
    createReviewValidationSchema,
    updateReviewValidationSchema,
};
