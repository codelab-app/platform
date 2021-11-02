import { z } from 'zod'
import { HookConfigSchema } from './config/hook-config.interface'
import { HookType } from './hook-type.enum'

// export interface IHook {
//   id: string
//   type: HookType
//   config: IHookConfig
// }

export const HookSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(HookType),
  config: HookConfigSchema,
})

export type IHook = z.infer<typeof HookSchema>
