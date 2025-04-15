import type { IPropRepository } from '@codelab/frontend-abstract-domain'
import type { IPropDto, IRef } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type { PropOptions, PropWhere } from '@codelab/shared-infra-gqlgen'

import {
  propMapper,
  propServerActions,
} from '@codelab/shared-domain-module-prop'
import { Validator } from '@codelab/shared-infra-typebox'

const { CreateProps, DeleteProps, GetProps, UpdateProps } = propServerActions

export const propRepository: IPropRepository = {
  add: async (input: IPropDto, next?: NextFetchOptions) => {
    const {
      createProps: { props },
    } = await CreateProps(
      {
        input: propMapper.toCreateInput(input),
      },
      next,
    )

    const createdProp = props[0]

    Validator.assertsDefined(createdProp)

    return createdProp
  },

  delete: async (refs: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deleteProps: { nodesDeleted },
    } = await DeleteProps(
      {
        where: { id_IN: refs.map((prop) => prop.id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: PropWhere,
    options?: PropOptions,
    next?: NextFetchOptions,
  ) => {
    return await GetProps({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: PropWhere, next?: NextFetchOptions) => {
    return (await propRepository.find(where, {}, next)).items[0]
  },

  update: async ({ id }: IRef, prop: IPropDto, next?: NextFetchOptions) => {
    const {
      updateProps: { props },
    } = await UpdateProps(
      {
        update: propMapper.toUpdateInput(prop),
        where: { id },
      },
      next,
    )

    const updatedProp = props[0]

    Validator.assertsDefined(updatedProp)

    return updatedProp
  },
}
