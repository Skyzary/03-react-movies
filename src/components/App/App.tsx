import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  function onSelect(movie: Movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
  }

  async function handleSubmit(query: string) {
    setLoading(true);
    const movies = await fetchMovies(query);
    if (movies.length === 0) {
      setLoading(false);
      setMovies([]);
    } else {
      setLoading(false);
      setMovies(movies);
    }
  }

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {movies.length === 0 && <ErrorMessage />}

      {movies.length > 0 && <MovieGrid movies={movies} onSelect={onSelect} />}
      {showModal && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
    </div>
  );
}
