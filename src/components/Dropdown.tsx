import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, PropsWithChildren, useState } from "react";

interface Props {
  defaultOpen: boolean;
  title: string;
}

export const Dropdown: FunctionComponent<PropsWithChildren<Props>> = ({
  defaultOpen,
  children,
  title,
}) => {
  const [active, setActive] = useState(defaultOpen);

  return (
    <div className="transition-all flex flex-col w-full mb-4">
      <div className="flex flex-row justify-between bg-neutral-700 px-4 py-2">
        <h3>{title}</h3>
        <button className="bg-transparent" onClick={() => setActive(!active)}>
          <FontAwesomeIcon icon={active ? faCaretUp : faCaretDown} />
        </button>
      </div>
      <div className={`transition-all overflow-clip ${active ? 'max-h-full' : 'max-h-0'}`}>{children}</div>
    </div>
  );
};
