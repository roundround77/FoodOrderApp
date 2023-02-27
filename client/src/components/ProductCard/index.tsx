import { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  imgUrl: string;
  href?: string;
  type?: "restaurant" | "dish";
  onClick?: () => void;
}

const ProductCard: FC<IProps> = ({
  title,
  imgUrl,
  href = "",
  type = "restaurant",
  onClick
}) => {
  const content = (
    <>
      <h2 className="text-sm md:text-base">{title}</h2>
      <div className="aspect-w-1 aspect-h-1 w-full">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
      </div>
    </>
  );

  return type === "restaurant" ? (
    <Link to={href}>{content}</Link>
  ) : (
    <div
      className="flex flex-col justify-between w-full cursor-pointer"
      onClick={onClick}
    >
      {content}
    </div>
  );
};

export default ProductCard;
