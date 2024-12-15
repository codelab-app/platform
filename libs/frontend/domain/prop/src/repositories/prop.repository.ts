import type { IPropRepository } from '@codelab/frontend/abstract/domain'
import type { IPropDto, IRef } from '@codelab/shared/abstract/core'
import type {
  PropOptions,
  PropUniqueWhere,
  PropWhere,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'
import {
  propMapper,
  propServerActions,
} from '@codelab/shared-domain-module/prop'

const { CreateProps, DeleteProps, GetProps, UpdateProps } =
  await propServerActions()

export const propRepository: IPropRepository = {
  add: async (input: IPropDto) => {
    const {
      createProps: { props },
    } = await CreateProps({
      input: propMapper.toCreateInput(input),
    })

    const createdProp = props[0]

    Validator.assertsDefined(createdProp)

    return createdProp
  },

  delete: async (refs: Array<IRef>) => {
    const {
      deleteProps: { nodesDeleted },
    } = await DeleteProps({
      where: { id_IN: refs.map((prop) => prop.id) },
    })

    return nodesDeleted
  },

  find: async (where?: PropWhere, options?: PropOptions) => {
    return await GetProps({ options, where })
  },

  findOne: async (where: PropUniqueWhere) => {
    return (await propRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, prop: IPropDto) => {
    const {
      updateProps: { props },
    } = await UpdateProps({
      update: propMapper.toUpdateInput(prop),
      where: { id },
    })

    const updatedProp = props[0]

    Validator.assertsDefined(updatedProp)

    return updatedProp
  },
}
