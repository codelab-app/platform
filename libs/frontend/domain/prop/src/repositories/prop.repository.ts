import type {
  IPropModel,
  IPropRepository,
} from '@codelab/frontend/abstract/domain'
import type { IPropCreateDto, IRef } from '@codelab/shared/abstract/core'
import type {
  PropOptions,
  PropUniqueWhere,
  PropWhere,
  UpdatePropsMutationVariables,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'

import {
  CreateProps,
  DeleteProps,
  GetProps,
  UpdateProps,
} from './prop.api.graphql.gen'

export const propRepository: IPropRepository = {
  add: async (input: IPropCreateDto) => {
    const {
      createProps: { props },
    } = await CreateProps({
      input,
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

  update: async (variables: UpdatePropsMutationVariables) => {
    const {
      updateProps: { props },
    } = await UpdateProps(variables)

    const updatedProp = props[0]

    return updatedProp
  },
}
