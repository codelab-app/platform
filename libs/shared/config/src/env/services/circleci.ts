import * as env from 'env-var'

export interface ICircleCIEnvVars {
  ci: boolean
  circleci: boolean
}

export class CircleCIEnvVars implements ICircleCIEnvVars {
  // Vercel uses '1'
  // Others may use 'true'
  readonly ci: boolean

  readonly circleci: boolean

  constructor() {
    this.ci = env.get('CI').default('false').asBool()
    this.circleci = env.get('CI').default('false').asBool()
  }
}
