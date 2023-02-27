import { createContext, FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { STORAGE } from "../../constants/storage";
import { getListFromStorage } from "../../utils/storage";
import Header from "./Header";

interface IContextProps {
  totalCartItems: number;
  increaseTotalCartItems: () => void;
  decreaseTotalCartItems: () => void;
  resetTotalCartItems: () => void;
}

export const UserContext = createContext<IContextProps>({
  totalCartItems: 0,
  increaseTotalCartItems: () => {},
  decreaseTotalCartItems: () => {},
  resetTotalCartItems: () => {}
});

const UserLayout: FC = () => {
  const [totalCartItems, setTotalCartItems] = useState<number>(0);

  useEffect(() => {
    const dishes = getListFromStorage(STORAGE.DISHES);
    setTotalCartItems(dishes.length);
  }, []);

  return (
    <UserContext.Provider
      value={{
        totalCartItems,
        increaseTotalCartItems: () => setTotalCartItems(totalCartItems + 1),
        decreaseTotalCartItems: () =>
          totalCartItems > 0 && setTotalCartItems(totalCartItems - 1),
        resetTotalCartItems: () => setTotalCartItems(0)
      }}
    >
      <Header />
      <Outlet />
    </UserContext.Provider>
  );
};

export default UserLayout;
