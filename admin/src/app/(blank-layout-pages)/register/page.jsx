import Register from '@views/Register'
import { getServerMode } from '@core/utils/serverHelpers'

const RegisterPage = () => {
  const mode = getServerMode()
  return <Register mode={mode} />
}

export default RegisterPage
