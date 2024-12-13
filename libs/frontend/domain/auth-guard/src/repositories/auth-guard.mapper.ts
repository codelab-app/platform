import type { IAuthGuardUpdateFormData } from '@codelab/frontend/abstract/domain'
import type {
  IAuthGuardDto,
  IMapper,
  IUserDto,
} from '@codelab/shared/abstract/core'
import type {
  AuthGuardCreateInput,
  AuthGuardDeleteInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, connectOwner } from '@codelab/shared/domain/orm'
import { propMapper } from '@codelab/shared-domain-module/prop'

export const authGuardMapper: IMapper<
  IAuthGuardDto,
  AuthGuardCreateInput,
  AuthGuardUpdateInput,
  AuthGuardDeleteInput
> = {
  toCreateInput: ({
    config,
    id,
    name,
    owner,
    resource,
    responseTransformer,
  }: IAuthGuardDto): AuthGuardCreateInput => {
    return {
      config: {
        create: {
          node: propMapper.toCreateInput(config),
        },
      },
      id,
      name,
      owner: connectOwner(owner),
      resource: connectNodeId(resource.id),
      responseTransformer,
    }
  },

  toDeleteInput: (): AuthGuardDeleteInput => {
    return {
      config: { where: {} },
    }
  },

  toUpdateInput: ({
    config,
    name,
    resource,
    responseTransformer,
  }: IAuthGuardDto): AuthGuardUpdateInput => {
    return {
      config: {
        update: { node: propMapper.toUpdateInput(config) },
      },
      name,
      resource: connectNodeId(resource.id),
      responseTransformer,
    }
  },
}
