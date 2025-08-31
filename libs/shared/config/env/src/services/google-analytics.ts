import { env } from '../env'

export interface IGoogleAnalyticsEnvVars {
  id: string
}

export class GoogleAnalyticsEnvVars implements IGoogleAnalyticsEnvVars {
  get id(): string {
    return env.get('NEXT_PUBLIC_GOOGLE_ANALYTICS').default('').asString()
  }
}
