
import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch movie details
        const movieResponse = await fetch(
          `${API_BASE_URL}/movie/${movieId}?append_to_response=videos`,
          API_OPTIONS
        );

        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Find YouTube trailer
        if (movieData.videos && movieData.videos.results) {
          const youtubeTrailer = movieData.videos.results.find(
            (video) => video.site === 'YouTube' && video.type === 'Trailer'
          );
          setTrailer(youtubeTrailer);
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return { movie, trailer, isLoading, error };
};
