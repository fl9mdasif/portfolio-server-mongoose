"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillValidations = void 0;
const zod_1 = require("zod");
const createSkillValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            message: 'Name is required'
        }),
        level: zod_1.z.number({
            message: 'Level must be a number'
        })
            .min(0, 'Level must be at least 0')
            .max(100, 'Level cannot exceed 100')
            .optional(),
        category: zod_1.z.string({
            message: 'Category is required'
        }),
        image: zod_1.z.string({
            message: 'Image URL is required'
        }).url('Image must be a valid URL'),
        isSelect: zod_1.z.boolean().optional(),
    }),
});
const updateSkillValidationSchema = zod_1.z.object({
    body: createSkillValidationSchema.shape.body.partial(),
});
exports.SkillValidations = {
    createSkillValidationSchema,
    updateSkillValidationSchema,
};
