import {
  createContext,
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface DraggableContext {
  parents: Record<string, MutableRefObject<HTMLDivElement>>;
  addParent: (id: string, element: MutableRefObject<HTMLDivElement>) => void;
}

export const DraggableProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [parents, setParents] = useState<
    Record<string, MutableRefObject<HTMLDivElement>>
  >({});

  function addParent(id: string, element: MutableRefObject<HTMLDivElement>) {
    setParents({ ...parents, [id]: element });
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

