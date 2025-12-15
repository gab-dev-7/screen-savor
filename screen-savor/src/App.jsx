import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import { getTrendingMovies, updateSearchCount } from './supabase.js';
import { useMovies } from './useMovies.js';

const HomePage = () => {
  const {
    searchTerm,
    setSearchTerm,
    errorMessage,
    movieList,
    isLoading,
    debounceSearchTerm,
  } = useMovies();
  const [trendingMovies, setTrendingMovies] = useState([]);

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    if (debounceSearchTerm.trim() && movieList.length > 0) {
      updateSearchCount(debounceSearchTerm, movieList[0]);
    }
  }, [debounceSearchTerm, movieList]);

  return (
    <>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id || index}>
                  <p>{index + 1}</p>
                  <img
                    src={movie.poster_url || '/no-movie.png'}
                    alt={movie.title || `Trending movie ${index + 1}`}
                    onError={(e) => {
                      e.target.src = '/no-movie.png';
                    }}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>{debounceSearchTerm ? 'Search Results' : 'Popular Movies'}</h2>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500 text-center py-8">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

const App = () => {
  return (
    <main className="min-h-screen relative bg-primary">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </main>
  );
};

export default App;
