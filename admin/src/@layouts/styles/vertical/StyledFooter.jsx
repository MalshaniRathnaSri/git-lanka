import styled from '@emotion/styled'
import themeConfig from '@configs/themeConfig'
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const StyledFooter = styled.footer`
  margin-inline: auto;
  max-inline-size: ${themeConfig.compactContentWidth}px;

  & .${verticalLayoutClasses.footerContentWrapper} {
    padding-block: 15px;
    padding-inline: ${themeConfig.layoutPadding}px;
  }

  ${({ overrideStyles }) => overrideStyles}
`

export default StyledFooter
