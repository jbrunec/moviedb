import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MovieListItem, MovieListResponse } from "./lib/Types";

const MovieList = () => {
  const key = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=1&sort_by=popularity.desc&with_genres=${16}`
      );
      const data = (await res.json()) as MovieListResponse;
      console.log("API movies: ", data);
      setMovies(data.results);
    };
    getMovies();
  }, [key]);

  const fillers = getFillers(movies) || [];

  return (
    <section className="max-w-[1052px] mr-4 flex flex-wrap pl-8">
      {movies.map((movie) => (
        <MovieCard movie={movie} />
      ))}
      {fillers.map(() => (
        <div className="w-[180px] border-0 mt-0 h-0 shadow-none"></div>
      ))}
    </section>
  );
};

const getFillers = (movies: { id: number }[]) => {
  const leftOver = movies.length % 5;
  const noToFill = leftOver > 0 ? 5 - (movies.length % 5) : 0;
  console.log("noToFill ", noToFill);
  if (noToFill) {
    return [...Array(noToFill)].map(() => ({ id: Math.random() * 100 }));
  }
  return [];
};

export default MovieList;
