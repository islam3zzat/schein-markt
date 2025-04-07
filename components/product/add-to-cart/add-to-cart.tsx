"use client";
import { Button } from "@/components/ui/button";
import { addItemsToCart, removeItemFromCart } from "@/lib/actions/cart-actions";
import { CartItem } from "@/types/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Minus, Trash } from "lucide-react";
type Props = {
  cart?: { items: CartItem[] };
  item: CartItem;
};
export const AddToCart = ({ cart, item }: Props) => {
  const router = useRouter();
  const itemInCart = cart?.items.find(
    (cartItem) => cartItem.productId === item.productId
  );
  const quantity = itemInCart?.quantity || 0;

  const handleRemoveFromCart = async () => {
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

  const handleAddToCart = async () => {
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
        <Button
          variant="outline"
          className="h-3 w-3 rounded-xl"
          onClick={handleRemoveFromCart}
        >
          <Minus className="h-3 w-3" />
        </Button>
      ) : (
        <Button
          variant="outline"
          className="h-3 w-3 rounded-xl"
          onClick={handleRemoveFromCart}
        >
          <Trash className="h-3 w-3 " />
        </Button>
      )}

      <div className="text-lg font-semibold">
        {quantity > 0 ? `in cart (${quantity})` : "Add to cart"}
      </div>
      <Button className="h-3 w-3 rounded-xl" onClick={handleAddToCart}>
        <Plus />
      </Button>
    </div>
  );
};
