export interface ISupabaseEnvVars {
  key: string
  url: string
}

export class SupabaseEnvVars implements ISupabaseEnvVars {
  readonly key: string

  readonly url: string

  constructor() {
    this.key = process.env['NEXT_PUBLIC_SUPABASE_KEY'] || ''
    this.url = process.env['NEXT_PUBLIC_SUPABASE_URL'] || ''
  }
}
