import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="px-8 w-full">
        <Outlet />
      </div>
    </div>
  );
};
