import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

const Layout = ({ children }) => {
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <BlankLayout>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
