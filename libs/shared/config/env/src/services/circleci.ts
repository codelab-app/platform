import { env } from '../env'

export interface ICircleCIEnvVars {
  ci: boolean
  circleCi: boolean
}

export class CircleCIEnvVars implements ICircleCIEnvVars {
  get ci() {
    return (this._ci ??= env.get('CI').default('false').asBool())
  }

  get circleCi() {
    return (this._circleCi ??= env.get('CIRCLE').default('false').asBool())
  }

  // Vercel uses '1'
  // Others may use 'true'
  private _ci?: boolean

  private _circleCi?: boolean
}
