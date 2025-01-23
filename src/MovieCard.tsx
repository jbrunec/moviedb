import { MovieListItem } from "./lib/Types";
import { imageConfig } from "./lib/utils";

type MovieCardProps = {
  movie: MovieListItem;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = `${imageConfig.base_url}${imageConfig.poster_sizes[2]}/${movie.poster_path}`;
  //`https://media.themoviedb.org/t/p/w220_and_h330_face/pwTyeFi2mg0bBoCNysT50xREbQF.jpg`;
  return (
    <div className="w-[180px] h-[393px] rounded-lg mr-2 mt-5 shadow-md border-1 flex">
      <div className="w-full">
        <img
          src={imageUrl}
          className="rounded-t-lg"
          alt={movie.original_title}
        />
      </div>
    </div>
  );
};

export default MovieCard;
