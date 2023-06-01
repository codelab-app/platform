import * as env from 'env-var'

export interface ICircleCIEnvVars {
  ci: boolean
  circleCi: boolean
}

export class CircleCIEnvVars implements ICircleCIEnvVars {
  // Vercel uses '1'
  // Others may use 'true'
  readonly ci: boolean

  readonly circleCi: boolean

  constructor() {
    this.ci = env.get('CI').default('false').asBool()
    this.circleCi = env.get('CI').default('false').asBool()
  }
}
