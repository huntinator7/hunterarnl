import { FunctionComponent } from "react";
import { BrowserView, MobileView } from "react-device-detect";

interface Props {
  text: string;
}

export const Title: FunctionComponent<Props> = ({ text }) => {
  return (
    <>
      <BrowserView>
        <h1 className="text-3xl px-4 py-2 bg-amber-600">{text}</h1>
      </BrowserView>
      <MobileView>
        <h1 className="text-3xl px-4 py-2 bg-amber-600">{text}</h1>
      </MobileView>
    </>
  );
};
