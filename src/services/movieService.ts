import axios from 'axios';
import type { Movie } from '../types/movie';
interface MovieTMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export async function fetchMovies(q: string): Promise<Movie[]> {
  try {
    const response = await axios.get<MovieTMDBResponse>(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          query: q,
          language: 'en-US',
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      },
    );

    return response.data.results;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies');
  }
}
