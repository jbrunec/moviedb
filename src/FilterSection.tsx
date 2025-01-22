import Filter from "./Filter";

const FilterSection = () => {
  return (
    <section className="flex flex-col justify-start items-center w-[260px] min-w-[260px] bg-slate-300 ml-4">
      <div>Filter one</div>
      <div>Filter two</div>
      <Filter />
    </section>
  );
};

export default FilterSection;
