import { getMyCart } from "@/lib/actions/cart-actions";
import { CartTable } from "./cart-table";

export const metadata = {
  title: "Cart",
  description: "Your shopping cart",
};
const Cart = async () => {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default Cart;
