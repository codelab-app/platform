import type {
  IComponentCreateResults,
  IComponentRepository,
} from '@codelab/frontend/abstract/domain'
import type { IComponentDto, IRef } from '@codelab/shared/abstract/core'
import type {
  ComponentDeleteInput,
  ComponentOptions,
  ComponentUniqueWhere,
  ComponentWhere,
} from '@codelab/shared/infra/gql'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { componentMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'

import { Component } from '../store'
import {
  ComponentList,
  CreateComponents,
  DeleteComponents,
  UpdateComponents,
} from './component.api.graphql.gen'

export const componentRepository: IComponentRepository = {
  add: async (input: IComponentDto) => {
    const {
      createComponents: { components },
    } = await CreateComponents({
      input: componentMapper.toCreateInput(input),
    })

    const createdComponent = components[0]

    Validator.assertsDefined(createdComponent)

    return createdComponent
  },

  delete: async (refs: Array<IRef>) => {
    const {
      deleteComponents: { nodesDeleted },
    } = await DeleteComponents({
      delete: componentMapper.toDeleteInput(),
      where: {
        id_IN: refs.map(({ id }) => id),
      },
    })

    return nodesDeleted
  },

  find: async (where?: ComponentWhere, options?: ComponentOptions) => {
    return await ComponentList(
      {
        options,
        where,
      },
      { tags: [CACHE_TAGS.COMPONENTS_LIST] },
    )
  },

  findOne: async (where: ComponentUniqueWhere) => {
    return (await componentRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, input: IComponentDto) => {
    const {
      updateComponents: { components },
    } = await UpdateComponents({
      update: componentMapper.toUpdateInput(input),
      where: { id },
    })

    const updatedComponent = components[0]

    Validator.assertsDefined(updatedComponent)

    return updatedComponent
  },
}
