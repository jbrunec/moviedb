import { createContext, ReactNode, useState } from "react";

type FilterContextProviderProps = {
  children: ReactNode;
};

type TFilterContext = {
  selectedGenre: string[];
  filterApiQuery: string;
  handleChangeFilterQuery: (values: string[]) => void;
};

export const FilterContext = createContext<TFilterContext | null>(null);

export default function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

  const handleChangeFilterQuery = (newValues: string[]) => {
    setSelectedGenre(newValues);
  };
  const filterApiQuery = selectedGenre.join("|") || "";

  return (
    <FilterContext.Provider
      value={{ selectedGenre, filterApiQuery, handleChangeFilterQuery }}
    >
      {children}
    </FilterContext.Provider>
  );
}
