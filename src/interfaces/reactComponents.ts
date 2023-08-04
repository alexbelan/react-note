import { ReactElement, ReactNode, ReactPortal } from "react";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactNodeElement = ReactNode | ReactChild | ReactNodeArray | ReactPortal |  null | undefined;

export interface PropsChildren {
  children: ReactNodeElement
}