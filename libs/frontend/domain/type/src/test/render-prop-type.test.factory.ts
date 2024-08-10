import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import type { IRenderPropTypeDto } from '@codelab/shared/abstract/core'
import { TypeKind } from '@codelab/shared/infra/gql'
import { v4 } from 'uuid'

export const renderPropsTypeFactory =
  (typeDomainService: ITypeDomainService) =>
  (dto: Partial<IRenderPropTypeDto>) => {
    const renderPropsType: IRenderPropTypeDto = {
      __typename: TypeKind.RenderPropType as const,
      id: dto.id ?? v4(),
      kind: TypeKind.RenderPropType,
      name: dto.name ?? 'renderPropsType',
    }

    return typeDomainService.hydrate(renderPropsType)
  }
