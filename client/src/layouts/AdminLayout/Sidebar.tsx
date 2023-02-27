import { Drawer, Menu, MenuProps } from "antd";
import { FC } from "react";
import {
  RiFileUserFill,
  RiInboxArchiveLine,
  RiRestaurant2Fill,
  RiShoppingCartFill
} from "react-icons/ri";
import { ROUTES } from "../../constants/routes";
import { useNavigate, matchPath, useLocation } from "react-router-dom";

enum SidebarMenues {
  ManageCustomer = "Manage customers",
  ManageOrder = "Manage order",
  ManageRestaurants = "Manage restaurants",
  ManageFoods = "Manage foods"
}
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const MENUES: MenuItem[] = [
  getItem(
    SidebarMenues.ManageOrder,
    SidebarMenues.ManageOrder,
    <RiShoppingCartFill />
  ),
  getItem(
    SidebarMenues.ManageRestaurants,
    SidebarMenues.ManageRestaurants,
    <RiRestaurant2Fill />
  ),
  getItem(
    SidebarMenues.ManageFoods,
    SidebarMenues.ManageFoods,
    <RiInboxArchiveLine />
  ),
  getItem(
    SidebarMenues.ManageCustomer,
    SidebarMenues.ManageCustomer,
    <RiFileUserFill />
  )
];

interface IProps {
  visibleMenuDrawer: boolean;
  onCloseDrawer: () => void;
}

const Sidebar: FC<IProps> = ({ visibleMenuDrawer, onCloseDrawer }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChangeRoute = (key: string) => {
    switch (key) {
      case SidebarMenues.ManageCustomer:
        navigate(ROUTES.MANAGE_USER);
        break;
      case SidebarMenues.ManageRestaurants:
        navigate(ROUTES.MANAGE_RESTAURANT);
        break;
      case SidebarMenues.ManageFoods:
        navigate(ROUTES.MANAGE_FOOD);
        break;
      case SidebarMenues.ManageOrder:
        navigate(ROUTES.MANAGE_ORDER);
        break;
      default:
        break;
    }
  };

  const getMatchRoute = () => {
    return matchPath(ROUTES.MANAGE_USER, pathname)
      ? [SidebarMenues.ManageCustomer]
      : matchPath(ROUTES.MANAGE_RESTAURANT, pathname)
      ? [SidebarMenues.ManageRestaurants]
      : matchPath(ROUTES.MANAGE_FOOD, pathname)
      ? [SidebarMenues.ManageFoods]
      : matchPath(ROUTES.MANAGE_ORDER, pathname)
      ? [SidebarMenues.ManageOrder]
      : [];
  };

  return (
    <>
      <Menu
        style={{ width: 256 }}
        selectedKeys={getMatchRoute()}
        mode="inline"
        items={MENUES}
        className="h-full"
        rootClassName="fixed bottom-0 left-0 overflow-y-auto w-64 top-12 hidden lg:block"
        onSelect={({ key }) => handleChangeRoute(key)}
      />
      <Drawer
        placement="left"
        closable={false}
        onClose={onCloseDrawer}
        visible={visibleMenuDrawer}
        forceRender
        contentWrapperStyle={{ width: "fit-content" }}
        className="custom-menu-drawer"
      >
        <Menu
          style={{ width: 256 }}
          selectedKeys={getMatchRoute()}
          mode="inline"
          items={MENUES}
          className="h-full"
          onSelect={({ key }) => handleChangeRoute(key)}
        />
      </Drawer>
    </>
  );
};

export default Sidebar;
