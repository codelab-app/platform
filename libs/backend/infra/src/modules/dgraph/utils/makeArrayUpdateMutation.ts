import { Mutation } from 'dgraph-js-http'
import { mergeMutations } from './mergeMutations'

/**
 * Returns a mutation that will turn the db to the state of updating the array a
 * with the value of the array b
 *
 * If b is falsy, all items of a are deleted
 * If b contains items that are not in a, they are created
 * If b contains items that are in a, they are updated
 * If a contains items that are not in b, they are deleted
 * */
export const makeArrayUpdateMutation = <T extends { id?: string | null }>(
  a: Array<T> | undefined | null,
  b: Array<T> | undefined | null,
  createMutationFactory: (entity: T) => Mutation,
  updateMutationFactory: (entity: T, oldEntity: T) => Mutation,
  deleteMutationFactory: (entity: T) => Mutation,
): Mutation => {
  const itemsToDelete: Array<T> = []
  const itemsToUpdate: Array<[T, T]> = [] // [entity, oldEntity]
  const itemsToCreate: Array<T> = []

  if (a && b) {
    for (const aItem of a) {
      const indexInB = b.findIndex((i) => i.id === aItem.id)

      if (indexInB === -1) {
        itemsToDelete.push(aItem)
      } else {
        itemsToUpdate.push([b[indexInB], aItem])
      }
    }

    for (const bItem of b) {
      const indexInA = a.findIndex((i) => i.id === bItem.id)

      if (indexInA === -1) {
        itemsToCreate.push(bItem)
      }
    }
  } else if (a) {
    itemsToDelete.push(...a)
  } else if (b) {
    itemsToCreate.push(...b)
  }

  const mutations: Array<Mutation> = []

  for (const item of itemsToDelete) {
    mutations.push(deleteMutationFactory(item))
  }

  for (const [entity, oldEntity] of itemsToUpdate) {
    mutations.push(updateMutationFactory(entity, oldEntity))
  }

  for (const item of itemsToCreate) {
    mutations.push(createMutationFactory(item))
  }

  return mergeMutations(...mutations)
}
