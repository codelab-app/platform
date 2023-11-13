import type { IElementDomainService } from '@codelab/frontend/abstract/domain'
import { propFactory } from '@codelab/frontend/domain/prop'
import { chance } from '@codelab/frontend/domain/shared'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const elementFactory =
  (elementDomainService: IElementDomainService) =>
  (dto: Partial<IElementDTO> = {}) => {
    const element: IElementDTO = {
      closestContainerNode: {
        id: dto.closestContainerNode?.id ?? v4(),
      },
      id: dto.id ?? v4(),
      name: dto.name ?? chance.word({ capitalize: true }),
      page: dto.page?.id ? { id: dto.page.id } : null,
      parentComponent: dto.parentComponent?.id
        ? { id: dto.parentComponent.id }
        : null,
      parentElement: dto.parentElement?.id
        ? { id: dto.parentElement.id }
        : null,
      props: propFactory(dto.props).toJson,
      renderIfExpression: dto.renderIfExpression ?? null,
      renderType: {
        __typename: dto.renderType?.__typename ?? IElementRenderTypeKind.Atom,
        id: dto.renderType?.id ?? v4(),
      },
    }

    return elementDomainService.hydrate(element)
  }
