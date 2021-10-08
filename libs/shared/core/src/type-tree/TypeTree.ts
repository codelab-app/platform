import {
  IBaseType,
  IFieldEdge,
  IGraph,
  IJsonSchemaOptions,
  IType,
  ITypeEdge,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { isDefined } from '../cytoscape/element'
import { edgeId } from '../graph/edgeId'
import { TreeService } from '../tree'
import { TypeTreeJsonSchemaTransformer } from './jsonSchema'
import {
  getFieldFromEdge,
  getItemTypeFromNode,
  getTypeFromNode,
  getTypesOfUnionTypeFromNode,
  typeIsOfKind,
} from './treeHelpers'

export class TypeTree extends TreeService<IBaseType, ITypeEdge> {
  constructor(graph: IGraph<IBaseType, ITypeEdge>) {
    const extractEdgeId = (e: ITypeEdge) => {
      const id = (e as any).id

      if (id) {
        return id
      }

      return edgeId(e)
    }

    super(graph, extractEdgeId)
  }

  getTypeById(typeId: string): IType | null {
    const node = this.cy.getElementById(typeId).first()

    return node ? (getTypeFromNode(node) as IType) ?? null : null
  }

  /** Returns the type of the field or null if the field is not found */
  getFieldType(fieldId: string): IType | null {
    const node = this.cy.getElementById(fieldId).targets().first()

    return node ? (getTypeFromNode(node) as IType) ?? null : null
  }

  /** Returns all the root fields in the tree, or an empty array if none */
  getFields(typeId: string): Array<IFieldEdge> {
    return this.cy
      .getElementById(typeId)
      .connectedEdges()
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
            console.log({ parsedElement })

            return parsedElement?.typeKind === type
          })

        console.log({ fields, isUnionReactTypeNodeType })

        return { fields, isUnionReactTypeNodeType }
      })
      .filter((parsedData) => parsedData.isUnionReactTypeNodeType)
      .reduce<Array<IFieldEdge>>(
        (aggregatedFields, { fields }) => aggregatedFields.concat(fields),
        [],
      )
  }

  getRootFields(): Array<IFieldEdge> {
    return this.cy
      .nodes()
      .roots()
      .first()
      .connectedEdges()
      .map(getFieldFromEdge)
      .filter(isDefined)
  }

  /** Returns all the fields with a type kind. Returns an empty array if the type doesn't have any fields (e.g.. if it's not an interface) */
  getFieldsByTypeKind(typeKind: TypeKind): Array<IFieldEdge> {
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
  getArrayItemType(arrayTypeId: string): IType | undefined {
    return (
      (getItemTypeFromNode(this.cy.getElementById(arrayTypeId)) as IType) ??
      undefined
    )
  }

  /** Returns all types, or all types by typeKind if provided */
  getTypes(typeKind: TypeKind | undefined): Array<IType> {
    let vertices = this.cy.elements()

    if (typeKind) {
      vertices = vertices.filter(typeIsOfKind(typeKind))
    }

    return vertices.map(getTypeFromNode).filter((v): v is IType => !!v)
  }

  /** Creates a json schema from the type tree. Throws if the tree doesn't have fields */
  toJsonSchema(
    options: IJsonSchemaOptions,
    formModel?: any,
  ): Record<string, any> {
    return new TypeTreeJsonSchemaTransformer(
      this,
      options,
      formModel,
    ).transform()
  }
}
