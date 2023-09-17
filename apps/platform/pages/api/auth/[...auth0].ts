import { handleLogin } from '@auth0/nextjs-auth0'
import { auth0Instance } from '@codelab/shared/infra/auth0'

export default auth0Instance().handleAuth()
