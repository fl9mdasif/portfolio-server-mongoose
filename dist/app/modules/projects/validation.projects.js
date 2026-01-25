"use strict";
// src/app/modules/project/project.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidations = void 0;
const zod_1 = require("zod");
const projectStatusEnum = zod_1.z.enum([
    'Live',
    'In Development',
    'Completed',
    'On Hold',
]);
const createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            message: 'Title must be a string'
        }),
        description: zod_1.z.string({
            message: 'Description must be a string'
        }),
        technologies: zod_1.z
            .array(zod_1.z.string(), {
            message: 'Technologies must be an array'
        })
            .min(1, 'At least one technology is required'),
        category: zod_1.z.string({
            message: 'Category must be a string'
        }),
        image: zod_1.z
            .string({
            message: 'Image URL must be a string'
        })
            .url('Image must be a valid URL'),
        // These are fine
        gallery: zod_1.z
            .array(zod_1.z.string().url('Each gallery image must be a valid URL'))
            .optional(),
        liveUrl: zod_1.z.string().url('Live URL must be a valid URL').optional(),
        githubClient: zod_1.z
            .string()
            .url('GitHub Client URL must be a valid URL')
            .optional(),
        githubServer: zod_1.z
            .string()
            .url('GitHub Server URL must be a valid URL')
            .optional(),
        status: projectStatusEnum.optional(),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: createProjectValidationSchema.shape.body.partial(),
});
exports.projectValidations = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
};
