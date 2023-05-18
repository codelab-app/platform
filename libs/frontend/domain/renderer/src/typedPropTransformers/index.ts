import { ITypeKind } from '@codelab/shared/abstract/core'
import { objectMap } from 'mobx-keystone'
import { ActionTypeTransformer } from './ActionTypeTransformer'
import { ElementTypeTransformer } from './ElementTypeTransformer'
import { ReactNodeTypeTransformer } from './ReactNodeTypeTransformer'
import { RenderPropTypeTransformer } from './RenderPropTypeTransformer'

export const typedPropTransformersFactory = () =>
  objectMap([
    [ITypeKind.ActionType, new ActionTypeTransformer({})],
    [ITypeKind.ElementType, new ElementTypeTransformer({})],
    [ITypeKind.ReactNodeType, new ReactNodeTypeTransformer({})],
    [ITypeKind.RenderPropType, new RenderPropTypeTransformer({})],
  ])
