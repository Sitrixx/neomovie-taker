interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Company {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface Country {
  iso_3166_1: string;
  name: string;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  production_countries: Country[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Language[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Video {
  type: string;
  id: string;
}

export interface Cast {
  id: number;
  name: string;
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface DataFromMovieFetch {
  data: MovieSearchResponse;
}

export type MovieArray = Movie[];
