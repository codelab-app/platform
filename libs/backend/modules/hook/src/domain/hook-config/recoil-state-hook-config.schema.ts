import { z } from 'zod'

export type RecoilStateHookConfig = {
  key: string
  defaultValue?: string
}

export const recoilStateHookConfigSchema: z.ZodSchema<RecoilStateHookConfig> =
  z.object({
    key: z.string().nonempty(),
    defaultValue: z.string().optional(),
  })
