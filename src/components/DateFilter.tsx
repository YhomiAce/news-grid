import CustomSelect, { SelectOptions } from "./CustomSelect";
import { DateFilterOption } from "../types/DateFilterOption";
import CustomInput from "./CustomInput";

const DateFilter = () => {
  const datePickerOptions: SelectOptions[] = [
    {
      label: "Is Between",
      value: DateFilterOption.BETWEEN,
    },
    {
      label: "Greater Than",
      value: DateFilterOption.GREATER_THAN,
    },
    {
      label: "Less Than",
      value: DateFilterOption.LESS_THAN,
    },
    {
      label: "Is Equal",
      value: DateFilterOption.IS_EQUAL,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <CustomSelect label="Select a Date Range" options={datePickerOptions} />
      <CustomInput
        type="date"
        className="p-2 rounded-md border"
        label="Start Date"
      />
      <CustomInput
        type="date"
        className="p-2 rounded-md border"
        label="End Date"
      />
    </div>
  );
};

export default DateFilter;
