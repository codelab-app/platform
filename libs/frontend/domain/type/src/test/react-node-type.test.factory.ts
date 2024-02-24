import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IReactNodeTypeDto } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const reactNodeTypeFactory =
  (typeDomainService: ITypeDomainService) =>
  (dto: Partial<IReactNodeTypeDto>) => {
    const reactNodeType: IReactNodeTypeDto = {
      __typename: TypeKind.ReactNodeType as const,
      id: dto.id ?? v4(),
      kind: TypeKind.ReactNodeType,
      name: dto.name ?? 'reactNodeType',
    }

    return typeDomainService.hydrate(reactNodeType)
  }
