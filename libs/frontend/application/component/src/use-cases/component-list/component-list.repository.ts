'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { GetComponentsQueryVariables } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IComponentDto } from '@codelab/shared/abstract/core'
import { ComponentListDocument } from './component-list.document'

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
