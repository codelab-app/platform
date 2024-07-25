'use server'

import {
  CACHE_TAGS,
  type IAtomRepository,
} from '@codelab/frontend/abstract/domain'
import { type AtomOptions, type AtomWhere } from '@codelab/frontend/infra/gql'
import { atomApi } from './atom.api'

export const atomListRepository: IAtomRepository['find'] = async (
  where?: AtomWhere,
  options?: AtomOptions,
) => {
  const results = await atomApi.AtomList(
    { options, where },
    { tags: [CACHE_TAGS.ATOM_LIST] },
  )

  return results
}
