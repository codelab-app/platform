import type {
  IPropModel,
  IPropRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  PropOptions,
  PropUniqueWhere,
  PropWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import {
  CreateProps,
  DeleteProps,
  GetProps,
  UpdateProps,
} from './prop.api.graphql.gen'

export const propRepository: IPropRepository = {
  add: async (prop: IPropModel) => {
    const {
      createProps: { props },
    } = await CreateProps({
      input: [prop.toCreateInput()],
    })

    const createdProp = props[0]

    assertIsDefined(createdProp)

    return createdProp
  },

  delete: async (props: Array<IPropModel>) => {
    const {
      deleteProps: { nodesDeleted },
    } = await DeleteProps({
      where: { id_IN: props.map((prop) => prop.id) },
    })

    return nodesDeleted
  },

  find: async (where?: PropWhere, options?: PropOptions) => {
    return await GetProps({ options, where })
  },

  findOne: async (where: PropUniqueWhere) => {
    return (await propRepository.find(where)).items[0]
  },

  update: async (prop: IPropModel) => {
    const {
      updateProps: { props },
    } = await UpdateProps({
      update: prop.toUpdateInput(),
      where: { id: prop.id },
    })

    const updatedProp = props[0]

    return updatedProp
  },
}
