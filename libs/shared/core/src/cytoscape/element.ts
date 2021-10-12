import { SingularElementArgument } from 'cytoscape'

/**
 * Extracts our data property from cytoscape's element.
 * Cy uses node or edge terminology, an element is either one of those
 */
export const getCyElementData = <TData = any>(
  cyElement?: SingularElementArgument,
): TData | undefined => cyElement?.data()?.data
