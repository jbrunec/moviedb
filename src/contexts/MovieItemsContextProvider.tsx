import { useFilterContext } from "@/hooks/hooks";
import { MovieListItem, MovieListResponse } from "@/lib/Types";
import { createContext, ReactNode, useEffect, useState } from "react";

type MovieItemsContextProviderProps = {
  children: ReactNode;
};

type TMovieItemsContext = {
  movieItems: MovieListItem[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleResetMovieList: () => void;
  handleLoadMore: () => void;
  shouldLoadMoreOnScroll: boolean;
};

export const MovieItemsContext = createContext<TMovieItemsContext | null>(null);

export default function MovieItemsContextProvider({
  children,
}: MovieItemsContextProviderProps) {
  const { filterApiQuery } = useFilterContext();
  const [movieItems, setMovieItems] = useState<MovieListItem[]>([]);
  const [page, setPage] = useState(1);
  const [shouldLoadMoreOnScroll, setShouldLoadMoreOnScroll] = useState(false);
  const key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const abortController = new AbortController();
    const getMovies = async () => {
      // the API actually returns duplicates sometimes between page 1 & 2 (e.g. movie id 933260), hence error in console
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&sort_by=popularity.desc&with_genres=${filterApiQuery}`,
        { signal: abortController.signal }
      );
      const data = (await res.json()) as MovieListResponse;
      setMovieItems((prev) => [...prev, ...data.results]);
    };
    getMovies();

    return () => {
      abortController.abort();
    };
  }, [key, filterApiQuery, page]);

  useEffect(() => {
    handleResetMovieList();
    setShouldLoadMoreOnScroll(false);
  }, [filterApiQuery]);

  const handleResetMovieList = () => {
    setMovieItems([]);
  };
  const handleLoadMore = () => {
    setPage((prev) => ++prev);
    setShouldLoadMoreOnScroll(true);
  };

  return (
    <MovieItemsContext.Provider
      value={{
        movieItems,
        page,
        setPage,
        handleResetMovieList,
        handleLoadMore,
        shouldLoadMoreOnScroll,
      }}
    >
      {children}
    </MovieItemsContext.Provider>
  );
}
