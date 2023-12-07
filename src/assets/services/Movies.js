const apikey = 'ed41c42f'

export async function searchMovies ({ search }) {
  if (search === '') return
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=${apikey}`)
    const json = await response.json()
    const movies = json.Search
    if (movies) {
      return movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))
    } else {
      return [
        {
          response: json.Response,
          error: json.Error
        }
      ]
    }
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
