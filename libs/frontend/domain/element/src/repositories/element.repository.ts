import type {
  IElementModel,
  IElementRepository,
} from '@codelab/frontend/abstract/domain'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type {
  ElementOptions,
  ElementUniqueWhere,
  ElementWhere,
} from '@codelab/shared/infra/gql'

import { elementMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'

import {
  CreateElements,
  DeleteElements,
  ElementList,
  UpdateElements,
} from './element.api.graphql.web.gen'

export const elementRepository: IElementRepository = {
  add: async (element: IElementDto) => {
    const {
      createElements: { elements },
    } = await CreateElements({
      input: elementMapper.toCreateInput(element),
    })

    const createdElement = elements[0]

    Validator.assertsDefined(createdElement)

    return createdElement
  },

  delete: async (elements: Array<IElementModel>) => {
    const {
      deleteElements: { nodesDeleted },
    } = await DeleteElements({
      delete: elementMapper.toDeleteInput(),
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

  update: async (where: ElementUniqueWhere, element: IElementDto) => {
    const {
      updateElements: { elements },
    } = await UpdateElements({
      update: elementMapper.toUpdateInput(element),
      where,
    })

    const updatedElement = elements[0]

    Validator.assertsDefined(updatedElement)

    return updatedElement
  },
}
