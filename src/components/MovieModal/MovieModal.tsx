import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ onClose, movie }: ModalProps) {
  const backdrop_path = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.assets.so/img.jpg?w=1000&h=1000&gradientFrom=56CCF2&gradientTo=2F80ED&gradientAngle=135&text=No+cover+&fontSize=28&f=png';
  return createPortal(
    <div>
      <div className={css.backdrop} role="dialog" aria-modal="true">
        <div className={css.modal}>
          <button
            className={css.closeButton}
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
          <img src={backdrop_path} alt={movie.title} className={css.image} />
          <div className={css.content}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
