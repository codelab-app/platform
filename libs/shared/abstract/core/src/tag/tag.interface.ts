import { z } from 'zod'

export const TagSchema = z.object({
  id: z.string().default(''),
  name: z.string(),
  parent: z.string().nullish(),
  children: z.array(z.string()).optional().default([]),
  isRoot: z.boolean(),
  owner: z.object({ id: z.string() }).nullish(),
})

export type ITag = z.infer<typeof TagSchema>
