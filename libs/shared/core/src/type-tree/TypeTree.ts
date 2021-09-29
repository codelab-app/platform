import {
  Graph,
  IField,
  IJsonSchemaOptions,
  ITypeEdge,
  ITypeVertex,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { edgeId } from '../graph/edgeId'
import { TreeService } from '../tree'
import { TypeTreeJsonSchemaTransformer } from './jsonSchema'
import {
  edgeIsOfFieldKind,
  getFieldFromEdge,
  getItemTypeFromNode,
  getTypeFromNode,
  typeIsOfKind,
} from './treeHelpers'

export class TypeTree<
  TVertex extends ITypeVertex,
  TEdge extends ITypeEdge,
> extends TreeService<TVertex, TEdge> {
  constructor(graph: Graph<TVertex, TEdge>) {
    const extractEdgeId = (e: TEdge) => {
      if (!e.field?.id) {
        return edgeId(e)
      }

      return e.field.id
    }

    super(graph, extractEdgeId)
  }

  /** Returns the type of the field or null if the field is not found */
  getFieldType(fieldId: string): TVertex | null {
    const node = this.cy.getElementById(fieldId).targets().first()

    return node ? (getTypeFromNode(node) as TVertex) ?? null : null
  }

  /** Returns all the root fields in the tree, or an empty array if none */
  getFields(typeId: string): Array<IField> {
    return this.cy
      .getElementById(typeId)
      .connectedEdges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }

  getRootFields(): Array<IField> {
    return this.cy
      .nodes()
      .roots()
      .first()
      .connectedEdges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }

  /** Returns all the fields with a type kind. Returns an empty array if the type doesn't have any fields (e.g.. if it's not an interface) */
  getFieldsByTypeKind(typeKind: TypeKind): Array<IField> {
    return this.cy
      .elements()
      .filter(typeIsOfKind(typeKind))
      .incomers()
      .edges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }

  /** Returns the item type of an array or undefined if not found */
  getArrayItemType(arrayTypeId: string): TVertex | undefined {
    return (
      (getItemTypeFromNode(this.cy.getElementById(arrayTypeId)) as TVertex) ??
      undefined
    )
  }

  /** Returns all types, or all types by typeKind if provided */
  getTypes(typeKind: TypeKind | undefined): Array<TVertex> {
    let vertices = this.cy.elements()

    if (typeKind) {
      vertices = vertices.filter(typeIsOfKind(typeKind))
    }

    return vertices.map(getTypeFromNode).filter((v): v is TVertex => !!v)
  }

  /** Creates a json schema from the type tree. Throws if the tree doesn't have fields */
  toJsonSchema(options: IJsonSchemaOptions): Record<string, any> {
    return new TypeTreeJsonSchemaTransformer(this, options).transform()
  }
}
