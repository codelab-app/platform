import { EnvPublic } from '@codelab/shared/env'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  EnvPublic().supabase.url,
  EnvPublic().supabase.key,
)
