import { FilterContext } from "@/contexts/FilterContextProvider";
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
