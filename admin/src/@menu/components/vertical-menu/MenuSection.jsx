'use client'

import { forwardRef } from 'react'
import classnames from 'classnames'
import useVerticalMenu from '../../hooks/useVerticalMenu'
import { menuClasses } from '../../utils/menuClasses'
import StyledMenuIcon from '../../styles/StyledMenuIcon'
import StyledMenuPrefix from '../../styles/StyledMenuPrefix'
import StyledMenuSuffix from '../../styles/StyledMenuSuffix'
import StyledMenuSectionLabel from '../../styles/StyledMenuSectionLabel'
import StyledVerticalMenuSection from '../../styles/vertical/StyledVerticalMenuSection'

const menuSectionWrapperStyles = {
  display: 'inline-block',
  inlineSize: '100%',
  position: 'relative',
  listStyle: 'none',
  padding: 0,
  overflow: 'hidden'
}

const menuSectionContentStyles = {
  display: 'flex',
  alignItems: 'center',
  inlineSize: '100%',
  position: 'relative',
  paddingBlock: '0.75rem',
  paddingInline: '1.25rem',
  overflow: 'hidden'
}

const MenuSection = (props, ref) => {
  const { children, icon, className, prefix, suffix, label, rootStyles, ...rest } = props
  const { menuSectionStyles, textTruncate } = useVerticalMenu()

  const getMenuSectionStyles = element => {
    if (menuSectionStyles) {
      return menuSectionStyles[element]
    }
  }

  return (
    <StyledVerticalMenuSection
      ref={ref}
      rootStyles={rootStyles}
      menuSectionStyles={getMenuSectionStyles('root')}
      className={classnames(menuClasses.menuSectionRoot, className)}
    >
      <ul className={menuClasses.menuSectionWrapper} {...rest} style={menuSectionWrapperStyles}>
        <li className={menuClasses.menuSectionContent} style={menuSectionContentStyles}>
          {icon && (
            <StyledMenuIcon className={menuClasses.icon} rootStyles={getMenuSectionStyles('icon')}>
              {icon}
            </StyledMenuIcon>
          )}
          {prefix && (
            <StyledMenuPrefix className={menuClasses.prefix} rootStyles={getMenuSectionStyles('prefix')}>
              {prefix}
            </StyledMenuPrefix>
          )}
          {label && (
            <StyledMenuSectionLabel
              className={menuClasses.menuSectionLabel}
              rootStyles={getMenuSectionStyles('label')}
              textTruncate={textTruncate}
            >
              {label}
            </StyledMenuSectionLabel>
          )}
          {suffix && (
            <StyledMenuSuffix className={menuClasses.suffix} rootStyles={getMenuSectionStyles('suffix')}>
              {suffix}
            </StyledMenuSuffix>
          )}
        </li>
        {children}
      </ul>
    </StyledVerticalMenuSection>
  )
}

export default forwardRef(MenuSection)
