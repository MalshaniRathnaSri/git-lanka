'use client'

import classnames from 'classnames'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import StyledFooter from '@layouts/styles/vertical/StyledFooter'

const Footer = props => {
  const { children, overrideStyles } = props

  return (
    <StyledFooter
      overrideStyles={overrideStyles}
      className={classnames(
        verticalLayoutClasses.footer,
        verticalLayoutClasses.footerContentCompact,
        verticalLayoutClasses.footerStatic,
        verticalLayoutClasses.footerDetached,
        'is-full'
      )}
    >
      <div className={verticalLayoutClasses.footerContentWrapper}>{children}</div>
    </StyledFooter>
  )
}

export default Footer
