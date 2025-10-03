import styled from '@emotion/styled'
import { menuClasses } from '../../utils/menuClasses'
import { menuButtonStyles } from '../../components/vertical-menu/MenuButton'

const StyledVerticalMenuItem = styled.li`
  position: relative;
  margin-block-start: 4px;
  ${({ menuItemStyles }) => menuItemStyles};
  ${({ rootStyles }) => rootStyles};

  > .${menuClasses.button} {
    ${({ level, disabled }) =>
      menuButtonStyles({
        level,
        disabled
      })};
    ${({ buttonStyles }) => buttonStyles};
  }
`

export default StyledVerticalMenuItem
