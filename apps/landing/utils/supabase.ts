import { EnvPublic } from '@codelab/shared/env'
import { createClient } from '@supabase/supabase-js'

const { url, key } = EnvPublic().supabase

export const supabase = createClient(url, key)
