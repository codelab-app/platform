'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { GetAtomsQueryVariables } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import { AtomListDocument } from './atom-list.document'

export const atomListRepository = async ({
  options,
  where,
}: GetAtomsQueryVariables): Promise<{
  atoms: Array<IAtomDto>
}> => {
  const { atoms } = await gqlFetch(
    AtomListDocument,
    { options, where },
    { tags: [CACHE_TAGS.ATOM_LIST] },
  )

  return { atoms }
}
