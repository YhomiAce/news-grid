import CustomSelect, { SelectOptions } from "./CustomSelect";
import { DateFilterOption, DateFilterState } from "../types/DateFilterOption";
import CustomInput from "./CustomInput";

interface DateFilterProps {
  dateFilterState: DateFilterState;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const DateFilter = ({ dateFilterState, handleChange }: DateFilterProps) => {
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

  const { criteria, from, to } = dateFilterState;

  return (
    <div className="flex flex-col gap-3">
      <CustomSelect
        label="Select a Filter criteria"
        options={datePickerOptions}
        name="criteria"
        value={criteria}
        onChange={handleChange}
      />
      <CustomInput
        type="date"
        className="p-2 rounded-md border"
        label="Start Date"
        name="from"
        value={from}
        onChange={handleChange}
      />
      {criteria === DateFilterOption.BETWEEN && (
        <CustomInput
          type="date"
          className="p-2 rounded-md border"
          label="End Date"
          name="to"
          value={to}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default DateFilter;
