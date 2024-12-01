import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FaFilter } from "react-icons/fa";
import CustomAccordion from "./Accordion";
import DateFilter from "./DateFilter";
import CategoryFilter from "./CategoryFilter";
import { IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

export default function FilterDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <React.Fragment>
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
          <Box className="rounded-md p-4 flex flex-col gap-3">
            <CustomAccordion label="Filter by Date">
              <DateFilter />
            </CustomAccordion>
            <CustomAccordion label="Filter by Category">
              <CategoryFilter />
            </CustomAccordion>
            <CustomAccordion label="Filter by Sources">
              <CategoryFilter />
            </CustomAccordion>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
