import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzgzZWI1ZGFlMmM5YWU4MTkzNWJjZjI2YzYzZmQwZiIsIm5iZiI6MTc0NTE4MjYxMy4yNjgsInN1YiI6IjY4MDU1Zjk1YzNlOGU3NGI2ZGVlMmRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x32pi3o9Xc6koCPQr4yK_eHjC3K2VSK5pSBRk6Ve8dI";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${tmdbToken}`,
            Accept: 'application/json',
          },
        });
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-detail-container">
      <img
        className="poster"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image'
        }
        alt={movie.title}
      />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p className="meta">
          {movie.release_date} • {movie.runtime} min • {movie.vote_average}/10
        </p>
        <h2>Overview:</h2>
        <p>{movie.overview}</p>
        <button className="watch-button">
          ▶ Watch
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;