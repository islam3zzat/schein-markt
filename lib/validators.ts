import { z } from "zod";

export const productDraftSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(255, "Slug must be at most 255 characters"),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(255, "Category must be at most 255 characters"),
  brand: z
    .string()
    .min(3, "Brand must be at least 3 characters")
    .max(255, "Brand must be at most 255 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(255, "Description must be at most 255 characters"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z.number().min(0, "Price must be at least 0"),
});

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
