import { SingularElementArgument } from 'cytoscape'

/**
 * Cy uses node or edge terminology, an element is either one of those
 */
export const getElementData = (element: SingularElementArgument) =>
  element?.data()?.data
