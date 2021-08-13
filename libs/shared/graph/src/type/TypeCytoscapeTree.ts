import { TypeKind } from '@codelab/ddd/types'
import { CollectionReturnValue, Core, SingularElementArgument } from 'cytoscape'
import { IFieldVertex, ITypeTree, ITypeVertex, TypeEdgeKind } from './contracts'

export type TypeClassifierFn = (type: ITypeVertex) => TypeKind

//
// Node / Edge helpers:
//

const edgeIsOfFieldKind = (e: SingularElementArgument) =>
  e.data().kind === TypeEdgeKind.Field && !!e.data().field

const typeIsOfKind =
  (kind: TypeKind, classifier: TypeClassifierFn) =>
  (node: SingularElementArgument) =>
    classifier(getTypeFromNode(node)) === kind

const getFieldFromEdge = (e: SingularElementArgument) =>
  e.data().field as IFieldVertex

const getTypeFromNode = (e: SingularElementArgument) => e.data() as ITypeVertex

const getItemTypeFromNode = (arrayTypeNode: CollectionReturnValue) =>
  getTypeFromNode(arrayTypeNode.outgoers(arrayItemEdgeSelector).nodes().first())

const arrayItemEdgeSelector = `[kind=${TypeEdgeKind.ArrayItem}]`

/**
 * A Cytoscape implementation of a TypeTree
 */
export class TypeCytoscapeTree implements ITypeTree {
  constructor(
    private readonly cy: Core,
    private readonly typeClassifier: TypeClassifierFn,
  ) {}

  getTypeKind(typeOrId: ITypeVertex | string): TypeKind | null {
    if (typeof typeOrId === 'string') {
      const type = this.getType(typeOrId)

      if (!type) {
        return null
      }

      return this.typeClassifier(type)
    }

    return this.typeClassifier(typeOrId)
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

  getFieldsOf(typeId: string) {
    return this.cy
      .getElementById(typeId)
      .connectedEdges()
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
      vertices = vertices.filter(typeIsOfKind(typeKind, this.typeClassifier))
    }

    return vertices.map(getTypeFromNode)
  }
}
