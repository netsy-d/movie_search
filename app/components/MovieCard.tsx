import Image from "next/image";
import type { OMDbSearchItem } from "@/types/movie";

interface MovieCardProps {
  movie: OMDbSearchItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[2/3] w-full bg-neutral-100">
        {hasPoster ? (
          <Image
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-neutral-400">
            No poster available
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-neutral-900">
          {movie.Title}
        </h3>
        <p className="text-xs text-neutral-500">
          {movie.Year} · <span className="capitalize">{movie.Type}</span>
        </p>
      </div>
    </div>
  );
}
