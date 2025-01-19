import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface SidebarContext {
  expanded: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const SidebarProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  function open() {
    setExpanded(true);
  }
  function close() {
    setExpanded(false);
  }
  function toggle() {
    console.log("toggle", expanded);
    setExpanded(!expanded);
    console.log("toggle 2", expanded);
  }

  const store = { expanded, open, close, toggle };

  return (
    <SidebarContext.Provider value={store}>{children}</SidebarContext.Provider>
  );
};

const SidebarContext = createContext<SidebarContext>({} as SidebarContext);

export const useSidebar = () => {
  return useContext(SidebarContext);
};
