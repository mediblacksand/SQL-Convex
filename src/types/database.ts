export interface MovieData {
  id: number;
  title: string;
  director: string;
  year: number;
  length_minutes: number;
  language?: string;
  worldwide_gross_millions?: number;
}

export interface BoxOfficeData {
  movie_id: number;
  rating: number;
  domestic_sales_millions: number;
  international_sales_millions: number;
}

export interface DatabaseTables {
  movies: MovieData[];
  boxoffice: BoxOfficeData[];
}