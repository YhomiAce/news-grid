
import CategoryFilterItem from "./CategoryFilterItem";

const CategoryFilter = () => {
  return (
    <div className="flex flex-col gap-3">
      <CategoryFilterItem title="Sports" />
      <CategoryFilterItem title="Entertainments" />
      <CategoryFilterItem title="Weather" />
    </div>
  );
};

export default CategoryFilter;
