import React, { useEffect, useState } from 'react';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 9;

    useEffect(() => {
        fetch('https://dummyapi.online/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data));
    }, []);

    // Calculate the indexes for the current page
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(movies.length / moviesPerPage);

    return (
        <div>
            <div>
                {currentMovies.map(movie => (
                    <div key={movie.id}>
                        <h2>{movie.movie}</h2>
                        <img src={movie.image} alt={movie.movie} />
                        <p>Rating: {movie.rating}</p>
                        <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">IMDB</a>
                    </div>
                ))}
            </div>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoviesList;
