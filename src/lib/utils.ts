import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imageConfig = {
  base_url: "http://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

export const getFillers = (movies: { id: number }[]) => {
  const leftOver = movies.length % 5;
  const noToFill = leftOver > 0 ? 5 - leftOver : 0;
  if (noToFill) {
    return [...Array(noToFill)].map(() => ({ id: Math.random() * 100 }));
  }
  return [];
};
