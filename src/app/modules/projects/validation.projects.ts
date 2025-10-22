// import z from 'zod';

// // Zod schema for the Course object
// import { z } from 'zod';

// // Define the enum for status
// const projectStatusEnum = z.enum([
//   'Live',
//   'In Development',
//   'Completed',
//   'On Hold',
// ]);

// // Schema for creating a new project
// export const createProjectValidationSchema = z.object({
//   body: z.object({
//     title: z.string({ required_error: 'Title is required' }),
//     description: z.string({ required_error: 'Description is required' }),
//     technologies: z
//       .array(z.string(), { required_error: 'Technologies are required' })
//       .min(1, 'At least one technology is required'),
//     category: z.string({ required_error: 'Category is required' }),
//     image: z
//       .string({ required_error: 'Image URL is required' })
//       .url('Image must be a valid URL'),

//     gallery: z
//       .array(z.string().url('Each gallery image must be a valid URL'))
//       .optional(),
//     liveUrl: z.string().url('Live URL must be a valid URL').optional(),
//     githubClient: z
//       .string()
//       .url('GitHub Client URL must be a valid URL')
//       .optional(),
//     githubServer: z
//       .string()
//       .url('GitHub Server URL must be a valid URL')
//       .optional(),
//     status: projectStatusEnum.optional(), // Optional on creation (uses default)
//   }),
// });

// // Schema for updating an existing project (all fields are optional)
// export const updateProjectValidationSchema = z.object({
//   body: createProjectValidationSchema.shape.body.partial(),
// });

// // update
// // Zod schema for the Course object
// const UpdateShoesValidationSchema = z.object({
//   body: z.object({
//     id: z.string().optional(),
//     productName: z.string().optional(),
//     quantity: z.number().optional(), // Assuming you're using strings as ObjectIds, adjust if needed
//     price: z.number().optional(),
//     productDescription: z.string().optional(),

//     brand: z.string().optional(),
//     model: z.string().optional(),
//     size: z.string().optional(),
//     category: z.string().optional(),
//     gender: z.string().optional(),
//     color: z.string().optional(),
//     rawMaterial: z.string().optional(),
//   }),
// });

// export const ShoesValidation = {
//   createProjectValidationSchema
//   // UpdateShoesValidationSchema,
// };
