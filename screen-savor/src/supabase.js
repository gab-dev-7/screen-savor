import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getTrendingMovies = async () => {
  const { data, error } = await supabase
    .from('searches')
    .select('*')
    .order('count', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }

  return data.map(movie => ({
    $id: movie.id,
    ...movie
  }));
};

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const { error } = await supabase
            .rpc('increment_search_count', {
                search_term: searchTerm,
                p_movie_id: movie.id,
                p_poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                p_title: movie.title
            });

        if (error) {
            console.error('Error updating search count:', error);
        }
    } catch (error) {
        console.error('Error updating search count:', error);
    }
};
