import { env } from '../env'

export interface IIntercomEnvVars {
  appId: string
}

export class IntercomEnvVars implements IIntercomEnvVars {
  get appId(): string {
    return env.get('NEXT_PUBLIC_INTERCOM_APP_ID').default('').asString()
  }
}
