import { PropsWithChildren } from "react";

type FilterContainerProps = PropsWithChildren;

const FilterContainer = ({ children }: FilterContainerProps) => {
  return (
    <section className="flex flex-col justify-start items-center w-[260px] min-w-[260px] ml-4">
      {children}
    </section>
  );
};

export default FilterContainer;
