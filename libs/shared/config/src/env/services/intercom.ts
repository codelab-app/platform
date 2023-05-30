import * as env from 'env-var'

export interface IIntercomEnvVars {
  appId: string
}

export class IntercomEnvVars implements IIntercomEnvVars {
  readonly appId: string

  constructor() {
    this.appId = env.get('NEXT_PUBLIC_INTERCOM_APP_ID').default('').asString()
  }
}
