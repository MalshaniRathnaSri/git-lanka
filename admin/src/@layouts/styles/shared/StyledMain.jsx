import styled from '@emotion/styled'
import themeConfig from '@configs/themeConfig'

const StyledMain = styled.main`
  padding: ${themeConfig.layoutPadding}px;
  ${({ isContentCompact }) =>
    isContentCompact &&
    `
    margin-inline: auto;
    max-inline-size: ${themeConfig.compactContentWidth}px;
  `}
`

export default StyledMain
