import type { IMapper } from '@codelab/frontend/abstract/domain'
import type { IAuthGuardDto, IUserDto } from '@codelab/shared/abstract/core'
import type {
  AuthGuardCreateInput,
  AuthGuardDeleteInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, connectOwner } from '@codelab/shared/domain-old'

export class AuthGuardMapper
  implements
    IMapper<
      IAuthGuardDto,
      AuthGuardCreateInput,
      AuthGuardUpdateInput,
      AuthGuardDeleteInput
    >
{
  constructor(private owner: IUserDto) {}

  toCreateInput({
    config,
    id,
    name,
    resource,
    responseTransformer,
  }: IAuthGuardDto): AuthGuardCreateInput {
    return {
      config: {
        create: {
          node: config.toCreateInput(),
        },
      },
      id,
      name,
      owner: connectOwner(this.owner),
      resource: connectNodeId(resource.id),
      responseTransformer,
    }
  }

  toUpdateInput(): AuthGuardUpdateInput {
    return {
      config: {
        update: { node: this.config.toUpdateInput() },
      },
      name: this.name,
      resource: connectNodeId(this.resource.id),
      responseTransformer: this.responseTransformer,
    }
  }
}
