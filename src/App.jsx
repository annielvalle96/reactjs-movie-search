import './assets/default-styles/water.css'
import './App.css'
import { useMovies } from './assets/custom-hooks/useMovies'
import { useValidation } from './assets/custom-hooks/useValidation.js'
import { Movies } from './components/Movies.jsx'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App () {
  const [search, setSearch] = useState('')
  const { error, isFirstRender } = useValidation({ search })
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, error, sort })

  // Hacer el debounce: evita que se haga la búsqueda continuamente al escribir en el input.
  // Aplicando useCallback, la función debounce queda memorizada y solo se ejecuta cuando cambie getMovies.
  const debounceGetMovies = useCallback(
    debounce(({ search }) => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies])

  const handleSubmit = (event) => {
    // No recargar la página.
    event.preventDefault()
    // Validar: hacer el proceso del submit solo cuando el valor del campo sea correcto.
    getMovies({ search })
  }

  const handleChange = (event) => {
    // Validar que no se pueda poner espacios vacíos al inicio de la cadena de búsqueda.
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    // 3- Validar que: cuando cargue la página por primera vez, no ocurra la validadcón.
    isFirstRender.current = false
    // Objetivo 7: Haz que la búsqueda se haga automáticamente al escribir.
    // Objetivo 8: Evita que se haga la búsqueda continuamente al escribir (debounce).
    debounceGetMovies({ search: newSearch })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Prueba técnica. Buscar películas</h1>
      </header>
      <aside>
        <form onSubmit={handleSubmit}>
          <input
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            onChange={handleChange}
            value={search}
            placeholder='Avengers, Matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>Buscar</button>
        </form>
        {error !== null && <p style={{ color: 'red' }}>{error}</p>}
      </aside>
      <main>
        {
          loading
            ? <p>Cargando...</p>
            : <Movies movies={movies} search={search} error={error} />
        }
      </main>
    </div>
  )
}
export default App
