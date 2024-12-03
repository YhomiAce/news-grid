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
import { categories, sources } from "../utils/constants";

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
    criteria: {} as DateFilterOption,
    from: "",
    to: undefined,
  });
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [sourceFilters, setSourceFilters] = useState<string[]>([]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDateFilterState({ ...dateFilterState, [name]: value });
  };
  // Utility function to handle changes
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedFilters: string[],
    setFilters: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const isSelected = event.target.checked;
    const value = event.target.value;

    if (isSelected) {
      setFilters([...selectedFilters, value]);
    } else {
      const updatedFilters = selectedFilters.filter((item) => item !== value);
      setFilters(updatedFilters);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(event, categoryFilters, setCategoryFilters);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(event, sourceFilters, setSourceFilters);
  };

  const applyFilters = () => {
    const filters: FIlters = {
      dateFilter: dateFilterState,
      sourceFilters,
      categoryFilters,
    };
    if (filters) {
      filterArticles(filters);
      setOpen(false);
    }
  };

  const clearAppliedFilters = () => {
    clearFliters();
    setCategoryFilters([]);
    setSourceFilters([]);
    setDateFilterState({
      criteria: DateFilterOption.BETWEEN,
      from: new Date().toISOString(),
    });
  };

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
