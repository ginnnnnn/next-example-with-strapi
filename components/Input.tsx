import { ChangeEventHandler, FunctionComponent } from "react";

interface InputProps {
  type: string;
  value: string;
  required: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FunctionComponent<InputProps> = ({
  type,
  value,
  onChange,
  required,
}) => {
  return (
    <input
      type={type}
      required={required}
      className="border rounded px-3 py-1 w-80"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
