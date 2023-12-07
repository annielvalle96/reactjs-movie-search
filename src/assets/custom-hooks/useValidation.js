import { useEffect, useRef, useState } from 'react'

export function useValidation ({ search }) {
  const [error, setError] = useState(null)
  // 1- Validar que: cuando cargue la página por primera vez, no ocurra la validadcón.
  const isFirstRender = useRef(true)

  const validations = () => {
    // 2- Validar que: cuando cargue la página por primera vez, no ocurra la validadcón.
    if (isFirstRender.current) {
      isFirstRender.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con números')
      return
    }
    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }

  useEffect(() => {
    validations()
  }, [search])

  return { error, isFirstRender }
}
