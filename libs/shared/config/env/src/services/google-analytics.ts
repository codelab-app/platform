import { env } from '../env'

export interface IGoogleAnalyticsEnvVars {
  id: string
}

export class GoogleAnalyticsEnvVars implements IGoogleAnalyticsEnvVars {
  readonly id: string

  constructor() {
    this.id = env.get('NEXT_PUBLIC_GOOGLE_ANALYTICS').default('').asString()
  }
}
