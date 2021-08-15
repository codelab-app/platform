import { DgraphEntityType } from '@codelab/backend/infra'
import { TypeKind } from '@codelab/shared/graph'
import {
  ArrayType,
  ComponentType,
  ElementType,
  EnumType,
  InterfaceType,
  LambdaType,
  PrimitiveType,
  Type,
} from './index'

interface TypeDefinition {
  typeModelClass: { new (...args: Array<any>): Type }
  typeKind: TypeKind
  dgraphType: DgraphEntityType
}

/** A single source of truth that connects type kinds throughout all layers */
export const typeDefinitions: Array<TypeDefinition> = [
  {
    typeModelClass: ArrayType,
    typeKind: TypeKind.ArrayType,
    dgraphType: DgraphEntityType.ArrayType,
  },
  {
    typeModelClass: EnumType,
    typeKind: TypeKind.EnumType,
    dgraphType: DgraphEntityType.EnumType,
  },

  {
    typeModelClass: PrimitiveType,
    typeKind: TypeKind.PrimitiveType,
    dgraphType: DgraphEntityType.PrimitiveType,
  },

  {
    typeModelClass: ComponentType,
    typeKind: TypeKind.ComponentType,
    dgraphType: DgraphEntityType.ComponentType,
  },

  {
    typeModelClass: ElementType,
    typeKind: TypeKind.ElementType,
    dgraphType: DgraphEntityType.ElementType,
  },

  {
    typeModelClass: InterfaceType,
    typeKind: TypeKind.InterfaceType,
    dgraphType: DgraphEntityType.InterfaceType,
  },

  {
    typeModelClass: LambdaType,
    typeKind: TypeKind.LambdaType,
    dgraphType: DgraphEntityType.LambdaType,
  },
]
