import { format } from "date-fns";

export const formatDateByMDY = (date: Date): string => {
  return format(new Date(date), "MMMM d, yyyy");
};
