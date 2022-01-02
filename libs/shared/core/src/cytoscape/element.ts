import { Maybe, MaybeOrNullable } from '@codelab/shared/abstract/types'
import { SingularElementArgument } from 'cytoscape'

/**
 * Extracts our data property from cytoscape's element.
 * Cy uses node or edge terminology, an element is either one of those
 */
export const getCyElementData = <TData = any>(
  cyElement?: SingularElementArgument,
): Maybe<TData> => cyElement?.data()?.data

export const isDefined = <TData>(item: MaybeOrNullable<TData>): item is TData =>
  !!item
