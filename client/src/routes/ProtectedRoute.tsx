import { FC, ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext, Role } from "../App";
import { ROUTES } from "../constants/routes";

interface IProps {
  roles?: Role[];
  children: ReactNode;
}

const ProtectedRoute: FC<IProps> = ({ roles, children }) => {
  const { pathname } = useLocation();

  const { verified, role } = useContext(AuthContext);

  return verified ? (
    role ? (
      !roles || roles.includes(role) ? (
        <>{children}</>
      ) : (
        <Navigate to={ROUTES.UNAUTHORIZED} replace />
      )
    ) : (
      <Navigate to={ROUTES.LOGIN} state={{ from: pathname }} />
    )
  ) : (
    <></>
  );
};

export default ProtectedRoute;
