export interface SelectOptions {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOptions[];
  label: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect = ({ label, options, name, value, onChange }: SelectProps) => {
  return (
    <select
      className="select select-bordered w-full max-w-xs"
      name={name}
      value={value}
      onChange={onChange}
    >
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
