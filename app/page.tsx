"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(query: string) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
      // Result rendering (movie grid) lands in the next
    } catch {
      setError(
        "Couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-neutral-900">Movie Search</h1>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {hasSearched && !error && !isLoading && (
        <p className="text-sm text-neutral-500">
          Search worked — results grid coming in the next PR.
        </p>
      )}
    </main>
  );
}
