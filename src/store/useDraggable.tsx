import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface DraggableContext {
  parents: HTMLDivElement[];
  addParent: (newParent: HTMLDivElement) => void;
}

export const DraggableProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [parents, setParents] = useState<HTMLDivElement[]>([]);

  function addParent(newParent: HTMLDivElement) {
    setParents([...parents, newParent]);
  }
  const store = { parents, addParent };

  return (
    <DraggableContext.Provider value={store}>
      {children}
    </DraggableContext.Provider>
  );
};

const DraggableContext = createContext({} as DraggableContext);

export const useDraggable = () => {
  return useContext(DraggableContext);
};
