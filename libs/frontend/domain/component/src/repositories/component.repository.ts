import type { IComponentRepository } from '@codelab/frontend/abstract/domain'
import type { IComponentDto, IRef } from '@codelab/shared/abstract/core'
import type {
  ComponentOptions,
  ComponentUniqueWhere,
  ComponentWhere,
} from '@codelab/shared/infra/gql'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/schema'
import { componentMapper } from '@codelab/shared-domain-module/component'

import {
  ComponentList,
  CreateComponents,
  DeleteComponents,
  UpdateComponents,
} from './component.api.graphql.web.gen'

export const componentRepository: IComponentRepository = {
  add: async (input: IComponentDto) => {
    const {
      createComponents: { components },
    } = await CreateComponents(
      { input: componentMapper.toCreateInput(input) },
      { revalidateTag: CACHE_TAGS.COMPONENTS_LIST },
    )

    const createdComponent = components[0]

    Validator.assertsDefined(createdComponent)

    return createdComponent
  },

  delete: async (refs: Array<IRef>) => {
    const {
      deleteComponents: { nodesDeleted },
    } = await DeleteComponents(
      {
        delete: componentMapper.toDeleteInput(),
        where: {
          id_IN: refs.map(({ id }) => id),
        },
      },
      { revalidateTag: CACHE_TAGS.COMPONENTS_LIST },
    )

    return nodesDeleted
  },

  find: async (where?: ComponentWhere, options?: ComponentOptions) => {
    return await ComponentList(
      { options, where },
      { tags: [CACHE_TAGS.COMPONENTS_LIST] },
    )
  },

  findOne: async (where: ComponentUniqueWhere) => {
    return (await componentRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, input: IComponentDto) => {
    const {
      updateComponents: { components },
    } = await UpdateComponents(
      {
        update: componentMapper.toUpdateInput(input),
        where: { id },
      },
      { revalidateTag: CACHE_TAGS.COMPONENTS_LIST },
    )

    const updatedComponent = components[0]

    Validator.assertsDefined(updatedComponent)

    return updatedComponent
  },
}
