"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Spinner from "./components/Spinner";
import type { OMDbSearchItem } from "@/types/movie";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [movies, setMovies] = useState<OMDbSearchItem[]>([]);

  async function handleSearch(query: string) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setMovies([]);
      } else {
        setMovies(data.Search ?? []);
      }
    } catch {
      setError(
        "Couldn't reach the server. Check your connection and try again.",
      );
      setMovies([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">Movie Search</h1>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && (
        <div className="mt-8" aria-live="polite">
          <Spinner className="h-8 w-8" />
        </div>
      )}

      {error && !isLoading && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {hasSearched && !error && !isLoading && <MovieGrid movies={movies} />}
    </main>
  );
}
