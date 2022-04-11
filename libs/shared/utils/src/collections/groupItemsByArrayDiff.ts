import { IIdentifiable } from '@codelab/shared/abstract/types'
import * as R from 'ramda'
import { entityIdSet, entityMapById } from '../entity'

interface ItemsByArrayDiff<T> {
  toDelete: Array<T>
  toUpdate: Array<[T, T]> // [entity, oldEntity]
  toCreate: Array<T>
}

export const groupItemsByArrayDiff = <T extends IIdentifiable>(
  arrayA: Array<T>,
  arrayB: Array<T>,
): ItemsByArrayDiff<T> => {
  const bIdMap: Map<string, T> = entityMapById(arrayB)
  const aIdSet: Set<string> = entityIdSet(arrayA)
  const isContainedInA = (item: T) => aIdSet.has(item.id)
  const isContainedInB = (item: T) => bIdMap.has(item.id)
  const toCreate: Array<T> = arrayB.filter(R.compose(R.not, isContainedInA))
  const [toUpdate, toDelete] = R.partition(isContainedInB, arrayA)
  const getBAndA = (a: T): [T, T] => [bIdMap.get(a.id) as T, a]

  return { toCreate, toDelete, toUpdate: toUpdate.map(getBAndA) }
}
