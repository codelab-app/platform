import { env } from '../env'

export interface ISupabaseEnvVars {
  key: string
  url: string
}

export class SupabaseEnvVars implements ISupabaseEnvVars {
  get key(): string {
    return env.get('NEXT_PUBLIC_SUPABASE_KEY').default('').asString()
  }

  get url(): string {
    return env.get('NEXT_PUBLIC_SUPABASE_URL').default('').asString()
  }
}
