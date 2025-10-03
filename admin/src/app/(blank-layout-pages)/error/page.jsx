import NotFound from '@views/NotFound'
import { getServerMode } from '@core/utils/serverHelpers'

const Error = () => {
  const mode = getServerMode()

  return <NotFound mode={mode} />
}

export default Error
