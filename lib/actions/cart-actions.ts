"use server";

import { CartItem } from "@/types/cart";
import { formatPrismaErrors } from "../error-utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { convertToJsObject, roundToTwoDecimals } from "../utils";
import { cartDraftSchema, cartItemSchema } from "../validators";
import { revalidatePath } from "next/cache";

function checkStock(productStock: number, requiredQuantity: number) {
  if (productStock < requiredQuantity) {
    return {
      success: false,
      message: "Not enough stock",
    };
  }
  return { success: true };
}

function calcPrice(items: CartItem[]) {
  const itemsPrice = roundToTwoDecimals(
    items.reduce((acc, item) => {
      const price = item.price;

      return acc + price * item.quantity;
    }, 0)
  );
  const shippingPrice = roundToTwoDecimals(
    itemsPrice > 100 ? 0 : itemsPrice > 50 ? 10 : 20
  );
  const taxPrice = roundToTwoDecimals(itemsPrice * 0.15);

  const totalPrice = roundToTwoDecimals(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
}
export async function addItemsToCart(data: CartItem) {
  try {
    const appCookies = await cookies();
    const cartSessionId = appCookies.get("sessionCartId")?.value;
    if (!cartSessionId) {
      throw new Error("No cart session id found");
    }
    const session = await auth();
    const userId = session?.user?.id;
    const cart = await getMyCart();

    const item = cartItemSchema.parse(data);
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (!cart) {
      const newCart = cartDraftSchema.parse({
        userId,
        items: [item],
        sessionCartId: cartSessionId,
        ...calcPrice([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);

      return { success: true, message: "Item added to cart" };
    }

    // update cart
    const items: CartItem[] = cart.items.map((item: CartItem) => {
      return {
        ...item,
        price: roundToTwoDecimals(item.price),
      };
    });
    const existingItem = items.find((i) => i.productId === item.productId);

    if (existingItem) {
      const stockCheck = checkStock(
        product.stock,
        existingItem.quantity + item.quantity
      );
      if (!stockCheck.success) {
        return stockCheck;
      }

      existingItem.quantity += item.quantity;
    } else {
      const stockCheck = checkStock(product.stock, item.quantity);
      if (!stockCheck.success) {
        return stockCheck;
      }
      items.push(item);
    }

    const updatedCart = cartDraftSchema.parse({
      ...cart,
      items,
      ...calcPrice(items),
    });

    await prisma.cart.update({
      where: { id: cart.id },
      data: updatedCart,
    });
    revalidatePath(`/product/${product.slug}`);

    return { success: true, message: "Item added to cart" };
  } catch (error) {
    return { success: false, message: formatPrismaErrors(error) };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const appCookies = await cookies();
    const cartSessionId = appCookies.get("sessionCartId")?.value;
    if (!cartSessionId) {
      throw new Error("No cart session id found");
    }
    const cart = await getMyCart();

    if (!cart) {
      return { success: false, message: "Cart not found" };
    }

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let items: CartItem[] = cart.items;
    const item = items.find((i) => i.productId === productId);

    if (!item) {
      return { success: false, message: "Item not found in cart" };
    }

    // decrement quantity if more than 1
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      items = items.filter((i) => i.productId !== productId);
    }
    const updatedCart = cartDraftSchema.parse({
      ...cart,
      items,
      ...calcPrice(items),
    });

    await prisma.cart.update({
      where: { id: cart.id },
      data: updatedCart,
    });

    revalidatePath(`/product/${product.slug}`);
    return { success: true, message: "Item removed from cart" };
  } catch (error) {
    return { success: false, message: formatPrismaErrors(error) };
  }
}
export async function getMyCart() {
  const appCookies = await cookies();
  const sessionCartId = appCookies.get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("No cart session id found");
  }
  const session = await auth();
  const userId = session?.user?.id;

  // user cart from DB
  const filter = userId ? { userId } : { sessionCartId };
  const cart = await prisma.cart.findFirst({
    where: filter,
  });
  if (!cart) return;

  return convertToJsObject(cart);
}
