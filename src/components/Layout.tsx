import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router";
import { Topbar } from "./Topbar";
import { SidebarProvider } from "../store/useSidebar";

export const Layout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <SidebarProvider>
        <Topbar />
        <div className="flex flex-row justify-center">
          <Sidebar />
          <div className="w-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};
