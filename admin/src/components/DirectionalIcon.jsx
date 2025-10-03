'use client'

import { useTheme } from '@mui/material/styles'
import classnames from 'classnames'

const DirectionalIcon = props => {
  const { ltrIconClass, rtlIconClass, className } = props
  const theme = useTheme()

  return (
    <i
      className={classnames(
        {
          [ltrIconClass]: theme.direction === 'ltr',
          [rtlIconClass]: theme.direction === 'rtl'
        },
        className
      )}
    />
  )
}

export default DirectionalIcon
