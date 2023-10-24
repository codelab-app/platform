import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IElementModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { PropTestFactory } from '@codelab/frontend/domain/prop'
import { chance } from '@codelab/frontend/domain/shared'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

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
