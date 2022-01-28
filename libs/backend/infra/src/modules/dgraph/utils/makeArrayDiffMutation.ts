import { IMutationFactory } from '@codelab/backend/abstract/core'
import { EntityLike, Nullish } from '@codelab/shared/abstract/types'
import { entityIdSet, entityMapById } from '@codelab/shared/utils'
import { Mutation } from 'dgraph-js-http'
import R from 'ramda'
import { mergeMutations } from './mergeMutations'

interface ItemsByStatus<T> {
  toDelete: Array<T>
  toUpdate: Array<[T, T]> // [entity, oldEntity]
  toCreate: Array<T>
}

const groupItemsByStatus = <T extends EntityLike>(
  arrayA: Array<T>,
  arrayB: Array<T>,
): ItemsByStatus<T> => {
  const bIdMap: Map<string, T> = entityMapById(arrayB)
  const aIdSet: Set<string> = entityIdSet(arrayA)
  const isContainedInA = (item: T) => aIdSet.has(item.id)
  const isContainedInB = (item: T) => bIdMap.has(item.id)
  const toCreate: Array<T> = arrayB.filter(R.compose(R.not, isContainedInA))
  const [toUpdate, toDelete] = R.partition(isContainedInB, arrayA)
  const getBAndA = (a: T): [T, T] => [bIdMap.get(a.id) as T, a]

  return { toCreate, toDelete, toUpdate: toUpdate.map(getBAndA) }
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
export const makeArrayDiffMutation = <T extends EntityLike>(
  a: Nullish<Array<T>>,
  b: Nullish<Array<T>>,
  mutationFactory: IMutationFactory<T>,
): Mutation => {
  const items = groupItemsByStatus(a ?? [], b ?? [])

  const mutationForUpdate = ([e, old]: [T, T]) =>
    mutationFactory.forUpdate(e, old)

  const mutationForDelete = mutationFactory.forDelete
  const mutationForCreate = (e: T) => mutationFactory.forCreate(e, undefined)

  return mergeMutations(
    ...items.toCreate.map(mutationForCreate),
    ...items.toDelete.map(mutationForDelete),
    ...items.toUpdate.map(mutationForUpdate),
  )
}
