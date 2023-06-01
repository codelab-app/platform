import { getEnv } from '@codelab/shared/config'
import { createClient } from '@supabase/supabase-js'

const { key, url } = getEnv().supabase

export const supabase = createClient(url, key)
