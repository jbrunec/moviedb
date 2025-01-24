import Filter from "./Filter";
import FilterContainer from "./FilterContainer";
import { useFilterContext } from "./hooks/hooks";

const FilterSection = () => {
  const { handleSubmitFilter, filterSubmitBtn, isFilterDirty } =
    useFilterContext();
  return (
    <FilterContainer>
      <Filter />
      <button
        id="filter-btn"
        ref={filterSubmitBtn}
        onClick={handleSubmitFilter}
        disabled={!isFilterDirty}
        className="w-full mt-5 h-10 bg-moviedbBlue hover:bg-moviedbBlueDark rounded-3xl text-white font-semibold text-lg disabled:bg-slate-200 disabled:text-gray-600"
      >
        Search
      </button>
    </FilterContainer>
  );
};

export default FilterSection;
