import {
  IField,
  IGraph,
  IType,
  ITypeEdge,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { isDefined } from '../cytoscape/element'
import { edgeId } from '../graph/edgeId'
import { NodeMapperFn, TreeService } from '../tree'
import {
  addTypeToJsonSchema,
  TransformTypeOptions,
  transformTypeToJsonSchema,
} from './json-schema-transform'
import {
  getFieldFromEdge,
  getItemTypeFromNode,
  getTypeFromNode,
  getTypesOfUnionTypeFromNode,
  typeIsOfKind,
} from './treeHelpers'

export class TypeTree extends TreeService<IType, ITypeEdge> {
  constructor(graph: IGraph<IType, ITypeEdge>) {
    const extractEdgeId = (e: ITypeEdge) => {
      const id = (e as any).id

      if (id) {
        return id
      }

      return edgeId(e)
    }

    super(graph, extractEdgeId)
  }

  getTypeById(typeId: string): Nullable<IType> {
    const node = this.cy.getElementById(typeId).first()

    return node ? (getTypeFromNode(node) as IType) ?? null : null
  }

  /** Returns the type of the field or null if the field is not found */
  getFieldType(fieldId: string): Nullable<IType> {
    const node = this.cy.getElementById(fieldId).targets().first()

    return node ? (getTypeFromNode(node) as IType) ?? null : null
  }

  /** Returns all the root fields in the tree, or an empty array if none */
  getFields(typeId: string): Array<IField> {
    return this.cy
      .getElementById(typeId)
      .outgoers()
      .map(getFieldFromEdge)
      .filter(isDefined)
  }

  getUnionTypeFieldContainingType(type: TypeKind) {
    return this.cy
      .elements()
      .filter(typeIsOfKind(TypeKind.UnionType))
      .map((unionType) => {
        const fields = unionType
          .nodes()
          .incomers()
          .edges()
          .map(getFieldFromEdge)
          .filter(isDefined)

        const isUnionReactTypeNodeType = unionType
          .nodes()
          .outgoers()
          .some((e) => {
            const parsedElement = e.first().data()

            return parsedElement?.typeKind === type
          })

        return { fields, isUnionReactTypeNodeType }
      })
      .filter((parsedData) => parsedData.isUnionReactTypeNodeType)
      .reduce<Array<IField>>(
        (aggregatedFields, { fields }) => aggregatedFields.concat(fields),
        [],
      )
  }

  getRootFields(): Array<IField> {
    return this.cy
      .nodes()
      .roots()
      .first()
      .connectedEdges()
      .map(getFieldFromEdge)
      .filter(isDefined)
  }

  /** Returns all the fields with a type kind. Returns an empty array if the type doesn't have any fields (e.g.. if it's not an interface) */
  getFieldsByTypeKind(typeKind: TypeKind): Array<IField> {
    return this.cy
      .elements()
      .filter(typeIsOfKind(typeKind))
      .incomers()
      .edges()
      .map(getFieldFromEdge)
      .filter(isDefined)
  }

  getUnionItemTypes(unionTypeId: string): Array<IType> {
    return getTypesOfUnionTypeFromNode(
      this.cy.getElementById(unionTypeId),
    ) as Array<IType>
  }

  /** Returns the item type of an array or undefined if not found */
  getArrayItemType(arrayTypeId: string): Maybe<IType> {
    return (
      (getItemTypeFromNode(this.cy.getElementById(arrayTypeId)) as IType) ??
      undefined
    )
  }

  /** Returns all types, or all types by typeKind if provided */
  getTypes(typeKind: Maybe<TypeKind>): Array<IType> {
    let vertices = this.cy.elements()

    if (typeKind) {
      vertices = vertices.filter(typeIsOfKind(typeKind))
    }

    return vertices.map(getTypeFromNode).filter((v): v is IType => !!v)
  }

  /** Creates a json schema from the type tree */
  toJsonSchema(
    options?: Omit<TransformTypeOptions, 'label'>,
  ): Record<string, any> {
    const nodeMapper: NodeMapperFn<IType, Record<string, any>> = (type) => {
      return transformTypeToJsonSchema(type, options)
    }

    return this.reduceToNested({
      nodeMapper,
      addChildToNode: addTypeToJsonSchema,
    })[0]
  }
}
