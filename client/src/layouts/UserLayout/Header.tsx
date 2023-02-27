import { FC, useContext, useRef, useState } from "react";
import clsx from "clsx";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaWallet, FaSearch } from "react-icons/fa";
import { GiBeachBag } from "react-icons/gi";
import useClickOutside from "../../hooks/useClickOutside";
import IconButton from "../../components/IconButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { STORAGE } from "../../constants/storage";
import { AuthContext } from "../../App";
import { UserContext } from ".";
import MenuLink from "./MenuLink";

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuSelectRef = useRef<HTMLDivElement>(null);

  const { role, setRole, setToken } = useContext(AuthContext);
  const { totalCartItems } = useContext(UserContext);

  const navigate = useNavigate();

  useClickOutside([menuButtonRef, menuSelectRef], () => setVisibleMenu(false));

  const handleLogOut = () => {
    localStorage.removeItem(STORAGE.TOKEN);
    setRole(null);
    setToken("");
  };

  return (
    <div className="bg-pink-200 py-2 px-4 flex justify-between items-center text-2xl relative">
      <div
        onClick={() => !visibleMenu && setVisibleMenu(true)}
        className="flex cursor-pointer"
      >
        <IconButton ref={menuButtonRef} icon={<AiOutlineUnorderedList />} />
        <div className="text-xl font-bold ml-2">TAKE AWAY</div>
      </div>
      <div className="flex">
        <IconButton icon={<FaWallet />} />
        <div
          className="mx-4 relative cursor-pointer"
          onClick={() => navigate(ROUTES.CART)}
        >
          <IconButton icon={<GiBeachBag />} />
          {!!totalCartItems && (
            <div className="bg-red-500 text-white absolute bottom-0 -right-0.5 text-xs w-3.5 h-3.5 rounded-full flex justify-center items-center">
              {totalCartItems}
            </div>
          )}
        </div>
        <IconButton icon={<FaSearch />} />
      </div>
      <div
        ref={menuSelectRef}
        className={clsx(
          { hidden: !visibleMenu },
          "absolute left-0 top-full bg-pink-50 text-base z-50"
        )}
        onClick={() => setVisibleMenu(false)}
      >
        <MenuLink title="Home" onClick={() => navigate(ROUTES.HOMEPAGE)} />
        {role ? (
          <>
            <MenuLink
              title="Edit Profile"
              onClick={() => navigate(ROUTES.PROFILE)}
            />
            <MenuLink
              title="Order History"
              onClick={() => navigate(ROUTES.TRANSACTION_HISTORY)}
            />
            <MenuLink title="Log out" onClick={handleLogOut} />
          </>
        ) : (
          <MenuLink title="Log in" onClick={() => navigate(ROUTES.LOGIN)} />
        )}
      </div>
    </div>
  );
};

export default Header;
