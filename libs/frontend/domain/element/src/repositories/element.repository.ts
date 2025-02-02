import type {
  IElementModel,
  IElementRepository,
} from '@codelab/frontend/abstract/domain'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type { ElementOptions, ElementWhere } from '@codelab/shared/infra/gqlgen'

import { disconnectAll, disconnectManyAll } from '@codelab/shared/domain/orm'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  elementMapper,
  elementServerActions,
} from '@codelab/shared-domain-module/element'

const { CreateElements, DeleteElements, ElementList, UpdateElements } =
  elementServerActions

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

  // FIXME: make a unique where
  findOne: async (where: ElementWhere) => {
    return (await elementRepository.find(where)).items[0]
  },

  // FIXME: make a unique where
  update: async (where: ElementWhere, element: IElementDto) => {
    console.debug(elementMapper.toUpdateInput(element))

    // Disconnect here first for pre/post, issue with generated cypher query
    const update = {
      firstChild: disconnectAll({ omitId: element.firstChild?.id }),
      parentElement: disconnectAll({ omitId: element.parentElement?.id }),
      postRenderActions: [
        disconnectManyAll({
          omitIds: element.postRenderActions?.map((action) => action.id),
        }),
      ],
      preRenderActions: [
        disconnectManyAll({
          omitIds: element.preRenderActions?.map((action) => action.id),
        }),
      ],
    }

    await UpdateElements({
      update,
      where,
    })

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
