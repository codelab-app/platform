import { createUnionType } from '@nestjs/graphql'
import { Tag } from './tag.model'

export const TagVertex = createUnionType({
  name: 'TagVertex',
  types: () => [Tag],
})

export type TagVertex = typeof TagVertex
