import { FC } from "common/types";

const Main: FC<{}> = (props) => {
  return <main className="h-[calc(100%-4rem)] p-10">{props.children}</main>;
};

export default Main;
