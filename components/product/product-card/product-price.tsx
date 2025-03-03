import { cn } from "@/lib/utils";

type Props = { price: number; className?: string };
export const ProductPrice = ({ price, className }: Props) => {
  const [wholePart, fractionsPart] = Number(price).toFixed(2).split(".");

  return (
    <p className={cn("text-3xl", className)}>
      <span className="text-xs align-super">$</span>
      {wholePart}
      <span className="text-xs align-super">.{fractionsPart}</span>
    </p>
  );
};
