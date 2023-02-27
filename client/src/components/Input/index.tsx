import clsx from "clsx";
import { FC, HTMLProps } from "react";

interface IProps extends HTMLProps<HTMLInputElement> {
  className?: string;
}

const Input: FC<IProps> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "bg-neutral-200 px-3 w-60 py-1 placeholder-black",
        className
      )}
      {...props}
    />
  );
};

export default Input;
