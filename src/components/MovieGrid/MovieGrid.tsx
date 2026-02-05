import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (Movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : 'https://via.assets.so/img.jpg?w=300&h=450&gradientFrom=56CCF2&gradientTo=2F80ED&gradientAngle=135&text=No+cover+&fontSize=28&f=png';
        return (
          <li key={movie.id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
              <img
                src={posterPath}
                alt={movie.title}
                className={css.poster}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
