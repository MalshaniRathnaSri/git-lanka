import { useContext } from 'react'
import { VerticalMenuContext } from '../components/vertical-menu/Menu'

const useVerticalMenu = () => {
  const context = useContext(VerticalMenuContext)

  if (context === undefined) {
    throw new Error('Menu Component is required!')
  }

  return context
}

export default useVerticalMenu
