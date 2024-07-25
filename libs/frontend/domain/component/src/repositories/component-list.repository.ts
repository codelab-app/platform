'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { type ComponentListQueryVariables } from '@codelab/frontend/infra/gql'
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
