'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { GetComponentsQueryVariables } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import type { IComponentDto } from '@codelab/shared/abstract/core'
import { GetComponentsListQuery } from './component-list.query'

export const componentListAction = async ({
  options,
  where,
}: GetComponentsQueryVariables): Promise<{
  components: Array<IComponentDto>
}> => {
  const { components } = await execute(
    GetComponentsListQuery,
    { options, where },
    { tags: [CACHE_TAGS.COMPONENTS_LIST] },
  )

  return { components }
}
