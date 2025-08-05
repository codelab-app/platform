import { getEnv } from '@codelab/shared-config-env'

export const useAuthUrl = () => {
  const webHost = getEnv().endpoint.webHost

  return {
    loginUrl: `${webHost}/auth/login`,
    registerUrl: `${webHost}/auth/register`,
  }
}
