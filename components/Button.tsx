import { FunctionComponent } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
}

const Button: FunctionComponent<ButtonProps> = ({ children, type }) => {
  return (
    <button
      className="bg-green-800 text-gray-100 
      rounded
      px-4 py-2 my-2
    hover:bg-green-700"
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
