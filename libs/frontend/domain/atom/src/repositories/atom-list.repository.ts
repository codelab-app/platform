'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import {
  type AtomListQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IAtomDto } from '@codelab/shared/abstract/core'

const AtomListDocument = graphql(`
  query AtomList($options: AtomOptions, $where: AtomWhere) {
    atoms(options: $options, where: $where) {
      ...Atom
    }
  }
`)

export const atomListRepository = async ({
  options,
  where,
}: AtomListQueryVariables): Promise<{
  atoms: Array<IAtomDto>
}> => {
  const { atoms } = await gqlFetch(
    AtomListDocument,
    { options, where },
    { tags: [CACHE_TAGS.ATOM_LIST] },
  )

  return { atoms }
}
