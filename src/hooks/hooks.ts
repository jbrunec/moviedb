import { FilterContext } from "@/contexts/FilterContextProvider";
import { MovieItemsContext } from "@/contexts/MovieItemsContextProvider";
import { useContext } from "react";

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be use within a FilterContextProvider"
    );
  }
  return context;
}
export function useMovieItemsContext() {
  const context = useContext(MovieItemsContext);
  if (!context) {
    throw new Error(
      "useMovieItemsContext must be use within a MovieItemsContextProvider"
    );
  }
  return context;
}
