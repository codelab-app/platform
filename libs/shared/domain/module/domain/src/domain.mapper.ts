import type { IDomainDto, IMapper } from '@codelab/shared/abstract/core'
import type {
  DomainCreateInput,
  DomainDeleteInput,
  DomainUpdateInput,
} from '@codelab/shared/infra/gql'

import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain/orm'

export const domainMapper: IMapper<
  IDomainDto,
  DomainCreateInput,
  DomainUpdateInput,
  DomainDeleteInput
> = {
  toCreateInput: ({ app, id, name }: IDomainDto): DomainCreateInput => {
    return {
      app: connectNodeId(app.id),
      id,
      name,
    }
  },

  toDeleteInput: (): DomainDeleteInput => {
    return {}
  },

  toUpdateInput: ({ name }: IDomainDto): DomainUpdateInput => {
    return {
      name,
    }
  },
}
