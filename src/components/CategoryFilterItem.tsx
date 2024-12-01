import CustomInput from "./CustomInput";

interface CategoryFilterItemProps {
  title: string;
}

const CategoryFilterItem: React.FC<CategoryFilterItemProps> = ({ title }) => {
  return (
    <div className="flex gap-3">
      <CustomInput type="checkbox" className="checkbox checkbox-sm" />
      <h5>{title}</h5>
    </div>
  );
};

export default CategoryFilterItem;
