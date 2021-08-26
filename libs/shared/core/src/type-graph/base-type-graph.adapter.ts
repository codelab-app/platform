import {
  IFieldVertex,
  ITypeVertex,
  TypeEdgeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import {
  __TypeEdgeFragment,
  __TypeFragment,
  __TypeGraphFragment,
} from '@codelab/shared/codegen/graphql'
import { CollectionReturnValue, SingularElementArgument } from 'cytoscape'
import { edgeId } from '../graph/edge'
import { TreeAdapter } from '../tree/tree.adapter'

type Vertex = __TypeFragment
type Edge = __TypeEdgeFragment

export const getTypeFromNode = (e: SingularElementArgument) =>
  e.data() as ITypeVertex

export const typeIsOfKind =
  (kind: TypeKind) => (node: SingularElementArgument) =>
    getTypeFromNode(node).typeKind === kind

export const edgeIsOfFieldKind = (e: SingularElementArgument) =>
  e.data().kind === TypeEdgeKind.Field && !!e.data().field

export const getFieldFromEdge = (e: SingularElementArgument) =>
  e.data().field as IFieldVertex

export const getItemTypeFromNode = (arrayTypeNode: CollectionReturnValue) =>
  getTypeFromNode(arrayTypeNode.outgoers(arrayItemEdgeSelector).nodes().first())

const arrayItemEdgeSelector = `[kind=${TypeEdgeKind.ArrayItem}]`

export class BaseTypeGraphAdapter extends TreeAdapter<Vertex, Edge> {
  constructor(graph?: __TypeGraphFragment | null) {
    const extractEdgeId = (e: Edge) => {
      if (!e.field?.id) {
        return edgeId(e)
      }

      return e.field.id
    }

    super(graph, extractEdgeId)
  }

  getFieldType(fieldId: string) {
    const node = this.cy.getElementById(fieldId).targets().first()

    return node ? getTypeFromNode(node) : null
  }

  getFields(typeId: string) {
    return this.cy
      .getElementById(typeId)
      .connectedEdges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }

  getRootFields() {
    return this.cy
      .nodes()
      .roots()
      .first()
      .connectedEdges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }

  getFieldsByTypeKind(typeKind: TypeKind) {
    return this.cy
      .elements()
      .filter(typeIsOfKind(typeKind))
      .incomers()
      .edges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }
}
