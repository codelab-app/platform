import type { IMapper, ITagDto } from '@codelab/shared/abstract/core'
import type {
  TagCreateInput,
  TagDeleteInput,
  TagUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeIds, connectOwner, reconnectNodeIds } from '../orm'

export const tagMapper: IMapper<
  ITagDto,
  TagCreateInput,
  TagUpdateInput,
  TagDeleteInput
> = {
  toCreateInput: ({
    children,
    descendants,
    id,
    isRoot,
    name,
    owner,
    parent,
  }: ITagDto): TagCreateInput => {
    return {
      children: connectNodeIds(children?.map((child) => child.id)),
      id,
      name,
      owner: connectOwner(owner),
    }
  },

  toDeleteInput: (tag: ITagDto): TagDeleteInput => {
    return {}
  },

  toUpdateInput: ({
    children,
    descendants,
    id,
    isRoot,
    name,
    owner,
    parent,
  }: ITagDto): TagUpdateInput => {
    return {
      children: reconnectNodeIds(children?.map((child) => child.id)),
      name,
    }
  },
}
