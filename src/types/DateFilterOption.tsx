export enum DateFilterOption {
  BETWEEN = "between",
  GREATER_THAN = "greater_than",
  LESS_THAN = "less_than",
  IS_EQUAL = "is_equal",
}

export interface DateFilterState {
  criteria: DateFilterOption;
  from: string;
  to?: string;
}

export interface FIlters {
  dateFilter?: DateFilterState;
  sourceFilters: string[];
  categoryFilters: string[];
}
