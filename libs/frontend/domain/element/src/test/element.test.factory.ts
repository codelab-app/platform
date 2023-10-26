import type {
  IElementModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { propFactory, PropTestFactory } from '@codelab/frontend/domain/prop'
import { chance } from '@codelab/frontend/domain/shared'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const elementFactory =
  (rootStore: IRootDomainStore) => (dto: Partial<IElementDTO>) => {
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
      props: propFactory(rootStore)(dto.props).toJson,
      renderIfExpression: dto.renderIfExpression ?? null,
      renderType: {
        __typename: dto.renderType?.__typename ?? IElementRenderTypeKind.Atom,
        id: dto.renderType?.id ?? v4(),
      },
    }

    return rootStore.elementDomainService.hydrate(element)
  }

export const ElementTestFactory = (rootStore: Partial<IRootDomainStore>) =>
  Factory.define<IElementModel, IElementDTO>(({ params, transientParams }) => {
    const dto: IElementDTO = {
      closestContainerNode: {
        id: transientParams.closestContainerNode?.id ?? v4(),
      },
      id: transientParams.id ?? v4(),
      name: transientParams.name ?? chance.word({ capitalize: true }),
      page: transientParams.page?.id ? { id: transientParams.page.id } : null,
      parentComponent: transientParams.parentComponent?.id
        ? { id: transientParams.parentComponent.id }
        : null,
      parentElement: transientParams.parentElement?.id
        ? { id: transientParams.parentElement.id }
        : null,
      props: PropTestFactory(rootStore).build(
        {},
        { transient: transientParams.props },
      ).toJson,
      renderIfExpression: transientParams.renderIfExpression ?? null,
      renderType: {
        __typename:
          transientParams.renderType?.__typename ?? IElementRenderTypeKind.Atom,
        id: transientParams.renderType?.id ?? v4(),
      },
    }

    const model = rootStore.elementDomainService?.hydrate(dto)

    return model!
  })
