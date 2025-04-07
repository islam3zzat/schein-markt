import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  isPending: boolean;
  actionType: "+" | "-";
  currentAction: React.RefObject<"+" | "-" | null>;
  onClick: () => void;
  icon: ReactNode;
  className?: string;
  variant?: "default" | "outline";
};

export const CartActionButton = ({
  isPending,
  actionType,
  currentAction,
  onClick,
  icon,
  className = "h-3 w-3 rounded-xl",
  variant = "default",
}: Props) => {
  const showLoader = isPending && currentAction.current === actionType;

  return (
    <Button onClick={onClick} className={className} variant={variant}>
      {showLoader ? <Loader className="h-3 w-3 animate-spin" /> : icon}
    </Button>
  );
};
