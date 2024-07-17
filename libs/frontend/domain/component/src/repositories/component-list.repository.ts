'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { GetComponentsQueryVariables } from '@codelab/frontend/infra/gql'
import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IComponentDto } from '@codelab/shared/abstract/core'

export const ComponentListDocument = graphql(`
  query GetComponents($options: ComponentOptions, $where: ComponentWhere) {
    components(options: $options, where: $where) {
      ...Component
    }
  }
`)

export const componentListRepository = async ({
  options,
  where,
}: GetComponentsQueryVariables): Promise<{
  components: Array<IComponentDto>
}> => {
  const { components } = await gqlFetch(
    ComponentListDocument,
    { options, where },
    { tags: [CACHE_TAGS.COMPONENTS_LIST] },
  )

  return { components }
}
