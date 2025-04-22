import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzgzZWI1ZGFlMmM5YWU4MTkzNWJjZjI2YzYzZmQwZiIsIm5iZiI6MTc0NTE4MjYxMy4yNjgsInN1YiI6IjY4MDU1Zjk1YzNlOGU3NGI2ZGVlMmRkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x32pi3o9Xc6koCPQr4yK_eHjC3K2VSK5pSBRk6Ve8dI";
  useEffect(() => {
    const loadDefaults = async () => {
      try {
        await fetchDefaultMovies();
      } catch (error) {
        console.error("Error loading default movies:", error);
      }
    };
  
    loadDefaults();
  }, []);

  
  useEffect(() => {
    const loadCartoonMovies = async () => {
      const cartoonTitles = [
        "Minions",
        "The Incredibles",
        "Toy Story",
        "Zootopia",
        "Shrek",
        "Frozen Fever", "Kung Fu Panda",
      "Finding Nemo"
      ];
  
      setLoading(true);
      try {
        const moviePromises = cartoonTitles.map(title =>
          fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&language=en-US&page=1&include_adult=false`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tmdbToken}`,
              Accept: "application/json"
            }
          }).then(res => res.json())
        );
  
        const results = await Promise.all(moviePromises);
  
        // Get the first result of each title
        const cartoonMovies = results
          .map(result => result.results?.[0])
          .filter(Boolean); // remove undefined if any title fails
  
        setMovies(cartoonMovies);
      } catch (err) {
        console.error("Error loading cartoon movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
  
    loadCartoonMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
  
    setMovies([]);
    setLoading(true);
    setNoResults(false);
  
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tmdbToken}`,
          Accept: "application/json"
        }
      });
  
      const data = await res.json();
  
      // 2-second delay before setting results and stopping the spinner
      setTimeout(() => {
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          setNoResults(false);
        } else {
          setMovies([]);
          setNoResults(true);
        }
        setLoading(false);
      }, 2000);
  
    } catch (err) {
      console.error("Error fetching data from TMDB:", err);
      setNoResults(true);
      setLoading(false); // No delay here since it's a fallback case
    }
  };
  const navigate = useNavigate();

  const handleFindOutMore = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  
  return (
  <div>
  <div className="hero">
    <div className="hero-content">
      <h1 className="hero-title">
        Ticket<span className="plus">+</span>
      </h1>
      <p className="hero-subtitle">
        With over 3000 movies on <span className="highlight">Ticket+</span>, the possibilities are endless!
      </p>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  </div>

  <div className="movie-container">
    {loading ? (
       <div className="spinner-container">
       <div className="dot-spinner"></div>
     </div>
    ) : noResults ? (
      <p className="no-results-text">No movies found for "{searchTerm}"</p>
    ) : (
      movies.slice(0,6).map((movie, index) => (
        <div key={index} className="movie-card">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-overlay">
            <h3 className="movie-title">{movie.title}</h3>
            <button
              className="find-out-btn"
              onClick={() => handleFindOutMore(movie.id)}
            >
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