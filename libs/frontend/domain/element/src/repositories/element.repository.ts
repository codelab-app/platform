import type {
  IElementModel,
  IElementRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  ElementOptions,
  ElementUniqueWhere,
  ElementWhere,
} from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'
import {
  CreateElements,
  DeleteElements,
  ElementList,
  UpdateElements,
} from './element.api.graphql.gen'

export const elementRepository: IElementRepository = {
  add: async (element: IElementModel) => {
    const {
      createElements: { elements },
    } = await CreateElements({
      input: element.toCreateInput(),
    })

    const createdElement = elements[0]

    Validator.assertsDefined(createdElement)

    return createdElement
  },

  delete: async (elements: Array<IElementModel>) => {
    console.debug('ElementRepository.delete()', elements)

    const {
      deleteElements: { nodesDeleted },
    } = await DeleteElements({
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
    return await ElementList({ options, where })
  },

  findOne: async (where: ElementUniqueWhere) => {
    return (await elementRepository.find(where)).items[0]
  },

  update: async (element: IElementModel) => {
    const {
      updateElements: { elements },
    } = await UpdateElements({
      update: element.toUpdateInput(),
      where: { id: element.id },
    })

    const updatedElement = elements[0]

    Validator.assertsDefined(updatedElement)

    return updatedElement
  },

  updateNodes: async (element: IElementModel) => {
    const {
      updateElements: { elements },
    } = await UpdateElements({
      update: element.toUpdateNodesInput(),
      where: { id: element.id },
    })

    const updatedNode = elements[0]

    Validator.assertsDefined(updatedNode)

    return updatedNode
  },
}
