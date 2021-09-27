import { createUnionType } from '@nestjs/graphql'
import { ArrayType } from './array-type.model'
import { ComponentType } from './component-type.model'
import { ElementType } from './element-type.model'
import { EnumType } from './enum-type'
import { InterfaceType } from './interface-type.model'
import { LambdaType } from './lambda-type.model'
import { PrimitiveType } from './primitive-type'
import { RenderPropsType } from './render-props-type.model'

export const TypeVertex = createUnionType({
  name: 'TypeVertex',
  types: () => [
    EnumType,
    PrimitiveType,
    ArrayType,
    ComponentType,
    ElementType,
    InterfaceType,
    LambdaType,
    RenderPropsType,
  ],
})

export type TypeVertex = typeof TypeVertex
