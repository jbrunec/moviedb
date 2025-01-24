import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useFilterContext, useMovieItemsContext } from "./hooks/hooks";
import { getFillers } from "./lib/utils";

const MovieList = () => {
  const { movieItems, setPage, handleLoadMore, shouldLoadMoreOnScroll } =
    useMovieItemsContext();
  const { filterSubmitBtn, handleSubmitFilter, isFilterDirty } =
    useFilterContext();
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled near the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 400 && // 400px buffer
        shouldLoadMoreOnScroll
      ) {
        setPage((prevPage) => ++prevPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldLoadMoreOnScroll, setPage]);

  useEffect(() => {
    const handleScroll = () => {
      const button = filterSubmitBtn.current;
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        const isButtonOutOfView = buttonRect.top < 0; // Check if the button is above the viewport
        setIsDocked(isButtonOutOfView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filterSubmitBtn]);

  const fillers = getFillers(movieItems) || [];

  return (
    <>
      <section className="max-w-[917px] mr-4 flex flex-wrap gap-7">
        {movieItems.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {fillers.map((_, idx) => (
          <div
            key={idx}
            className="w-[180px] border-0 mt-0 h-0 shadow-none"
          ></div>
        ))}
      </section>
      {isDocked && isFilterDirty && (
        <button
          id="filter-btn"
          className="fixed bottom-0 right-0 w-full h-10 bg-moviedbBlue hover:bg-moviedbBlue/80 text-white font-semibold text-lg"
          onClick={handleSubmitFilter}
        >
          Search
        </button>
      )}
      {!shouldLoadMoreOnScroll && (
        <button
          onClick={handleLoadMore}
          className="max-w-[917px] h-10 bg-moviedbBlue hover:bg-moviedbBlue/80 rounded-lg text-white font-semibold text-lg"
        >
          Load more
        </button>
      )}
    </>
  );
};

export default MovieList;
