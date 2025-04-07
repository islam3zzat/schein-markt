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

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const cartItemSchema = z.object({
  productId: z.string({
    message: "Product is required",
  }),
  name: z.string({
    message: "Name is required",
  }),
  slug: z.string({
    message: "Slug is required",
  }),
  quantity: z.number().int().nonnegative({
    message: "Quantity must be a positive number",
  }),
  image: z.string({
    message: "Image is required",
  }),
  price: z.number().nonnegative({
    message: "Price must be a positive number",
  }),
});

export const cartDraftSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.number().nonnegative(),
  taxPrice: z.number().nonnegative(),
  shippingPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  sessionCartId: z.string({
    message: "Session cart ID is required",
  }),
  userId: z.string().optional(),
});
