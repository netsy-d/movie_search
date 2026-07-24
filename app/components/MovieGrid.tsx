import type { OMDbSearchItem } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: OMDbSearchItem[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <p className="mt-8 text-sm text-neutral-500">
        No results to show.
      </p>
    );
  }

  return (
    <div className="grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
