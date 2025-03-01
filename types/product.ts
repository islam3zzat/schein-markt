import { z } from "zod";
import { productDraftSchema } from "@/lib/validators";

export type ProductDraft = z.infer<typeof productDraftSchema>;
export type Product = ProductDraft & {
  id: string;
  rating: number;
  createdAt: Date;
};
