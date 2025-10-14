// MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from './Spinner.jsx';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieDetails = () => {
  const { movieId } = useParams();
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
            video => video.site === 'YouTube' && video.type === 'Trailer'
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <Link to="/" className="text-light-200 hover:text-white underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Movie not found</p>
          <Link to="/" className="text-light-200 hover:text-white underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-primary">
      <div className="pattern" />

      <div className="wrapper">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-light-200 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Movies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <img
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : '/no-movie.png'
              }
              alt={movie.title}
              className="w-full rounded-2xl shadow-lg"
              onError={(e) => {
                e.target.src = '/no-movie.png';
              }}
            />
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>

            {/* Basic Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <img src="/star.svg" alt="Rating" className="w-5 h-5" />
                <span className="text-white font-bold">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </span>
              </div>

              <span className="text-gray-100">•</span>

              <span className="text-gray-100 capitalize">
                {movie.original_language || 'N/A'}
              </span>

              <span className="text-gray-100">•</span>

              <span className="text-gray-100">
                {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
              </span>

              <span className="text-gray-100">•</span>

              <span className="text-gray-100">
                {movie.runtime ? `${movie.runtime} min` : 'N/A'}
              </span>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-light-100/10 text-light-200 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-light-200 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Release Date</h3>
                <p className="text-light-200">
                  {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Budget</h3>
                <p className="text-light-200">
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Revenue</h3>
                <p className="text-light-200">
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Status</h3>
                <p className="text-light-200">{movie.status || 'N/A'}</p>
              </div>
            </div>

            {/* Trailer */}
            {trailer && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${movie.title} Trailer`}
                    className="w-full h-64 md:h-96 rounded-lg"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {!trailer && (
              <div className="text-center py-8">
                <p className="text-gray-100">No trailer available for this movie.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
