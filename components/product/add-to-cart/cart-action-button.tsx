import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  isPending: boolean;
  id: string;
  currentActiveItem: React.RefObject<string | null>;
  onClick: () => void;
  icon: ReactNode;
  className?: string;
  variant?: "default" | "outline";
};

export const CartActionButton = ({
  isPending,
  id: actionType,
  currentActiveItem: currentAction,
  onClick,
  icon,
  className = "h-4 w-4 rounded-xl",
  variant = "default",
}: Props) => {
  const showLoader = isPending && currentAction.current === actionType;

  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      className={className}
      variant={variant}
    >
      {showLoader ? <Loader className="h-4 w-4 animate-spin" /> : icon}
    </Button>
  );
};
