import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";

type GenreListResponse = {
  genres: GenreItem[];
};
type GenreItem = {
  id: string;
  name: string;
};

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
    <div className="p-4 w-full bg-white shadow-lg rounded-lg">
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
                className="border-solid rounded-full text-xs"
              >
                {g.name}
              </ToggleGroupItem>
            ))}
        </ToggleGroup>
      </div>
    </div>
    // <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
    //   <div className="grid grid-cols-2 gap-4">

    //   </div>
    // </div>
  );
};

export default Filter;
