import CustomInput from "./CustomInput";

interface CategoryFilterItemProps {
  title: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean
}

const CategoryFilterItem: React.FC<CategoryFilterItemProps> = ({
  title,
  value,
  onChange,
  isChecked
}) => {
  return (
    <div className="flex gap-3">
      <CustomInput
        type="checkbox"
        className="checkbox checkbox-sm"
        value={value}
        onChange={onChange}
        checked={isChecked}
      />
      <h5>{title}</h5>
    </div>
  );
};

export default CategoryFilterItem;
