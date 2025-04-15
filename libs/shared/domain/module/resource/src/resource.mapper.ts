import type { IMapper, IResourceDto } from '@codelab/shared-abstract-core'
import type {
  ResourceCreateInput,
  ResourceDeleteInput,
  ResourceUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { propMapper } from '@codelab/shared-domain-module-prop'
import { connectOwner } from '@codelab/shared-domain-orm'

export const resourceMapper: IMapper<
  IResourceDto,
  ResourceCreateInput,
  ResourceUpdateInput,
  ResourceDeleteInput
> = {
  toCreateInput: ({
    config,
    id,
    name,
    owner,
    type,
  }: IResourceDto): ResourceCreateInput => {
    return {
      config: {
        create: { node: propMapper.toCreateInput(config) },
      },
      id,
      name,
      owner: connectOwner(owner),
      type,
    }
  },

  toDeleteInput: (): ResourceDeleteInput => {
    return {
      config: {
        where: {},
      },
    }
  },

  toUpdateInput: ({
    config,
    name,
    type,
  }: IResourceDto): ResourceUpdateInput => {
    return {
      config: {
        update: { node: propMapper.toUpdateInput(config) },
      },
      name,
      type,
    }
  },
}
