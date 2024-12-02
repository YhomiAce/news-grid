import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FaFilter } from "react-icons/fa";
import CustomAccordion from "./Accordion";
import DateFilter from "./DateFilter";
import CategoryFilter from "./CategoryFilter";
import { IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";
import Button from "./Button";
import { Fragment, useState } from "react";
import {
  DateFilterOption,
  DateFilterState,
  FIlters,
} from "../types/DateFilterOption";

interface FilterDrawerProps {
  filterArticles: (filters: FIlters) => void;
  clearFliters: () => void;
}

export default function FilterDrawer({
  filterArticles,
  clearFliters,
}: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const [dateFilterState, setDateFilterState] = useState<DateFilterState>({
    criteria: DateFilterOption.BETWEEN,
    from: new Date().toISOString(),
  });
  const [categoryFilters, setCategoryFilters] = useState<number[]>([]);
  const [sourceFilters, setSourceFilters] = useState<number[]>([]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDateFilterState({ ...dateFilterState, [name]: value });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    const value = parseInt(event.target.value);
    if (isSelected) {
      setCategoryFilters([...categoryFilters, value]);
    } else {
      const selectedCategories = [...categoryFilters];
      const elements = selectedCategories.filter((item) => item !== value);
      setCategoryFilters(elements);
    }
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    const value = parseInt(event.target.value);
    if (isSelected) {
      setSourceFilters([...sourceFilters, value]);
    } else {
      const selectedSources = [...sourceFilters];
      const elements = selectedSources.filter((item) => item !== value);
      setSourceFilters(elements);
    }
  };

  const applyFilters = () => {
    const sourceFilter = sourceFilters.map((item) => sources[item]);
    const categoryFilter = categoryFilters.map((item) => categories[item]);
    const filters: FIlters = {
      dateFilter: dateFilterState,
      sourceFilters: sourceFilter,
      categoryFilters: categoryFilter,
    };
    if (filters) {
      filterArticles(filters);
      setOpen(false);
    }
  };

  const clearAppliedFilters = () => {
    clearFliters();
    setCategoryFilters([]);
    setSourceFilters([])
    setDateFilterState({
      criteria: DateFilterOption.BETWEEN,
      from: new Date().toISOString(),
    });
  }

  const sources = ["The Guardian", "The New York Times", "NewsAPI"];

  const categories = ["Sports", "Entertainments", "Weather", "Politics", "Technology"];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Fragment>
        <IconButton onClick={toggleDrawer}>
          <FaFilter className="cursor-pointer" size={25} />
        </IconButton>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: { width: "30%" },
          }}
        >
          <div className="flex justify-start">
            <IconButton onClick={() => setOpen(false)}>
              <MdClose className="cursor-pointer" size={22} />
            </IconButton>
          </div>
          <Box className="rounded-md p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <CustomAccordion label="Filter by Date">
                <DateFilter
                  dateFilterState={dateFilterState}
                  handleChange={handleChange}
                />
              </CustomAccordion>
              <CustomAccordion label="Filter by Category">
                <CategoryFilter
                  items={categories}
                  selectedItems={categoryFilters}
                  handleChange={handleCategoryChange}
                />
              </CustomAccordion>
              <CustomAccordion label="Filter by Sources">
                <CategoryFilter
                  items={sources}
                  selectedItems={sourceFilters}
                  handleChange={handleSourceChange}
                />
              </CustomAccordion>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <Button className="btn btn-sm" onClick={clearAppliedFilters}>
                Clear
              </Button>
              <Button className="btn btn-neutral btn-sm" onClick={applyFilters}>
                Apply
              </Button>
            </div>
          </Box>
        </Drawer>
      </Fragment>
    </div>
  );
}
