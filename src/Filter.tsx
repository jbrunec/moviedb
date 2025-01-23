import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { GenreListResponse } from "./lib/Types";

const Filter = () => {
  const key = import.meta.env.VITE_API_KEY;
  const [genreList, setGenreList] = useState<GenreListResponse>({ genres: [] });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`
      );
      const data = (await res.json()) as GenreListResponse;
      console.log(data);
      setGenreList(data);
    };
    getGenres();
  }, [key]);

  console.log(selectedGenres);

  return (
    <div className="p-4 w-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-lg">
      <div>Genre</div>
      <div className="mt-4">
        <ToggleGroup
          type="multiple"
          variant={"outline"}
          className="grid grid-cols-2 gap-2"
          onValueChange={(values: string[]) => setSelectedGenres(values)}
          value={selectedGenres}
        >
          {genreList &&
            genreList.genres.map((g) => (
              <ToggleGroupItem
                value={g.id}
                key={g.id}
                size={"sm"}
                className="border-solid rounded-full text-xs hover:bg-moviedbBlue hover:text-white data-[state=on]:bg-moviedbBlue data-[state=on]:text-white"
              >
                {g.name}
              </ToggleGroupItem>
            ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default Filter;
