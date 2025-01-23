import { useCallback, useEffect, useRef } from "react";
import { MovieListItem } from "./lib/Types";
import { imageConfig } from "./lib/utils";

type MovieCardProps = {
  movie: MovieListItem;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = `${imageConfig.base_url}${imageConfig.poster_sizes[2]}/${movie.poster_path}`;
  //`https://media.themoviedb.org/t/p/w220_and_h330_face/pwTyeFi2mg0bBoCNysT50xREbQF.jpg`;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const movieRating = Math.floor(movie.vote_average * 10);
  const drawProgressBar = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const size = 40; // Canvas size
      const radius = size / 2 - 4; // Radius of the circle (adjusted for line width)
      const lineWidth = 2.5; // Thickness of the progress bar
      const progress = movie.vote_average / 10; // Progress percentage (75%)
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the background circle (black)
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();

      // Draw the progress arc (green)
      ctx.beginPath();
      const startAngle = -Math.PI / 2; // Start at the top
      const endAngle = startAngle + Math.PI * 2 * progress; // Calculate end angle based on progress
      ctx.arc(size / 2, size / 2, radius, startAngle, endAngle);
      //   ctx.strokeStyle = "#21cc78"; // Green color
      ctx.strokeStyle = movieRating >= 70 ? "#21cc78" : "#d2d531"; // Green color
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    },
    [movie.vote_average, movieRating]
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    drawProgressBar(ctx, canvas);
  }, [drawProgressBar]);

  return (
    <div className="w-[161px] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-1 flex content-start flex-wrap cursor-pointer">
      <div className="w-full h-[242px]">
        <img
          src={imageUrl}
          className="w-full rounded-t-lg"
          alt={movie.original_title}
        />
      </div>
      <div className="flex flex-wrap content-start px-3 pt-7 pb-3 relative w-full">
        <div className="absolute top-[-19px] left-[10px]">
          <div className="relative flex items-center justify-center w-9 h-9 pt-1 pl-1">
            <canvas
              id="progressCanvas"
              width="40"
              height="40"
              className="absolute inset-0"
              ref={canvasRef}
            ></canvas>
            <div className="relative z-10 text-white text-[11px] font-bold">
              {movieRating}%
            </div>
          </div>
        </div>
        <h2 className="relative w-full font-bold text-[14px]">{movie.title}</h2>
        <p className="w-full text-black/50 font-medium">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
