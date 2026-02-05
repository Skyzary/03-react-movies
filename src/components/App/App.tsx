import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import css from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  function handleSelect(movie: Movie) {
    console.log(movie);
  }

  async function handleSubmit(query: string) {
    const movies = await fetchMovies(query);
    if (movies.length === 0) {
      setMovies([]);
      toast.error('No movies found. Try again.');
    } else {
      setMovies(movies);
    }
  }

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSubmit} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
    </div>
  );
}
