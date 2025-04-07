"use client";
import { Button } from "@/components/ui/button";
import { addItemsToCart, removeItemFromCart } from "@/lib/actions/cart-actions";
import { CartItem } from "@/types/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Minus, Trash } from "lucide-react";
import { useRef, useTransition } from "react";
import { CartActionButton } from "./cart-action-button";
type Props = {
  cart?: { items: CartItem[] };
  item: CartItem;
};
export const AddToCart = ({ cart, item }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const action = useRef<"+" | "-" | null>(null);
  const itemInCart = cart?.items.find(
    (cartItem) => cartItem.productId === item.productId
  );
  const quantity = itemInCart?.quantity || 0;

  const removeFromCartHandler = async () => {
    const { success, message } = await removeItemFromCart(item.productId);

    if (!success) {
      toast.error(message, {
        className: "bg-red-500 text-white",
        // @ts-expect-error untyped property
        title: <div className="text-destructive">{message}</div>,
      });
      return;
    }

    toast.success(`${item.name} removed from cart`, {
      action: {
        label: (
          <div
            className="bg-primary text-white hover:bg-gray-800"
            aria-label="Go to cart"
          >
            Go To Cart
          </div>
        ),
        onClick: () => router.push("/cart"),
      },
    });
  };

  const addToCartHandler = async () => {
    const { success, message } = await addItemsToCart(item);

    if (!success) {
      toast.error(message, {
        className: "bg-red-500 text-white",
        // @ts-expect-error untyped property
        title: <div className="text-destructive">{message}</div>,
      });
      return;
    }
    toast.success(`${item.name} added to cart`, {
      action: {
        label: (
          <div
            className="bg-primary text-white hober:bg-gray-800"
            aria-label="Go to cart"
          >
            Go To Cart
          </div>
        ),
        onClick: () => router.push("/cart"),
      },
    });
  };

  const handleAddToCart = () => {
    action.current = "+";
    startTransition(addToCartHandler);
  };
  const handleRemoveFromCart = () => {
    action.current = "-";
    startTransition(removeFromCartHandler);
  };

  if (quantity === 0) {
    return (
      <Button onClick={handleAddToCart} className="w-full">
        Add to cart
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {quantity > 1 ? (
        <CartActionButton
          isPending={isPending}
          currentAction={action}
          actionType="-"
          onClick={handleRemoveFromCart}
          icon={<Minus className="h-3 w-3" />}
          variant="outline"
        />
      ) : (
        <CartActionButton
          isPending={isPending}
          currentAction={action}
          actionType="-"
          onClick={handleRemoveFromCart}
          icon={<Trash className="h-3 w-3" />}
          variant="outline"
        />
      )}

      <div className="text-lg font-semibold">
        {quantity > 0 ? `in cart (${quantity})` : "Add to cart"}
      </div>
      <CartActionButton
        isPending={isPending}
        currentAction={action}
        actionType="+"
        onClick={handleAddToCart}
        icon={<Plus className="h-3 w-3" />}
      />
    </div>
  );
};
