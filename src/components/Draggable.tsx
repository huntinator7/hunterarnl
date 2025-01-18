import { FunctionComponent, PropsWithChildren, useEffect, useRef } from "react";
import { DraggableProvider } from "../store/useDraggable";

export const DraggableChild = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log("in effect");
    const theRef = divRef.current!;
    // const theParent = theRef.parentElement!;

    theRef.addEventListener("mousedown", mouseDown, false);
    window.addEventListener("mouseup", mouseUp, false);

    function mouseUp() {
      console.log("mouseup");
      // theRef.style.position = "";
      window.removeEventListener("mousemove", move, true);
    }

    function mouseDown() {
      console.log("mousedown");
      theRef.style.position = "absolute";
      window.addEventListener("mousemove", move, true);
    }

    function move(e: MouseEvent) {
      // console.log("move");
      if (theRef) {
        theRef.style.top =
          e.clientY - theRef.getBoundingClientRect().height / 2 + "px";
        theRef.style.left =
          e.clientX - theRef.getBoundingClientRect().width / 2 + "px";
      }
    }
  }, []);
  return (
    <div className="w-[100px] h-[100px] bg-sky-500" ref={divRef}>
      hello
    </div>
  );
};

export const DraggableParent: FunctionComponent<
  PropsWithChildren & { id: string }
> = ({ children, id }) => {
  useEffect(() => {
    if (Array.isArray(children)) {
      console.log(children[0]);
    }
    console.log(children, id);
  }, []);
  return (
    <div className="w-[400px] h-[400px] bg-neutral-600 m-4">{children}</div>
  );
};

export const Draggable: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <DraggableProvider>{children}</DraggableProvider>;
};
