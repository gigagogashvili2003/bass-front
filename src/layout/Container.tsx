import { FC } from "common/types";

export const Container: FC<{}> = (props) => {
  return <div className="w-full h-screen">{props.children}</div>;
};
