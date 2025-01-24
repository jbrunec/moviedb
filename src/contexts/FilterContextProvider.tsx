import { createContext, ReactNode, useRef, useState } from "react";

type FilterContextProviderProps = {
  children: ReactNode;
};

type TFilterContext = {
  selectedGenre: string[];
  filterApiQuery: string;
  handleChangeFilterQuery: (values: string[]) => void;
  handleSubmitFilter: () => void;
  filterSubmitBtn: React.MutableRefObject<HTMLButtonElement | null>;
  isFilterDirty: boolean;
};

export const FilterContext = createContext<TFilterContext | null>(null);

export default function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [filterApiQuery, setFilterApiQuery] = useState<string>("");
  const [isFilterDirty, setIsFilterDirty] = useState(false);

  const handleChangeFilterQuery = (newValues: string[]) => {
    setSelectedGenre(newValues);
    setIsFilterDirty(true);
  };

  const handleSubmitFilter = () => {
    setFilterApiQuery(selectedGenre.join("|") || "");
  };

  const filterSubmitBtn = useRef<HTMLButtonElement | null>(null);

  return (
    <FilterContext.Provider
      value={{
        selectedGenre,
        filterApiQuery,
        handleChangeFilterQuery,
        handleSubmitFilter,
        filterSubmitBtn,
        isFilterDirty,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
