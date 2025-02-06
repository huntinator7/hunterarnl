import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Tables } from "../types/database.types";
import {
  faAngleDown,
  faAnglesDown,
  faAnglesUp,
  faAngleUp,
  faFire,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import supabase from "../utils/supabase";

interface Props {
  issue: Tables<"issue">;
  withDropdown: boolean;
}

export const IssuePriority: FunctionComponent<Props> = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [issue, setIssue] = useState(props.issue);

  const [icon, setIcon] = useState(faAngleUp);
  const [iconColor, setIconColor] = useState("text-lime-600");

  const iconsKey = useRef<
    Record<number | string, { icon: IconDefinition; color: string }>
  >({
    1: {
      icon: faAnglesDown,
      color: "text-blue-600",
    },
    2: {
      icon: faAngleDown,
      color: "text-cyan-600",
    },
    3: {
      icon: faAngleUp,
      color: "text-lime-600",
    },
    4: {
      icon: faAnglesUp,
      color: "text-amber-600",
    },
    5: {
      icon: faFire,
      color: "text-red-600",
    },
    default: {
      icon: faAngleUp,
      color: "text-lime-600",
    },
  });
  useEffect(() => {
    console.log("in priority effect", issue.priority);
    const newIcon =
      iconsKey.current[issue.priority ?? "default"] ?? iconsKey.current.default;
    setIcon(newIcon.icon);
    setIconColor(newIcon.color);
  }, [issue.priority]);

  async function changePriority(priority: string) {
    console.log(priority);
    setShowDropdown(false);
    const res = await supabase
      .from("issue")
      .update({ priority: Number(priority) })
      .eq("id", issue.id)
      .select();
    if (res.data) setIssue(res.data[0]);
    console.log("in changePriority", issue.priority);
  }
  return (
    <div>
      <a
        className={`${iconColor} flex justify-center items-center bg-neutral-700 h-full w-full rounded-lg hover:cursor-pointer`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
      </a>
      {props.withDropdown && (
        <PriorityDropdown
          change={changePriority}
          icons={Object.entries(iconsKey.current)}
          show={showDropdown}
        />
      )}
    </div>
  );
};

interface DropdownProps {
  icons: [string, { icon: IconDefinition; color: string }][];
  change: (priority: string) => void;
  show: boolean;
}

const PriorityDropdown: FunctionComponent<DropdownProps> = ({
  change,
  icons,
  show,
}) => {
  return (
    <div
      className={`absolute flex flex-col mt-1 overflow-hidden ${
        show ? "h-[250px]" : "h-0"
      } transition-all`}
    >
      {icons
        .filter(([k]) => k !== "default")
        .map(([k, v]) => (
          <a
            key={k}
            className={`${v.color} flex justify-center items-center bg-neutral-700 h-full w-full hover:cursor-pointer p-4 w-[50px]`}
            onClick={() => change(k)}
          >
            <FontAwesomeIcon icon={v.icon} />
          </a>
        ))}
    </div>
  );
};
