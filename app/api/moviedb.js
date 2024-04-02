import axios from "axios";
import { apiKey } from '../constants'

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/week?language=en-US?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=en-US?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=en-US?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?language=en-US?api_key=${apiKey}`;
//

//dynamic endpoints
const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}?language=en-US`;
const movieCreditsEndpoint = (id) => `${apiBaseUrl}/movie/${id}/credits?language=en-US`;
const movieSimilarEndpoint = (id) => `${apiBaseUrl}/movie/${id}/similar?language=en-US`;


//persons
const personDetailsEndpoint = (id) => `${apiBaseUrl}/person/${id}?language=en-US`;
const personMoviesEndpoint = (id) => `${apiBaseUrl}/person/${id}/movie_credits?language=en-US`;

//
 
export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null


export const fallbackMoviePoster ='https://www.movienewz.com/img/films/poster-holder.jpg'
export const fallbackPersonImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTNjNjRlMTIwOTBmNGQ0YTllOTQ0NzY5ZWNkZDE3NyIsInN1YiI6IjVlYmFlNjY3YmJlMWRkMDAyMTg4ZjgwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cb5QebrTdS219JoxxompYi8vK6N5ojixHasYWNtZoxw'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {}
    }
}



export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id));
}   

export const fetchMovieSimilar = (id) => { 
    return apiCall(movieSimilarEndpoint(id));
}

export const fetchPersonDetails = (id) => {
    return apiCall(personDetailsEndpoint(id));
}

export const fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id));
}

export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params);
}