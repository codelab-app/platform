import { config } from '@codelab/shared-config-env'

export const useAuthUrl = () => {
  const webHost = config.endpoint.webHost
  
  return {
    loginUrl: `${webHost}/auth/login`,
    registerUrl: `${webHost}/auth/register`,
  }
}