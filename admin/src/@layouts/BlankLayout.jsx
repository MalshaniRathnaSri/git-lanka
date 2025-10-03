'use client'

import classnames from 'classnames'
import { blankLayoutClasses } from './utils/layoutClasses'

const BlankLayout = ({ children }) => {
  return <div className={classnames(blankLayoutClasses.root, 'is-full bs-full')}>{children}</div>
}

export default BlankLayout
