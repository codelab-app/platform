import {
  IField,
  ITypeEdge,
  ITypeVertex,
  TypeEdgeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { CollectionReturnValue, SingularElementArgument } from 'cytoscape'
import { getCyElementData } from '../cytoscape/element'

export const getTypeFromNode = (e: SingularElementArgument) =>
  getCyElementData<ITypeVertex>(e)

export const typeIsOfKind =
  (kind: TypeKind) => (node: SingularElementArgument) =>
    getTypeFromNode(node)?.typeKind === kind

export const edgeIsOfFieldKind = (e: SingularElementArgument) => {
  const edge = getCyElementData<ITypeEdge>(e)

  if (!edge) {
    return false
  }

  return edge?.kind === TypeEdgeKind.Field && !!edge.field
}

export const getFieldFromEdge = (e: SingularElementArgument) =>
  e.data().field as IField

export const getItemTypeFromNode = (arrayTypeNode: CollectionReturnValue) =>
  getTypeFromNode(arrayTypeNode.outgoers(arrayItemEdgeSelector).nodes().first())

export const arrayItemEdgeSelector = `[kind=${TypeEdgeKind.ArrayItem}]`
