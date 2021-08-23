import {
  IJsonSchemaOptions,
  ITypeTree,
  ITypeVertex,
  TypeKind,
  TypeTreeJsonSchemaTransformer,
} from '@codelab/shared/abstract/core'
import {
  BaseTypeGraphAdapter,
  getItemTypeFromNode,
  getTypeFromNode,
  typeIsOfKind,
} from '@codelab/shared/core'

export class TypeGraphTreeAdapter
  extends BaseTypeGraphAdapter
  implements ITypeTree
{
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
