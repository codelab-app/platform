import { z } from 'zod'
import { AtomType } from '../atom'
import { PropSchema } from '../prop'

export const HookSchema = z.object({
  id: z.string().default(''),
  type: z.nativeEnum(AtomType),
  config: PropSchema,
})

export type IHook = z.infer<typeof HookSchema>
