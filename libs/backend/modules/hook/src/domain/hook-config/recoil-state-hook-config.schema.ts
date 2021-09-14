import { z } from 'zod'

export type RecoilStateHookConfig = {
  stateKey: string
  defaultValue?: string
}

export const recoilStateHookConfigSchema: z.ZodSchema<RecoilStateHookConfig> =
  z.object({
    stateKey: z.string().nonempty(),
    defaultValue: z.string().optional(),
  })
