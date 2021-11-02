import {
  IEdge,
  IType,
  ITypeEdge,
  typeEdgeIsField,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { CollectionReturnValue, SingularElementArgument } from 'cytoscape'
import { getCyElementData } from '../cytoscape/element'

export const getTypeFromNode = (e: SingularElementArgument) =>
  getCyElementData<IType>(e)

export const typeIsOfKind =
  (kind: TypeKind) => (node: SingularElementArgument) =>
    getTypeFromNode(node)?.typeKind === kind

export const edgeIsOfFieldKind = (e: SingularElementArgument) => {
  const edge = getCyElementData<ITypeEdge>(e)

  if (!edge) {
    return false
  }

  return typeEdgeIsField(edge)
}

export const getFieldFromEdge = (e: SingularElementArgument) => {
  const edge = getCyElementData<IEdge>(e)

  if (edge && typeEdgeIsField(edge)) {
    return edge
  }

  return null
}

export const getTypesOfUnionTypeFromNode = (
  TypesOfUnionType: CollectionReturnValue,
) =>
  TypesOfUnionType.outgoers()
    .nodes()
    .map((node) => {
      const type = getTypeFromNode(node)

      if (!type) {
        throw new Error(`Cant find type of node ${node.id} in the type tree`)
      }

      return type
    })

export const getItemTypeFromNode = (arrayTypeNode: CollectionReturnValue) =>
  getTypeFromNode(arrayTypeNode.outgoers().nodes().first())
