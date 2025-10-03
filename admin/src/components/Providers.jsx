import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import UpgradeToProButton from '@components/upgrade-to-pro-button'
import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'

const Providers = props => {
  const { children, direction } = props
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>
          {children}
          <UpgradeToProButton />
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
