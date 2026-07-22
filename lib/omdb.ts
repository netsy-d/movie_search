import {
  OMDbSearchResponse,
  OMDbDetailResponse,
} from "@/types/movie";

const OMDB_BASE_URL = "https://www.omdbapi.com/";

function getApiKey(): string {
  const key = process.env.OMDB_API_KEY;
  if (!key) {
    throw new Error(
      "OMDB_API_KEY is not set. Add it to .env.local (see .env.local.example)."
    );
  }
  return key;
}


export async function searchMovies(
  query: string,
  page = 1
): Promise<OMDbSearchResponse> {
  const params = new URLSearchParams({
    apikey: getApiKey(),
    s: query,
    page: String(page),
  });

  const res = await fetch(`${OMDB_BASE_URL}?${params.toString()}`, {
    // OMDb data doesn't change often; cache briefly to reduce API calls
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`OMDb request failed with status ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch full details for a single title by IMDb ID.
 */
export async function getMovieById(
  imdbID: string
): Promise<OMDbDetailResponse> {
  const params = new URLSearchParams({
    apikey: getApiKey(),
    i: imdbID,
    plot: "full",
  });

  const res = await fetch(`${OMDB_BASE_URL}?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`OMDb request failed with status ${res.status}`);
  }

  return res.json();
}
