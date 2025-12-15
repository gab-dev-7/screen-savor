
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setErrorMessage('No movies found. Try a different search.');
        setMovieList([]);
        return;
      }

      setMovieList(data.results);

      if (query.trim() && data.results.length > 0) {
        // This function is now out of scope, we will handle it in the App.jsx
        // await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
      setMovieList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchTerm !== undefined) {
      fetchMovies(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    errorMessage,
    movieList,
    isLoading,
    debounceSearchTerm,
  };
};
