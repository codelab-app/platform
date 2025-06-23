import type {
  IElementModel,
  IElementRepository,
} from '@codelab/frontend-abstract-domain'
import type { IElementDto } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type { ElementOptions, ElementWhere } from '@codelab/shared-infra-gqlgen'

import {
  elementMapper,
  elementServerActions,
} from '@codelab/shared-domain-module-element'
import { Validator } from '@codelab/shared-infra-typebox'

const { CreateElements, DeleteElements, ElementList, UpdateElements } =
  elementServerActions

export const elementRepository: IElementRepository = {
  add: async (element: IElementDto, next?: NextFetchOptions) => {
    const {
      createElements: { elements },
    } = await CreateElements(
      {
        input: elementMapper.toCreateInput(element),
      },
      next,
    )

    const createdElement = elements[0]

    Validator.assertsDefined(createdElement)

    return createdElement
  },

  delete: async (elements: Array<IElementModel>, next?: NextFetchOptions) => {
    const {
      deleteElements: { nodesDeleted },
    } = await DeleteElements(
      {
        delete: elementMapper.toDeleteInput(),
        where: {
          id_IN: elements.map((element) => element.id),
        },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where: ElementWhere,
    options?: ElementOptions,
    next?: NextFetchOptions,
  ) => {
    return await ElementList({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: ElementWhere, next?: NextFetchOptions) => {
    return (await elementRepository.find(where, {}, next)).items[0]
  },

  // FIXME: make a unique where
  update: async (
    where: ElementWhere,
    element: IElementDto,
    next?: NextFetchOptions,
  ) => {
    // Disconnect here first for pre/post, issue with generated cypher query
    // const update = {
    //   firstChild: disconnectAll({ omitId: element.firstChild?.id }),
    //   nextSibling: disconnectAll({ omitId: element.nextSibling?.id }),
    //   parentElement: disconnectAll({ omitId: element.parentElement?.id }),
    //   postRenderActions: [
    //     disconnectManyAll({
    //       omitIds: element.postRenderActions?.map((action) => action.id),
    //     }),
    //   ],
    //   preRenderActions: [
    //     disconnectManyAll({
    //       omitIds: element.preRenderActions?.map((action) => action.id),
    //     }),
    //   ],
    //   prevSibling: disconnectAll({ omitId: element.prevSibling?.id }),
    // }

    // await UpdateElements({
    //   update,
    //   where,
    // })

    const {
      updateElements: { elements },
    } = await UpdateElements(
      {
        update: elementMapper.toUpdateInput(element),
        where,
      },
      next,
    )

    const updatedElement = elements[0]

    Validator.assertsDefined(updatedElement, 'Updated element is undefined')

    return updatedElement
  },
}
