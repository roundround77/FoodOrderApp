import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import clsx from "clsx";

interface IProps {
  routes: Array<{ title: string; href: string }>;
  title: string;
  className?: string;
}

const Breadcrumb: FC<IProps> = ({ routes, title, className }) => {
  return (
    <div className={clsx("flex items-center", className)}>
      {routes.map((route, index) => (
        <Fragment key={index}>
          <Link key={index} to={route.href}>
            <span className="hover:text-blue-500">{route.title}</span>
          </Link>
          <BsArrowRight className="mx-2" />
        </Fragment>
      ))}
      <span>{title}</span>
    </div>
  );
};

export default Breadcrumb;
