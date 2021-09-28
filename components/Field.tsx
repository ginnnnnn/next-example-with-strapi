import { FunctionComponent } from "react";

interface FieldProps {
  label: string;
}

const Field: FunctionComponent<FieldProps> = ({ label, children }) => {
  return (
    <label className="block my-2">
      <span className="block text-sm text-gray-600 ">{label}</span>
      {children}
    </label>
  );
};

export default Field;
