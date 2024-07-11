'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import type { GetAtomsQueryVariables } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import { GetAtomsListQuery } from './atoms-list.query'

export const atomListAction = async ({
  options,
  where,
}: GetAtomsQueryVariables): Promise<{
  atoms: Array<IAtomDto>
}> => {
  const { atoms } = await execute(
    GetAtomsListQuery,
    { options, where },
    { tags: [CACHE_TAGS.ATOM_LIST] },
  )

  return { atoms }
}
