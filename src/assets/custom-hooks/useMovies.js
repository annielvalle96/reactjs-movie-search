import { useRef, useState, useMemo, useCallback } from 'react'
// import withResults from '../data/withResults.json'
// import withoutResults from '../data/withoutResults.json'
import { searchMovies } from '../services/Movies.js'

export function useMovies ({ search, error, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  // De esta forma la función getMovies solo se ejecuta una vez y solo depende del parámetro en cuestión..
  const getMovies = useCallback(async ({ search }) => {
    // No repetir dos veces la misma búsqueda.
    if (search === previousSearch.current) return
    if (error == null && search !== '') {
      try {
        setLoading(true)
        // No repetir dos veces la misma búsqueda.
        const newMovies1 = await searchMovies({ search })
        setMovies(newMovies1)
      } catch (e) {
        throw new Error('Error updating the movies variable')
      } finally {
        setLoading(false)
      }
    }
  }, [])

  // 4ta forma de hacerlo. Usando el hook useMemo retornando un valor.
  // De esta forma el proceso de ordenar las movies solo se ejecutará cuando haya cambios en sort o movies.
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  // return { movies: getSortedMovies(movies), getMovies, loading }
  return { movies: sortedMovies, getMovies, loading }
}
