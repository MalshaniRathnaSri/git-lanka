import classnames from 'classnames'
import LayoutContent from './components/vertical/LayoutContent'
import { verticalLayoutClasses } from './utils/layoutClasses'

const VerticalLayout = props => {
  const { navbar, footer, navigation, children } = props

  return (
    <div className={classnames(verticalLayoutClasses.root, 'flex flex-auto')}>
      {navigation || null}
      <div className={classnames(verticalLayoutClasses.contentWrapper, 'flex flex-col min-is-0 is-full')}>
        {navbar || null}
        <LayoutContent>{children}</LayoutContent>
        {footer || null}
      </div>
    </div>
  )
}

export default VerticalLayout
