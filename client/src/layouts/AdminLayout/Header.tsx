import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import { FC, useContext } from "react";
import { AiFillSetting, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { ROUTES } from "../../constants/routes";
import { STORAGE } from "../../constants/storage";

enum MenuActions {
  Setting = "0",
  Signout = "1"
}

interface IProps {
  onOpenMenuDrawer: () => void;
}

const Header: FC<IProps> = ({ onOpenMenuDrawer }) => {
  const { setToken, setRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === MenuActions.Setting) {
      console.log("nothing");
    } else {
      localStorage.removeItem(STORAGE.TOKEN);
      setRole(null);
      setToken("");
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 flex items-center justify-between h-12 px-4 bg-neutral-900 text-white bg-dark lg:px-10 z-50">
      <div className="flex items-center">
        <Link to={ROUTES.HOMEPAGE}>TAKE AWAY</Link>
        <button className="lg:hidden" onClick={onOpenMenuDrawer} />
      </div>
      <div className="flex items-center h-full">
        <Dropdown
          overlay={
            <Menu
              onClick={handleMenuClick}
              items={[
                {
                  label: "Personal settings",
                  key: MenuActions.Setting,
                  icon: <AiFillSetting />
                },
                {
                  type: "divider"
                },
                {
                  label: "Sign out",
                  key: MenuActions.Signout,
                  icon: <AiOutlineLogout />
                }
              ]}
            />
          }
          placement="bottomRight"
        >
          <div className="flex items-center px-3 cursor-pointer">
            <Avatar
              size="small"
              icon={
                <div className="w-full h-full flex justify-center items-center">
                  <AiOutlineUser />
                </div>
              }
            />
            <span className="ml-2">Arthur Morgan</span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
