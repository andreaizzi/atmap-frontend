import { Coordinate } from "@/types";

export const distance = (a: Coordinate, b: Coordinate): number => {
  const dx = a.lng - b.lng;
  const dy = a.lat - b.lat;
  return Math.sqrt(dx * dx + dy * dy);
};

export const minutesSinceMidnight = (date: Date): number => {
  return date.getHours() * 60 + date.getMinutes();
};

export const secondsSinceMidnight = (date: Date): number => {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export const roundToNearestMinute = (date: Date): Date => {
  const roundedDate = new Date(date);
  roundedDate.setSeconds(0, 0);
  return roundedDate;
};