import { FC } from "react";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";

interface IProps {
  type?: "button" | "submit";
  title: string;
  color?: "pink" | "white";
  border?: boolean;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
}

const Button: FC<IProps> = ({
  type = "button",
  title,
  color = "pink",
  border,
  className,
  loading,
  onClick
}) => {
  return (
    <button
      type={type}
      className={clsx(
        { "bg-pink-200": color === "pink" },
        { "bg-neutral-200": color === "white" },
        { "border border-gray-400": border },
        "px-8 py-2 font-bold relative",
        className
      )}
      onClick={onClick}
    >
      {title}
      {loading && (
        <div className="absolute inset-y-0 left-2 flex items-center">
          <FaSpinner className="animate-spin" />
        </div>
      )}
    </button>
  );
};

export default Button;
