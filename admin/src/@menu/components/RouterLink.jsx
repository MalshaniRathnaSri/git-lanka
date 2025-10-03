'use client'

import { forwardRef } from 'react'
import Link from 'next/link'

export const RouterLink = forwardRef((props, ref) => {
  const { href, className, ...other } = props

  return (
    <Link ref={ref} href={href} className={className} {...other}>
      {props.children}
    </Link>
  )
})
