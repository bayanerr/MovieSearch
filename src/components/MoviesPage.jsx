import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzgzZWI1ZGFlMmM5YWU4MTkzNWJjZjI2YzYzZmQwZiIsIm5iZiI6MTc0NTE4MjYxMy4yNjgsInN1YiI6IjY4MDU1Zjk1YzNlOGU3NGI2ZGVlMmRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x32pi3o9Xc6koCPQr4yK_eHjC3K2VSK5pSBRk6Ve8dI";




  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tmdbToken}`,
          Accept: "application/json"
        }
      });

      const data = await res.json();
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching data from TMDB:", err);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  const handleFindOutMore = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <div>
        <form className="movieForm" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
      
          <div className="movie-container2">
  {loading ? (
    <p className="loading-text">Loading...</p>
  ) : (
    movies.map((movie, index) => (
      <div key={index} className="movie-card">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        )}
        <div className="movie-overlay">
          <h3 className="movie-title">{movie.title}</h3>
          <button className="find-out-btn" onClick={() => handleFindOutMore(movie.id)}>
            Find Out More
          </button>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
};

export default MovieCards;