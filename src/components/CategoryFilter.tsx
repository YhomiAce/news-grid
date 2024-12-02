import CategoryFilterItem from "./CategoryFilterItem";

interface CategoryFilterProps {
  items: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedItems: number[]
}

const CategoryFilter = ({ items, handleChange,selectedItems }: CategoryFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <CategoryFilterItem
          key={index + 1}
          title={item}
          value={index}
          onChange={handleChange}
          isChecked={selectedItems.includes(index)}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
