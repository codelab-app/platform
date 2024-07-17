'use server'

import {
  CACHE_TAGS,
  type IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import {
  type AtomListQueryVariables,
  type AtomOptions,
  type AtomWhere,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IAtomDto } from '@codelab/shared/abstract/core'

const AtomListDocument = graphql(`
  query AtomList($options: AtomOptions, $where: AtomWhere) {
    aggregate: atomsAggregate(where: $where) {
      count
    }
    items: atoms(options: $options, where: $where) {
      ...Atom
    }
  }
`)

export const atomListRepository: IAtomRepository['find'] = async (
  where?: AtomWhere,
  options?: AtomOptions,
) => {
  const results = await gqlFetch(
    AtomListDocument,
    { options, where },
    { tags: [CACHE_TAGS.ATOM_LIST] },
  )

  return results
}
