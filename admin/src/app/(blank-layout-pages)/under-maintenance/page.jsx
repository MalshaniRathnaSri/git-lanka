import UnderMaintenance from '@views/pages/misc/UnderMaintenance'
import { getServerMode } from '@core/utils/serverHelpers'

const UnderMaintenancePage = () => {
  const mode = getServerMode()
  return <UnderMaintenance mode={mode} />
}

export default UnderMaintenancePage
