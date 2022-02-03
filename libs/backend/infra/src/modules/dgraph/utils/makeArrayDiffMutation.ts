import { IMutationFactory } from '@codelab/backend/abstract/core'
import { EntityLike, Nullish } from '@codelab/shared/abstract/types'
import { groupItemsByArrayDiff } from '@codelab/shared/utils'
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
export const makeArrayDiffMutation = <T extends EntityLike>(
  a: Nullish<Array<T>>,
  b: Nullish<Array<T>>,
  mutationFactory: IMutationFactory<T>,
): Mutation => {
  const items = groupItemsByArrayDiff(a ?? [], b ?? [])

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
