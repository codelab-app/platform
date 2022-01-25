import { Nullish } from '@codelab/shared/abstract/types'
import { SingularElementArgument } from 'cytoscape'
import { getCyElementData } from '../cytoscape/element'

export type Predicate<T> = (item: T) => boolean

export type InstancePredicate<TItem, TExpected extends TItem> = (
  item: TItem,
) => item is TExpected

export const filterDataPredicate =
  <TData>(guard: Predicate<TData>) =>
  (data: Nullish<TData>) => {
    if (!data) {
      return false
    }

    return guard(data)
  }

export const filterPredicate =
  <TData>(guard: Predicate<TData>) =>
  (node: SingularElementArgument) => {
    const data = getCyElementData<TData>(node)

    if (!data) {
      return false
    }

    return guard(data)
  }
