import { cartDraftSchema, cartItemSchema } from "@/lib/validators";
import { z } from "zod";

export type CartDraft = z.infer<typeof cartDraftSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
