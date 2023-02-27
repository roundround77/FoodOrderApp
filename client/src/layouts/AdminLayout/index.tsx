import { FC, useState } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminLayout: FC = () => {
  const [visibleMenuDrawer, setVisibleMenuDrawer] = useState<boolean>(false);
  return (
    <>
      <Header onOpenMenuDrawer={() => setVisibleMenuDrawer(true)} />
      <Sidebar
        visibleMenuDrawer={visibleMenuDrawer}
        onCloseDrawer={() => setVisibleMenuDrawer(false)}
      />
      <div className="flex flex-col justify-between pt-12 lg:pl-64 min-h-screen bg-stone-100">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
