import { env } from '../env'

export interface ICircleCIEnvVars {
  ci: boolean
  circleCi: boolean
}

export class CircleCIEnvVars implements ICircleCIEnvVars {
  get ci() {
    return env.get('CI').default('false').asBool()
  }

  get circleCi() {
    return env.get('CIRCLE').default('false').asBool()
  }
}
