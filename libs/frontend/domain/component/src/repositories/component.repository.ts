import type { IComponentRepository } from '@codelab/frontend-abstract-domain'
import type { IComponentDto, IRef } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared-infra-gqlgen'

import {
  componentMapper,
  componentServerActions,
} from '@codelab/shared-domain-module-component'
import { Validator } from '@codelab/shared-infra-typebox'

const { ComponentList, CreateComponents, DeleteComponents, UpdateComponents } =
  componentServerActions

export const componentRepository: IComponentRepository = {
  add: async (input: IComponentDto, next?: NextFetchOptions) => {
    const {
      createComponents: { components },
    } = await CreateComponents(
      { input: componentMapper.toCreateInput(input) },
      next,
    )

    const createdComponent = components[0]

    Validator.assertsDefined(createdComponent)

    return createdComponent
  },

  delete: async (refs: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deleteComponents: { nodesDeleted },
    } = await DeleteComponents(
      {
        delete: componentMapper.toDeleteInput(),
        where: {
          id_IN: refs.map(({ id }) => id),
        },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: ComponentWhere,
    options?: ComponentOptions,
    next?: NextFetchOptions,
  ) => {
    return await ComponentList({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: ComponentWhere, next?: NextFetchOptions) => {
    return (await componentRepository.find(where, {}, next)).items[0]
  },

  update: async (
    { id }: IRef,
    input: IComponentDto,
    next?: NextFetchOptions,
  ) => {
    const {
      updateComponents: { components },
    } = await UpdateComponents(
      {
        update: componentMapper.toUpdateInput(input),
        where: { id },
      },
      next,
    )

    const updatedComponent = components[0]

    Validator.assertsDefined(updatedComponent)

    return updatedComponent
  },
}
