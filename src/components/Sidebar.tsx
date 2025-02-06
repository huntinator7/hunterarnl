import { Link } from "react-router";
import { useSidebar } from "../store/useSidebar";
import { BrowserView, MobileView } from "react-device-detect";

const SidebarLink = (props: { to: string; label: string }) => {
  const { close } = useSidebar();
  return (
    <Link to={props.to} onClick={close}>
      <div
        className={`w-full h-16 bg-emerald-900 text-3xl text-emerald-100 px-5 flex items-center hover:bg-emerald-600`}
      >
        <span>{props.label}</span>
      </div>
    </Link>
  );
};

const SidebarLinks = () => {
  return (
    <>
      <SidebarLink to="/" label="Home" />
      <SidebarLink to="/board" label="Boards" />
      <SidebarLink to="/lifting" label="Lifting" />
      <SidebarLink to="/nutrition" label="Nutrition" />
    </>
  );
};

export function Sidebar() {
  const { expanded } = useSidebar();
  return (
    <>
      <BrowserView>
        <div
          className={`flex flex-col h-full overflow-hidden ${
            expanded ? "w-[400px]" : "w-0"
          } transition-all flex-grow`}
        >
          <SidebarLinks />
        </div>
      </BrowserView>
      <MobileView>
        <div
          className={`flex flex-col h-full overflow-hidden ${
            expanded ? "w-full" : "w-0"
          } absolute transition-all flex-grow`}
        >
          <SidebarLinks />
        </div>
      </MobileView>
    </>
  );
}
