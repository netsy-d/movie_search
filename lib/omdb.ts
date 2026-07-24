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

export function getStatusForOMDbError(errorMessage: string): number{
   const message = errorMessage.toLowerCase();

   if (message.includes("api Key")) {
// "Invalid API key!" / "No API key provided."
    return 401;
   }

   if (message.includes("not found") || message.includes("incorrect imdb id")) {

    // "Movie not found!" / "Incorrect IMDb ID."

    return 404;
   }

   if (message.includes("too many results")){

    // Search term is too broad/generic for OMDb to narrow down - this 
    // is a client-side input problem, not a missing resource.

    return 400;
   }

   // Anything else (e.g.  "Error getting data.") is OMDb's own upstream
   // issue, not something the caller's request caused.
     return 502;
}


export async function searchMovies(
  query: string,
  page = 1
): Promise<OMDbSearchResponse> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery){

    return {
      Response: "False",
      Error: "Search query cannot be empty.",
    };
  }


  const params = new URLSearchParams({
    apikey: getApiKey(),
    s: trimmedQuery,
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
  const trimmedQuery =imdbID.trim();

  if (!trimmedQuery) {
    return{
      Response: "False",
      Error: "imdbID cannot be empty.",
    };
  }


  const params = new URLSearchParams({
    apikey: getApiKey(),
    i: trimmedQuery,
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
