import { DgraphEntityType } from '@codelab/backend/infra'
import { TypeKind } from '@codelab/shared/abstract/core'
import {
  ArrayType,
  ComponentType,
  ElementType,
  EnumType,
  InterfaceType,
  LambdaType,
  PrimitiveType,
  ReactNodeType,
  Type,
  UnionType,
} from './index'
import { RenderPropsType } from './types/render-props-type.model'

interface TypeDefinition {
  typeModelClass: { new (...args: Array<any>): Type<TypeKind> }
  typeKind: TypeKind
  dgraphType: DgraphEntityType
}

/** A single source of truth that connects type kinds throughout all layers */
export const typeDefinitions: Array<TypeDefinition> = [
  {
    typeModelClass: ReactNodeType,
    typeKind: TypeKind.ReactNodeType,
    dgraphType: DgraphEntityType.ReactNodeType,
  },
  {
    typeModelClass: RenderPropsType,
    typeKind: TypeKind.RenderPropsType,
    dgraphType: DgraphEntityType.RenderPropsType,
  },
  {
    typeModelClass: UnionType,
    typeKind: TypeKind.UnionType,
    dgraphType: DgraphEntityType.UnionType,
  },
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
