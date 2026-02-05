import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  function onSelect(movie: Movie) {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function onClose() {
    setSelectedMovie(null);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  async function handleSubmit(query: string) {
    setLoading(true);
    setErrorMessage(null);
    try {
      const movies = await fetchMovies(query);
      if (movies.length === 0) {
        setLoading(false);
        setMovies([]);
        toast.error('No film found');
      } else {
        setMovies(movies);
        setLoading(false);
      }
    } catch (e: any) {
      setErrorMessage(e.message || 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}

      {movies.length > 0 && <MovieGrid movies={movies} onSelect={onSelect} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={onClose} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
