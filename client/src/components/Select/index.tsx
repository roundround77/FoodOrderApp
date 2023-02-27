import clsx from "clsx";
import { FC, HTMLProps } from "react";

interface IProps extends HTMLProps<HTMLSelectElement> {
  placeholder?: string;
  options: Array<{
    title: string;
    value: string | number | readonly string[] | undefined;
  }>;
  className?: string;
}

const Select: FC<IProps> = ({
  placeholder = "",
  options,
  className,
  ...restProps
}) => {
  return (
    <select
      placeholder={placeholder}
      className={clsx(
        "bg-neutral-200 px-2 w-60 py-1 placeholder-black",
        className
      )}
      {...restProps}
    >
      {!!placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
