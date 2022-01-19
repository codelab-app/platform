import { EntityLike, Nullish } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'
import { IMutationFactory } from '../persistance'
import { mergeMutations } from './mergeMutations'

interface ItemsByStatus<T> {
  toDelete: Array<T>
  toUpdate: Array<[T, T]> // [entity, oldEntity]
  toCreate: Array<T>
}

const groupItemsByStatus = <T extends EntityLike>(
  a: Array<T>,
  b: Array<T>,
): ItemsByStatus<T> => {
  const items: ItemsByStatus<T> = { toDelete: [], toUpdate: [], toCreate: [] }
  const bMapById = new Map(b.map((i) => [i.id, i]))

  for (const aItem of a) {
    const bItem = bMapById.get(aItem.id)

    if (bItem) {
      items.toUpdate.push([bItem, aItem])
    } else {
      items.toDelete.push(aItem)
    }
  }

  const aIdSet = new Set(a.map(({ id }) => id))

  for (const bItem of b) {
    const aHasIt = aIdSet.has(bItem.id)

    if (!aHasIt) {
      items.toCreate.push(bItem)
    }
  }

  return items
}

/**
 * Returns a mutation that will turn the db to the state of updating the array a
 * with the value of the array b
 *
 * If b is falsy, all items of a are deleted
 * If b contains items that are not in a, they are created
 * If b contains items that are in a, they are updated
 * If a contains items that are not in b, they are deleted
 * */
export const makeArrayUpdateMutation = <T extends EntityLike>(
  a: Nullish<Array<T>>,
  b: Nullish<Array<T>>,
  mutationFactory: IMutationFactory<T>,
): Mutation => {
  const items = groupItemsByStatus(a ?? [], b ?? [])
  const mutations: Array<Mutation> = []

  for (const item of items.toDelete) {
    mutations.push(mutationFactory.forDelete(item))
  }

  for (const [entity, oldEntity] of items.toUpdate) {
    mutations.push(mutationFactory.forUpdate(entity, oldEntity))
  }

  for (const item of items.toCreate) {
    mutations.push(mutationFactory.forCreate(item))
  }

  return mergeMutations(...mutations)
}
