'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import {
  type ComponentListQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IComponentDto } from '@codelab/shared/abstract/core'
import { componentApi } from './component.api'

export const componentListRepository = async ({
  options,
  where,
}: ComponentListQueryVariables): Promise<{
  components: Array<IComponentDto>
}> => {
  const { items: components } = await componentApi.ComponentList(
    { options, where },
    { tags: [CACHE_TAGS.COMPONENTS_LIST] },
  )

  return { components }
}
