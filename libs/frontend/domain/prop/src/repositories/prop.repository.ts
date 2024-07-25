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
import { propApi } from './prop.api'

export const propRepository: IPropRepository = {
  add: async (prop: IPropModel) => {
    const {
      createProps: { props },
    } = await propApi.CreateProps({
      input: [prop.toCreateInput()],
    })

    const createdProp = props[0]

    assertIsDefined(createdProp)

    return createdProp
  },

  delete: async (props: Array<IPropModel>) => {
    const {
      deleteProps: { nodesDeleted },
    } = await propApi.DeleteProps({
      where: { id_IN: props.map((prop) => prop.id) },
    })

    return nodesDeleted
  },

  find: async (where?: PropWhere, options?: PropOptions) => {
    return await propApi.GetProps({ options, where })
  },

  findOne: async (where: PropUniqueWhere) => {
    return (await propRepository.find(where)).items[0]
  },

  update: async (prop: IPropModel) => {
    const {
      updateProps: { props },
    } = await propApi.UpdateProps({
      update: prop.toUpdateInput(),
      where: { id: prop.id },
    })

    const updatedProp = props[0]

    return updatedProp
  },
}
