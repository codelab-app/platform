import { CollectionReturnValue, Core, SingularElementArgument } from 'cytoscape'
import { IFieldVertex, ITypeTree, ITypeVertex } from './contracts'
import { IJsonSchemaOptions } from './contracts/IJsonSchemaOptions'
import { TypeEdgeKind, TypeKind } from './enums'
import { TypeTreeJsonSchemaTransformer } from './jsonSchema'

//
// Node / Edge helpers:
//

const edgeIsOfFieldKind = (e: SingularElementArgument) =>
  e.data().kind === TypeEdgeKind.Field && !!e.data().field

const typeIsOfKind = (kind: TypeKind) => (node: SingularElementArgument) =>
  getTypeFromNode(node).typeKind === kind

const getFieldFromEdge = (e: SingularElementArgument) =>
  e.data().field as IFieldVertex

const getTypeFromNode = (e: SingularElementArgument) => e.data() as ITypeVertex

const getItemTypeFromNode = (arrayTypeNode: CollectionReturnValue) =>
  getTypeFromNode(arrayTypeNode.outgoers(arrayItemEdgeSelector).nodes().first())

const arrayItemEdgeSelector = `[kind=${TypeEdgeKind.ArrayItem}]`

/**
 * A Cytoscape implementation of a TypeTree
 */
export class TypeTree implements ITypeTree {
  constructor(private readonly cy: Core) {}

  getRootFields() {
    return this.cy
      .nodes()
      .roots()
      .first()
      .connectedEdges()
      .filter(edgeIsOfFieldKind)
      .map(getFieldFromEdge)
  }

  getFields(typeId: string) {
    return this.cy
      .getElementById(typeId)
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

  getFieldType(fieldId: string) {
    const node = this.cy.getElementById(fieldId).targets().first()

    return node ? getTypeFromNode(node) : null
  }

  getType(typeId: string) {
    const node = this.cy.getElementById(typeId).first()

    return node ? getTypeFromNode(node) : null
  }

  getArrayItemType(arrayTypeId: string) {
    return getItemTypeFromNode(this.cy.getElementById(arrayTypeId)) ?? null
  }

  getTypes(typeKind: TypeKind | undefined): Array<ITypeVertex> {
    let vertices = this.cy.elements()

    if (typeKind) {
      vertices = vertices.filter(typeIsOfKind(typeKind))
    }

    return vertices.map(getTypeFromNode)
  }

  toJsonSchema(options: IJsonSchemaOptions): Record<string, any> {
    return new TypeTreeJsonSchemaTransformer(this, options).transform()
  }
}
