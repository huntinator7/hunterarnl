import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSidebar } from "../store/useSidebar";

export function Topbar() {
  const { toggle } = useSidebar();
  return (
    <div className="flex w-full bg-neutral-700 h-16">
      <button className="h-full bg-transparent" onClick={toggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
}
