import { Env } from '@codelab/shared/config'
import { createClient } from '@supabase/supabase-js'

const { key, url } = Env.supabase

export const supabase = createClient(url, key)
