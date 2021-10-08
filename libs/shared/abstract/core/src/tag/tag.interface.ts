import { z } from 'zod'

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  parent: z.string().optional(),
  children: z.array(z.string()).optional().default([]),
  isRoot: z.boolean(),
})

export type ITag = z.infer<typeof TagSchema>
