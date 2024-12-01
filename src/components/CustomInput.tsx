interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
};

export default CustomInput;
