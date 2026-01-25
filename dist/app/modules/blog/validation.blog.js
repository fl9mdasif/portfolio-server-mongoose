"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ message: 'Title is required' }),
        description: zod_1.z.string({ message: 'Description is required' }),
        coverImage: zod_1.z
            .string({ message: 'Cover image URL is required' })
            .url(),
        status: zod_1.z.enum(['DRAFT', 'PUBLISHED']).optional().default('DRAFT'),
        // author will be added from the authenticated user (req.user)
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        coverImage: zod_1.z.string().url().optional(),
        status: zod_1.z.enum(['DRAFT', 'PUBLISHED']).optional(),
        likes: zod_1.z.number().min(0).optional(),
        publishedAt: zod_1.z.date().optional(),
    }),
});
exports.BlogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
