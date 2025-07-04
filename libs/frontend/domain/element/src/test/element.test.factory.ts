import type { IElementDomainService } from '@codelab/frontend-abstract-domain'
import type { IElementDto } from '@codelab/shared-abstract-core'

import { propFactory } from '@codelab/frontend-domain-prop/test'
import { chance } from '@codelab/frontend-domain-shared'
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core'
import { v4 } from 'uuid'

export const elementFactory =
  (elementDomainService: IElementDomainService) =>
  (dto: Partial<IElementDto> = {}) => {
    const element: IElementDto = {
      closestContainerNode: { id: v4() },
      firstChild: dto.firstChild ? { id: dto.firstChild.id } : null,
      id: dto.id ?? v4(),
      name: dto.name ?? chance.word({ capitalize: true }),
      nextSibling: dto.nextSibling ? { id: dto.nextSibling.id } : null,
      page: dto.page?.id ? { id: dto.page.id } : null,
      parentComponent: dto.parentComponent?.id
        ? { id: dto.parentComponent.id }
        : null,
      parentElement: dto.parentElement?.id
        ? { id: dto.parentElement.id }
        : null,
      prevSibling: dto.prevSibling ? { id: dto.prevSibling.id } : null,
      props: propFactory(dto.props).toJson,
      renderIfExpression: dto.renderIfExpression ?? null,
      renderType: {
        __typename: dto.renderType?.__typename ?? IElementRenderTypeKind.Atom,
        id: dto.renderType?.id ?? v4(),
      },
    }

    return elementDomainService.hydrate(element)
  }
