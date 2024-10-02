'use server'

import type { AtomUniqueWhere } from '@codelab/shared/infra/gql'

import { AtomList } from './atom.api.graphql.gen'

export const atomListQuery = async (where: AtomUniqueWhere) => {
  return await AtomList({ where }, { tags: [] })
}

export const atomQuery = async (where: AtomUniqueWhere) => {
  const { items } = await atomListQuery(where)

  return items[0]
}
