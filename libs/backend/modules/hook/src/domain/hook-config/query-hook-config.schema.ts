import { z } from 'zod'
import { QueryMethod } from '../enums'

export interface QueryHookConfig {
  queryKey: string
  url: string
  body?: string | null
  method: QueryMethod
  dataPropKey?: string
  loadingPropKey?: string
  errorPropKey?: string
}

export const queryHookConfigSchema: z.ZodSchema<QueryHookConfig> = z.object({
  queryKey: z.string().nonempty(),
  url: z.string().nonempty().url(),
  body: z.string().optional().nullable(),
  method: z.nativeEnum(QueryMethod),
  dataPropKey: z.string().optional(),
  loadingPropKey: z.string().optional(),
  errorPropKey: z.string().optional(),
})
