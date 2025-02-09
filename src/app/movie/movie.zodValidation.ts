import { z } from 'zod';

// Define the Zod schema for review validation
const reviewValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating cannot exceed 5' }),
  comment: z.string().min(1, { message: 'Comment cannot be empty' }),
});

// Define the Zod schema for movie validation
const movieValidationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  releaseDate: z
    .string()
    .datetime({ message: 'Invalid datetime string! Must be UTC.' }),
  genre: z.string().min(1, { message: 'Genre is required' }),
  reviews: z.array(reviewValidationSchema).default([]),
  slug: z.string().optional(),
  viewCount: z.number().int().nonnegative().default(0),
  isDeleted: z.boolean().optional(),
});
export default movieValidationSchema;
