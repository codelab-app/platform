import type {
  IElementModel,
  IElementRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  ElementOptions,
  ElementUniqueWhere,
  ElementWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import { elementApi } from './element.api'

export const elementRepository: IElementRepository = {
  add: async (element: IElementModel) => {
    const {
      createElements: { elements },
    } = await elementApi.CreateElements({
      input: element.toCreateInput(),
    })

    const createdElement = elements[0]

    assertIsDefined(createdElement)

    return createdElement
  },

  delete: async (elements: Array<IElementModel>) => {
    console.debug('ElementRepository.delete()', elements)

    const {
      deleteElements: { nodesDeleted },
    } = await elementApi.DeleteElements({
      delete: {
        props: {},
      },
      where: {
        id_IN: elements.map((element) => element.id),
      },
    })

    return nodesDeleted
  },

  find: async (where: ElementWhere, options?: ElementOptions) => {
    return await elementApi.ElementList({ options, where })
  },

  findOne: async (where: ElementUniqueWhere) => {
    return (await elementRepository.find(where)).items[0]
  },

  update: async (element: IElementModel) => {
    const {
      updateElements: { elements },
    } = await elementApi.UpdateElements({
      update: element.toUpdateInput(),
      where: { id: element.id },
    })

    const updatedElement = elements[0]

    assertIsDefined(updatedElement)

    return updatedElement
  },

  updateNodes: async (element: IElementModel) => {
    const {
      updateElements: { elements },
    } = await elementApi.UpdateElements({
      update: element.toUpdateNodesInput(),
      where: { id: element.id },
    })

    const updatedNode = elements[0]

    assertIsDefined(updatedNode)

    return updatedNode
  },
}
