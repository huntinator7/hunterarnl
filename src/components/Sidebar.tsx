import { useEffect, useState } from "react";
import { Link } from "react-router";

const SidebarLink = (props: {
  to: string;
  label: string;
  expanded: boolean;
}) => {
  useEffect(() => {
    console.log(props.expanded);
  }, [props.expanded]);
  return (
    <Link to={props.to}>
      <div
        className={`w-full h-16 bg-emerald-900 text-3xl text-emerald-100 px-5 flex items-center hover:bg-emerald-600`}
      >
        <span>
          {props.expanded ? props.label : props.label.substring(0, 1)}
        </span>
      </div>
    </Link>
  );
};

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className={`flex flex-col h-full ${expanded ? "w-[400px]" : "w-16"} transition-all flex-grow`}>
      <button className="h-16" onClick={() => setExpanded(!expanded)}>
        {expanded ? "-" : "+"}
      </button>
      <SidebarLink to="/" label="Home" expanded={expanded} />
      <SidebarLink to="/board" label="Boards" expanded={expanded} />
      <SidebarLink to="/lifting" label="Lifting" expanded={expanded} />
    </div>
  );
}
