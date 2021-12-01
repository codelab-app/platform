import { z } from 'zod'
import { AtomType } from '../atom'
import { PropSchema } from '../prop/prop.interface'

export const HookSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(AtomType),
  config: PropSchema,
})

export type IHook = z.infer<typeof HookSchema>
