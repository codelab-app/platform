import {
  CACHE_TAGS,
  type IComponentModel,
  type IComponentRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  ComponentOptions,
  ComponentUniqueWhere,
  ComponentWhere,
} from '@codelab/shared/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import {
  ComponentList,
  CreateComponents,
  DeleteComponents,
  UpdateComponents,
} from './component.api.graphql.gen'

export const componentRepository: IComponentRepository = {
  add: async (component: IComponentModel) => {
    const {
      createComponents: { components },
    } = await CreateComponents({
      input: component.toCreateInput(),
    })

    const createdComponent = components[0]

    assertIsDefined(createdComponent)

    return createdComponent
  },

  delete: async (components: Array<IComponentModel>) => {
    const {
      deleteComponents: { nodesDeleted },
    } = await DeleteComponents({
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
    return await ComponentList(
      { options, where },
      { tags: [CACHE_TAGS.COMPONENTS_LIST] },
    )
  },

  findOne: async (where: ComponentUniqueWhere) => {
    return (await componentRepository.find(where)).items[0]
  },

  update: async (component: IComponentModel) => {
    const { id } = component

    const {
      updateComponents: { components },
    } = await UpdateComponents({
      update: component.toUpdateInput(),
      where: { id },
    })

    const updatedComponent = components[0]

    assertIsDefined(updatedComponent)

    return updatedComponent
  },
}
