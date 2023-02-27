import { forwardRef, ReactNode } from "react";
import clsx from "clsx";

interface IProps {
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

const IconButton = forwardRef<HTMLButtonElement, IProps>(
  ({ icon, className, onClick }, ref) => {
    return (
      <button
        className={clsx("bg-transparent border-none", className)}
        onClick={onClick}
        ref={ref}
      >
        {icon}
      </button>
    );
  }
);

export default IconButton;
