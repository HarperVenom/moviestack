import { TitleType } from "@/lib/types";
import { formatTime } from "./convertTime";

export function calculateTotalDuration(titles: TitleType[]) {
  let totalMinutes = 0;
  titles.forEach((title) => {
    totalMinutes += title.duration;
  });
  return totalMinutes;
}

export function calculateTotalDurationFormatted(titles: TitleType[]) {
  let totalMinutes = 0;
  titles.forEach((title) => {
    totalMinutes += title.duration;
  });
  return formatTime(totalMinutes);
}
