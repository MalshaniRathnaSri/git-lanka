import 'react-perfect-scrollbar/dist/css/styles.css'
import '@/app/globals.css'
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Admin Panel - Richard Sanches ',
  description:
    'E-commerce website for Online Clothing Store'
}

const RootLayout = ({ children }) => {
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export default RootLayout
