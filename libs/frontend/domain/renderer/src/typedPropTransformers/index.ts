import { ITypeKind } from '@codelab/shared/abstract/core'
import { objectMap } from 'mobx-keystone'
import { ActionTypeTransformer } from './action-type-transformer'
import { ElementTypeTransformer } from './element-type-transformer'
import { ReactNodeTypeTransformer } from './react-node-type-transformer'
import { RenderPropTypeTransformer } from './render-prop-type-transformer'

export const typedPropTransformersFactory = () =>
  objectMap([
    [ITypeKind.ActionType, new ActionTypeTransformer({})],
    [ITypeKind.ElementType, new ElementTypeTransformer({})],
    [ITypeKind.ReactNodeType, new ReactNodeTypeTransformer({})],
    [ITypeKind.RenderPropType, new RenderPropTypeTransformer({})],
  ])
