import * as env from 'env-var'

export interface IHotjarEnvVars {
  id: number
  version: number
}

export class HotjarEnvVars implements IHotjarEnvVars {
  readonly id: number

  readonly version: number

  constructor() {
    this.id = env.get('NEXT_PUBLIC_HOTJAR_ID').default('0').asInt()
    this.version = env.get('NEXT_PUBLIC_HOTJAR_VERSION').default('0').asInt()
  }
}
