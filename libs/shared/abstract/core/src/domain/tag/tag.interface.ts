import { z } from 'zod'

const TagBase = z.object({
  id: z.string().default(''),
  name: z.string(),
  isRoot: z.boolean().nullish(),
})

export const TagSchema = TagBase.extend({
  parent: TagBase.nullish(),
  children: z.array(TagBase).nullish(),
})

export type ITag = z.infer<typeof TagSchema>
