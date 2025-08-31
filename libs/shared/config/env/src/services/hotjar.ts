import { env } from '../env'

export interface IHotjarEnvVars {
  id: number
  version: number
}

export class HotjarEnvVars implements IHotjarEnvVars {
  get id(): number {
    return env.get('NEXT_PUBLIC_HOTJAR_ID').default('0').asInt()
  }

  get version(): number {
    return env.get('NEXT_PUBLIC_HOTJAR_VERSION').default('0').asInt()
  }
}
