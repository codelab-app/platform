import type { IAtomDto, IMapper } from '@codelab/shared/abstract/core'
import type {
  AtomCreateInput,
  AtomDeleteInput,
  AtomUpdateInput,
} from '@codelab/shared/infra/gqlgen'

import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain/orm'

export const atomMapper: IMapper<
  IAtomDto,
  AtomCreateInput,
  AtomUpdateInput,
  AtomDeleteInput
> = {
  toCreateInput: ({
    api,
    externalCssSource,
    externalJsSource,
    externalSourceType,
    icon,
    id,
    name,
    owner,
    requiredParents = [],
    suggestedChildren = [],
    tags,
    type,
  }: IAtomDto): AtomCreateInput => {
    return {
      api: connectNodeId(api.id),
      externalCssSource,
      externalJsSource,
      externalSourceType,
      icon,
      id,
      name,
      owner: connectOwner(owner),
      requiredParents: connectNodeIds(
        requiredParents.map((parent) => parent.id),
      ),
      suggestedChildren: connectNodeIds(
        suggestedChildren.map((child) => child.id),
      ),
      tags: connectNodeIds(tags?.map((tag) => tag.id)),
      type,
    }
  },
  toDeleteInput: (): AtomDeleteInput => {
    return {
      api: {},
    }
  },
  toUpdateInput: ({
    api,
    externalCssSource,
    externalJsSource,
    externalSourceType,
    name,
    requiredParents,
    suggestedChildren,
    tags,
    type,
  }: IAtomDto): AtomUpdateInput => {
    return {
      api: api.id ? connectNodeId(api.id) : undefined,
      externalCssSource,
      externalJsSource,
      externalSourceType,
      name,
      requiredParents: reconnectNodeIds(
        requiredParents?.map((parent) => parent.id),
      ),
      suggestedChildren: reconnectNodeIds(
        suggestedChildren?.map((child) => child.id),
      ),
      tags: reconnectNodeIds(tags?.map((tag) => tag.id)),
      type,
    }
  },
}
