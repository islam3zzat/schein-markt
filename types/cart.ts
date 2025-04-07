import { cartDraftSchema, cartItemSchema } from "@/lib/validators";
import { z } from "zod";

export type CartDraft = z.infer<typeof cartDraftSchema>;
export type Cart = CartDraft & {
  id: string;
};
export type CartItem = z.infer<typeof cartItemSchema>;
