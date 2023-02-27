import { FC } from "react";

interface IProps {
  title: string;
  onClick: () => void;
}

const MenuLink: FC<IProps> = ({ title, onClick }) => {
  return (
    <button
      className="w-64 h-20 flex justify-center items-center hover:bg-pink-100"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MenuLink;
