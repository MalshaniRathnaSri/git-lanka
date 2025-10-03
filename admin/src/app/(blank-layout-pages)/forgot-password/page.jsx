import ForgotPassword from '@views/ForgotPassword'
import { getServerMode } from '@core/utils/serverHelpers'

const ForgotPasswordPage = () => {
  const mode = getServerMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
