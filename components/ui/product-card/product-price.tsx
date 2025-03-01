import { cn } from "@/lib/utils";

type Props = { stock: number; price: number; className?: string };
export const ProductPrice = ({ stock, price, className }: Props) => {
  if (stock === 0) {
    return <p className="text-destructive">Out of stock</p>;
  }

  const [wholePart, fractionsPart] = Number(price).toFixed(2).split(".");

  return (
    <p className={cn("text-3xl", className)}>
      <span className="text-xs align-super">$</span>
      {wholePart}
      <span className="text-xs align-super">.{fractionsPart}</span>
    </p>
  );
};
