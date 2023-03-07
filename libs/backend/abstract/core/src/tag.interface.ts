import { EntitySchema } from '@codelab/shared/abstract/types'
import { z } from 'zod'
import { OwnerFieldSchema } from './user.interface'

const TagPreviewSchema = z
  .object({
    name: z.string(),
  })
  .merge(EntitySchema)

export type ITagPreview = z.infer<typeof TagPreviewSchema>

export const TagSchema = TagPreviewSchema.extend({
  children: z.array(TagPreviewSchema),
  parent: TagPreviewSchema.optional().nullable(),
}).merge(OwnerFieldSchema)

export type ITag = z.infer<typeof TagSchema>

/**
 * Create hierarchical data from data file
 *
 * This is keyed by name
 */
export interface TagNodeData {
  name: string
  parent: string | null
  children: Array<TagNodeData>
}
