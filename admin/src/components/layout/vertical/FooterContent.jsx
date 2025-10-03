'use client'
import Link from 'next/link'
import classnames from 'classnames'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span>{` by `}</span>
        <Link href='https://themeselection.com' target='_blank' className='text-primary'>
          ThemeSelection
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <a href='https://themeselection.com' target='_blank' rel='noopener noreferrer' className='text-primary'>
            ThemeSelection
          </a>
          <a href='https://themeselection.com/license' target='_blank' rel='noopener noreferrer' className='text-primary'>
            License
          </a>
          <a href='https://themeselection.com' target='_blank' rel='noopener noreferrer' className='text-primary'>
            More Themes
          </a>

          <a
            href={process.env.NEXT_PUBLIC_DOCS_URL ?? '/'}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary'
          >
            Documentation
          </a>

          <Link href='/' className='text-primary'>
            Support
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
