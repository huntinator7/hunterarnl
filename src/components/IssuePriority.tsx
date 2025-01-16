import { FunctionComponent, useEffect, useState } from "react";
import { Tables } from "../types/database.types";
import {
  faAngleDown,
  faAnglesDown,
  faAnglesUp,
  faAngleUp,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  issue: Tables<"issue">;
}

export const IssuePriority: FunctionComponent<Props> = ({ issue }) => {
  const [icon, setIcon] = useState(faAngleUp);
  const [iconColor, setIconColor] = useState("text-lime-600");
  useEffect(() => {
    switch (issue.priority) {
      case 1:
        setIcon(faAnglesDown);
        setIconColor("text-blue-600");
        break;
      case 2:
        setIcon(faAngleDown);
        setIconColor("text-cyan-600");
        break;
      case 4:
        setIcon(faAnglesUp);
        setIconColor("text-amber-600");
        break;
      case 5:
        setIcon(faFire);
        setIconColor("text-red-600");
        break;
      case 3:
      default:
        setIcon(faAngleUp);
        setIconColor("text-lime-600");
    }
  }, [issue.priority]);
  return (
    <a
      className={`${iconColor} flex justify-center items-center bg-neutral-700 h-full w-full rounded-lg hover:cursor-pointer`}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </a>
  );
};
