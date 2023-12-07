function ListOfMovies ({ movies }) {
  return (
    <ul>{movies.map(movie => (
      <li key={movie.id}>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <img src={movie.poster} alt={`Image of ${movie.title}`} />
      </li>
    ))}
    </ul>
  )
}

function MovieNotFound ({ moviesNotFound }) {
  return (
    // <p>{moviesNotFound[0].error}</p>
    <div>{moviesNotFound.map(movieNotFound => (
      <div key={1}>
        <p>{movieNotFound.error}</p>
      </div>
    ))}
    </div>
  )
}

export function Movies ({ movies, search, error }) {
  if (error == null && search !== '') {
    const hasMovies = movies.length > 1
    return hasMovies
      ? (<ListOfMovies movies={movies} />)
      : (<MovieNotFound moviesNotFound={movies} />)
  }
}
