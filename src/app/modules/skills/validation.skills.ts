import { z } from 'zod';

const createSkillValidationSchema = z.object({
  body: z.object({
    name: z.string({ 
      message: 'Name is required' 
    }),
    level: z.number({ 
      message: 'Level must be a number' 
    })
    .min(0, 'Level must be at least 0')
    .max(100, 'Level cannot exceed 100')
    .optional(),
    category: z.string({ 
      message: 'Category is required' 
    }),
    image: z.string({ 
      message: 'Image URL is required' 
    }).url('Image must be a valid URL'),
    isSelect: z.boolean().optional(),
  }),
});

const updateSkillValidationSchema = z.object({
  body: createSkillValidationSchema.shape.body.partial(),
});

export const SkillValidations = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
};
