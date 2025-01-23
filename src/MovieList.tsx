import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MovieListItem, MovieListResponse } from "./lib/Types";
import { useFilterContext } from "./hooks/hooks";
import { getFillers } from "./lib/utils";

const MovieList = () => {
  const key = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [page, setPage] = useState(1);
  const { filterApiQuery } = useFilterContext();
  console.log("filter query in MovieList: ", filterApiQuery);
  const [shouldLoadMoreOnScroll, setShouldLoadMoreOnScroll] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const getMovies = async () => {
      // the API actually returns duplicates sometimes between page 1 & 2 (e.g. movie id 933260), hence error in console
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&sort_by=popularity.desc&with_genres=${filterApiQuery}`,
        { signal: abortController.signal }
      );
      const data = (await res.json()) as MovieListResponse;
      console.log("API movies: ", data);
      setMovies((prev) => [...prev, ...data.results]);
    };
    getMovies();

    return () => {
      abortController.abort();
    };
  }, [key, filterApiQuery, page]);

  useEffect(() => {
    setMovies([]);
    setShouldLoadMoreOnScroll(false);
  }, [filterApiQuery]);

  useEffect(() => {
    const handleScroll = () => {
      console.log(
        "handle scroll ",
        window.innerHeight + document.documentElement.scrollTop,
        document.documentElement.offsetHeight - 400
      );
      // Check if the user has scrolled near the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 400 && // 100px buffer
        shouldLoadMoreOnScroll
      ) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [shouldLoadMoreOnScroll]);

  const fillers = getFillers(movies) || [];
  console.log("movies log", movies);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setShouldLoadMoreOnScroll(true);
  };

  return (
    <>
      <section className="max-w-[917px] mr-4 flex flex-wrap gap-7">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {fillers.map((_, idx) => (
          <div
            key={idx}
            className="w-[180px] border-0 mt-0 h-0 shadow-none"
          ></div>
        ))}
      </section>
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
