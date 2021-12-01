import { IType, TypeKind } from '@codelab/shared/abstract/core'
import { createUnionType } from '@nestjs/graphql'
import { AppType } from './app-type.model'
import { ArrayType } from './array-type.model'
import { ComponentType } from './component-type.model'
import { ElementType } from './element-type.model'
import { EnumType } from './enum-type'
import { InterfaceType } from './interface-type.model'
import { LambdaType } from './lambda-type.model'
import { MonacoType } from './monaco-type.model'
import { PageType } from './page-type.model'
import { PrimitiveType } from './primitive-type.model'
import { ReactNodeType } from './react-node-type.model'
import { RenderPropsType } from './render-props-type.model'
import { UnionType } from './union-type.model'

const typeKindMap: Record<TypeKind, any> = {
  [TypeKind.InterfaceType]: InterfaceType,
  [TypeKind.EnumType]: EnumType,
  [TypeKind.UnionType]: UnionType,
  [TypeKind.RenderPropsType]: RenderPropsType,
  [TypeKind.AppType]: AppType,
  [TypeKind.PageType]: PageType,
  [TypeKind.LambdaType]: LambdaType,
  [TypeKind.ElementType]: ElementType,
  [TypeKind.ComponentType]: ComponentType,
  [TypeKind.ArrayType]: ArrayType,
  [TypeKind.PrimitiveType]: PrimitiveType,
  [TypeKind.ReactNodeType]: ReactNodeType,
  [TypeKind.MonacoType]: MonacoType,
}

export const TypeVertex = createUnionType({
  name: 'TypeVertex',
  resolveType: (type: IType) => typeKindMap[type.typeKind],
  types: () => [
    EnumType,
    PrimitiveType,
    ArrayType,
    ComponentType,
    ElementType,
    InterfaceType,
    LambdaType,
    PageType,
    AppType,
    RenderPropsType,
    ReactNodeType,
    UnionType,
    MonacoType,
  ],
})

export type TypeVertex = typeof TypeVertex
