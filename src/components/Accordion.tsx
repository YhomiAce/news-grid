import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import { ReactNode } from "react";

interface CustomAccordionProps {
  children: ReactNode;
  label: string;
}

export default function CustomAccordion({ label, children }: CustomAccordionProps) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {label}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
