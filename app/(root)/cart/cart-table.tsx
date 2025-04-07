"use client";

import { toast } from "sonner";
import { Cart, CartItem } from "@/types/cart";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";

import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartActionButton } from "@/components/product/add-to-cart/cart-action-button";
import { addItemsToCart, removeItemFromCart } from "@/lib/actions/cart-actions";
type Props = {
  cart?: Cart;
};
export const CartTable = ({ cart }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const activeItem = useRef<string>(null);
  const isEmpty = !cart || cart.items.length === 0;
  const header = <h1 className="py-4 h2-bold ">Shopping Cart</h1>;

  const removeFromCartHandler = async (item: CartItem) => {
    const { success, message } = await removeItemFromCart(item.productId);

    if (!success) {
      toast.error(message, {
        className: "bg-red-500 text-white",
        // @ts-expect-error untyped property
        title: <div className="text-destructive">{message}</div>,
      });
      return;
    }
  };

  const addToCartHandler = async (item: CartItem) => {
    const { success, message } = await addItemsToCart(item);

    if (!success) {
      toast.error(message, {
        className: "bg-red-500 text-white",
        // @ts-expect-error untyped property
        title: <div className="text-destructive">{message}</div>,
      });
      return;
    }
  };

  const handleAddToCart = (item: CartItem) => {
    return () => {
      activeItem.current = `${item.slug}:+`;
      startTransition(() => {
        addToCartHandler(item);
      });
    };
  };
  const handleRemoveFromCart = (item: CartItem) => {
    return () => {
      activeItem.current = `${item.slug}:-`;
      startTransition(() => {
        removeFromCartHandler(item);
      });
    };
  };

  if (isEmpty) {
    return (
      <>
        {header}
        <Link href="/" className="flex items-center gap-2 text-primary">
          <ArrowRight className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Link>
      </>
    );
  }
  return (
    <>
      {header}

      <div className="grid md:grid-cols-4 md:gap-5 ">
        <div className="overflow-x-auto md:col-span-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.slug}>
                  <TableCell className="py-2">
                    <Link
                      href={`/product/${item.slug}`}
                      className="flex items-cener"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                      <span className="px-2 flex-center">{item.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center gap-2">
                    <CartActionButton
                      isPending={isPending}
                      currentActiveItem={activeItem}
                      id={`${item.slug}:-`}
                      onClick={handleRemoveFromCart(item)}
                      icon={<Minus className="h-4 w-4" />}
                      variant="outline"
                    />
                    <span className="mx-5">{item.quantity}</span>
                    <CartActionButton
                      isPending={isPending}
                      currentActiveItem={activeItem}
                      id={`${item.slug}:+`}
                      onClick={handleAddToCart(item)}
                      icon={<Plus className="h-4 w-4" />}
                      variant="outline"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {item.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
