import { ITypeKind } from '@codelab/shared/abstract/core'
import { objectMap } from 'mobx-keystone'
import { ActionTypeTransformer } from './ActionTypeTransformer'
import { ElementTypedValueTransformer } from './ElementTypeTransformer'
import { ReactNodeTypedValueTransformer } from './ReactNodeTypeTransformer'
import { RenderPropTypedValueTransformer } from './RenderPropTypedValueTransformer'

export const typedPropTransformersFactory = () =>
  objectMap([
    [ITypeKind.ReactNodeType, new ReactNodeTypedValueTransformer({})],
    [ITypeKind.RenderPropType, new RenderPropTypedValueTransformer({})],
    [ITypeKind.ElementType, new ElementTypedValueTransformer({})],
    [ITypeKind.ActionType, new ActionTypeTransformer({})],
  ])
