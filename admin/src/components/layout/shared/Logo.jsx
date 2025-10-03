'use client'

import styled from '@emotion/styled'
import themeConfig from '@configs/themeConfig'
import Image from 'next/image'

const LogoText = styled.span`
  color: ${({ color }) => color ?? 'var(--mui-palette-text-primary)'};
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  margin-inline-start: 10px;
`

const Logo = ({ color }) => {
  return (
    <div className='flex items-center min-bs-[24px]'>
      <div className='text-[22px] text-primary'>
        <Image
          src={'/logo.jpg'}
          alt='logo'
          width={60}       
          height={40}       
          priority
        />
      </div>
      <LogoText color={color}>{themeConfig.templateName}</LogoText>
    </div>
  )
}

export default Logo
