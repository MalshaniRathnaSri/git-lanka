'use client'

import classnames from 'classnames'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import StyledHeader from '@layouts/styles/vertical/StyledHeader'

const Navbar = props => {
  const { children, overrideStyles } = props

  return (
    <StyledHeader
      overrideStyles={overrideStyles}
      className={classnames(
        verticalLayoutClasses.header,
        verticalLayoutClasses.headerContentCompact,
        verticalLayoutClasses.headerStatic,
        verticalLayoutClasses.headerDetached
      )}
    >
      <div className={classnames(verticalLayoutClasses.navbar, 'flex bs-full')}>{children}</div>
    </StyledHeader>
  )
}

export default Navbar
