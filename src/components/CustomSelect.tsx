
export interface SelectOptions {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOptions[];
  label: string;
}

const CustomSelect = ({ label, options }: SelectProps) => {
  return (
    <select className="select select-bordered w-full max-w-xs">
      <option disabled selected>
        {label}
      </option>
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
