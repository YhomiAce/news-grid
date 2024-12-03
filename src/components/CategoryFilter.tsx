import { CategoryItem } from "../types/Article";
import CategoryFilterItem from "./CategoryFilterItem";

interface CategoryFilterProps {
  items: CategoryItem[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedItems: string[]
}

const CategoryFilter = ({ items, handleChange,selectedItems }: CategoryFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <CategoryFilterItem
          key={index + 1}
          title={item.name}
          value={item.id}
          onChange={handleChange}
          isChecked={selectedItems.includes(item.id)}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
