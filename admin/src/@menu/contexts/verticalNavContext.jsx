'use client'

import { createContext, useCallback, useMemo, useState } from 'react'
const VerticalNavContext = createContext({})
export const VerticalNavProvider = ({ children }) => {
  const [verticalNavState, setVerticalNavState] = useState()
  const updateVerticalNavState = useCallback(values => {
    setVerticalNavState(prevState => ({
      ...prevState,
      ...values
    }))
  }, [])

  const toggleVerticalNav = useCallback(value => {
    setVerticalNavState(prevState => ({
      ...prevState,
      isToggled: value !== undefined ? Boolean(value) : !Boolean(prevState?.isToggled)
    }))
  }, [])

  const verticalNavProviderValue = useMemo(
    () => ({
      ...verticalNavState,
      updateVerticalNavState,
      toggleVerticalNav
    }),
    [verticalNavState, updateVerticalNavState, toggleVerticalNav]
  )

  return <VerticalNavContext.Provider value={verticalNavProviderValue}>{children}</VerticalNavContext.Provider>
}

export default VerticalNavContext
