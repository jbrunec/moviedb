import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { GenreListResponse } from "./lib/Types";
import { useFilterContext } from "./hooks/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

const Filter = () => {
  const key = import.meta.env.VITE_API_KEY;
  const [genreList, setGenreList] = useState<GenreListResponse>({ genres: [] });
  const { selectedGenre, handleChangeFilterQuery } = useFilterContext();

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`
      );
      const data = (await res.json()) as GenreListResponse;
      setGenreList(data);
    };
    getGenres();
  }, [key]);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="genre"
      className="w-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-lg"
    >
      <AccordionItem value="genre">
        <AccordionTrigger className="text-[17px] font-semibold border-b-[1px] p-4">
          Genre
        </AccordionTrigger>
        <AccordionContent className="mt-4 p-4">
          <ToggleGroup
            type="multiple"
            variant={"outline"}
            className="grid grid-cols-2 gap-2"
            onValueChange={(values: string[]) =>
              handleChangeFilterQuery(values)
            }
            value={selectedGenre}
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
