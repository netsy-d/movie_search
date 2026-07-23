// Shapes returned by the OMDb API (https://www.omdbapi.com)

/** A single item in a search result list (?s=... query) */
export interface OMDbSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string; // URL, or "N/A" if no poster
}

/** Successful response shape for a search query (?s=...) */
export interface OMDbSearchSuccess {
  Search: OMDbSearchItem[];
  totalResults: string;
  Response: "True";
}

/** Full details for a single title (?i=... or ?t=... query) */
export interface OMDbMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: "True";
}

/** Shape OMDb returns for any failed request, e.g. no results / bad key */
export interface OMDbError {
  Response: "False";
  Error: string;
}

export type OMDbSearchResponse = OMDbSearchSuccess | OMDbError;
export type OMDbDetailResponse = OMDbMovieDetail | OMDbError;

/** Type guard helper */
export function isOMDbError(
  res: OMDbSearchResponse | OMDbDetailResponse
): res is OMDbError {
  return res.Response === "False";
}
