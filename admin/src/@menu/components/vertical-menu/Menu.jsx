'use client'

import { createContext, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { menuClasses } from '../../utils/menuClasses'
import StyledVerticalMenu from '../../styles/vertical/StyledVerticalMenu'
import styles from '../../styles/styles.module.css'
import { verticalSubMenuToggleDuration } from '../../defaultConfigs'

export const VerticalMenuContext = createContext({})

const Menu = (props, ref) => {
  const {
    children,
    className,
    rootStyles,
    menuItemStyles,
    renderExpandIcon,
    renderExpandedMenuItemIcon,
    menuSectionStyles,
    subMenuOpenBehavior = 'accordion', 
    transitionDuration = verticalSubMenuToggleDuration,
    textTruncate = true,
    ...rest
  } = props

  const [openSubmenu, setOpenSubmenu] = useState([])
  const openSubmenusRef = useRef([])
  const pathname = usePathname()

  const toggleOpenSubmenu = useCallback(
    (...submenus) => {
      if (!submenus.length) return
      const openSubmenuCopy = [...openSubmenu]

      submenus.forEach(({ level, label, active = false, id }) => {
        const submenuIndex = openSubmenuCopy.findIndex(submenu => submenu.id === id)
        const submenuExists = submenuIndex >= 0
        const isAccordion = subMenuOpenBehavior === 'accordion'
        const inactiveSubmenuIndex = openSubmenuCopy.findIndex(submenu => !submenu.active && submenu.level === 0)

        if (submenuExists) {
          openSubmenuCopy.splice(submenuIndex, 1)
        }

        if (isAccordion) {
          if (!submenuExists) {
            if (inactiveSubmenuIndex >= 0 && !active && level === 0) {
              openSubmenuCopy.splice(inactiveSubmenuIndex, 1, { level, label, active, id })
            } else {
              openSubmenuCopy.push({ level, label, active, id })
            }
          }
        } else {
          if (!submenuExists) {
            openSubmenuCopy.push({ level, label, active, id })
          }
        }
      })
      setOpenSubmenu(openSubmenuCopy)
    },
    [openSubmenu, subMenuOpenBehavior]
  )

  useEffect(() => {
    setOpenSubmenu([...openSubmenusRef.current])
    openSubmenusRef.current = []
  }, [pathname])

  const providerValue = useMemo(
    () => ({
      transitionDuration,
      menuItemStyles,
      menuSectionStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      openSubmenu,
      openSubmenusRef,
      toggleOpenSubmenu,
      subMenuOpenBehavior,
      textTruncate
    }),
    [
      transitionDuration,
      menuItemStyles,
      menuSectionStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      openSubmenu,
      openSubmenusRef,
      toggleOpenSubmenu,
      subMenuOpenBehavior,
      textTruncate
    ]
  )

  return (
    <VerticalMenuContext.Provider value={providerValue}>
      <StyledVerticalMenu
        ref={ref}
        className={classnames(menuClasses.root, className)}
        rootStyles={rootStyles}
        {...rest}
      >
        <ul className={styles.ul}>{children}</ul>
      </StyledVerticalMenu>
    </VerticalMenuContext.Provider>
  )
}

export default forwardRef(Menu)
