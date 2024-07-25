import type {
  IComponentModel,
  IComponentRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  ComponentOptions,
  ComponentUniqueWhere,
  ComponentWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import { componentApi } from './component.api'

export const componentRepository: IComponentRepository = {
  add: async (component: IComponentModel) => {
    const {
      createComponents: { components },
    } = await componentApi.CreateComponents({
      input: component.toCreateInput(),
    })

    const createdComponent = components[0]

    assertIsDefined(createdComponent)

    return createdComponent
  },

  delete: async (components: Array<IComponentModel>) => {
    const {
      deleteComponents: { nodesDeleted },
    } = await componentApi.DeleteComponents({
      delete: {
        api: {},
        props: {},
        store: {},
      },
      where: { id_IN: components.map((component) => component.id) },
    })

    return nodesDeleted
  },

  find: async (where: ComponentWhere, options?: ComponentOptions) => {
    return await componentApi.ComponentList({ options, where })
  },

  findOne: async (where: ComponentUniqueWhere) => {
    return (await componentRepository.find(where)).items[0]
  },

  update: async (component: IComponentModel) => {
    const { id, name } = component

    const {
      updateComponents: { components },
    } = await componentApi.UpdateComponents({
      update: {
        name,
      },
      where: { id },
    })

    const updatedComponent = components[0]

    assertIsDefined(updatedComponent)

    return updatedComponent
  },
}
