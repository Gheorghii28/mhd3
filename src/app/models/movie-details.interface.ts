export interface MovieDetails {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  selectedDetails?: MovieFormValues;
  userId?: string;
  userName?: string;
  resolved?: boolean;
  resolvedUser: string;
}

export interface MovieFormValues {
  actors: boolean;
  awards: boolean;
  boxOffice: boolean;
  country: boolean;
  genre: boolean;
  language: boolean;
  plot: boolean;
  released: boolean;
  type: boolean;
  writer: boolean;
  year: boolean;
}
