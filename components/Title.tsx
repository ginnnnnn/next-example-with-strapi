import { FunctionComponent } from "react";
interface TitleProps {}

const Title: FunctionComponent<TitleProps> = ({ children }) => {
  return <h1 className="text-2xl pb-4">{children}</h1>;
};

export default Title;
