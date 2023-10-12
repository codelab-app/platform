import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'
import chance from './chance'

export default Factory.define<IElementDTO>(({ params }) => {
  const dto = {
    closestContainerNode: {
      id: params.closestContainerNode?.id ?? v4(),
    },
    id: params.id ?? v4(),
    name: params.name ?? chance.word({ capitalize: true }),
    page: params.page?.id ? { id: params.page.id } : null,
    parentComponent: params.parentComponent?.id
      ? { id: params.parentComponent.id }
      : null,
    parentElement: params.parentElement?.id
      ? { id: params.parentElement.id }
      : null,
    props: {
      data: params.props?.data ?? '{}',
      id: params.props?.id ?? v4(),
    },
    renderIfExpression: params.renderIfExpression ?? null,
    renderType: {
      __typename: params.renderType?.__typename ?? IElementRenderTypeKind.Atom,
      id: params.renderType?.id ?? v4(),
    },
  }

  testRootStore.elementService.elementDomainService.hydrate(dto)

  return dto
})
