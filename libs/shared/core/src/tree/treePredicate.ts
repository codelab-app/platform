import { SingularElementArgument } from 'cytoscape'
import { getCyElementData } from '../cytoscape/element'

export type Predicate<T> = (item: T) => boolean

export type InstancePredicate<TItem, TExpected extends TItem> = (
  item: TItem,
) => item is TExpected

export const filterPredicate =
  <TData>(guard: Predicate<TData>) =>
  (node: SingularElementArgument) => {
    const data = getCyElementData<TData>(node)

    if (!data) {
      return false
    }

    return guard(data)
  }
