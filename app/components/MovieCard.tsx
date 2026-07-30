"use client";

import Image from "next/image";
import { useState } from "react";
import type { OMDbSearchItem } from "@/types/movie";

interface MovieCardProps {
  movie: OMDbSearchItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasPoster = !!movie.Poster && movie.Poster !== "N/A";

  const imageSrc =
    hasPoster && !imageError ?
    movie.Poster
    : "/placeholder.jpg"

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[2/3] w-full bg-neutral-100">
        <Image
          src={imageSrc}
          alt={`${movie.Title} poster`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover"
          onError={() => setImageError(true)}
        />
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
