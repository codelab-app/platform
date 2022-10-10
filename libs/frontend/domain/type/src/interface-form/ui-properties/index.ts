import { IAnyType, ITypeOf } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { UiPropertiesContext, UiPropertiesFn } from '../types'
import { actionTypeUiProperties } from './actionTypeUiProperties'
import { appTypeUiProperties } from './appTypeUiProperties'
import { codeMirrorTypeUiProperties } from './codeMirrorTypeUiProperties'
import { elementTypeUiProperties } from './elementTypeUiProperties'
import { lambdaTypeUiProperties } from './lambdaTypeUiProperties'
import { pageTypeUiProperties } from './pageTypeUiProperties'
import { primitiveTypeUiProperties } from './primativeUiProperties'
import { selectComponentUiProperties } from './selectComponentUiProperties'
import { unionTypeUiProperties } from './unionTypeUiProperties'

type UniformsPropertiesContainer = Partial<{
  [TKind in ITypeKind]: UiPropertiesFn<ITypeOf<TKind>>
}>

// Handles all 'ui' json schema properties that should be added for specific types
// We don't set them in the json schema, because they are needed only when rendering a form with Uniforms
// Register ui properties for new types here
const uiPropertiesContainer: UniformsPropertiesContainer = {
  [ITypeKind.UnionType]: unionTypeUiProperties,
  [ITypeKind.ReactNodeType]: selectComponentUiProperties,
  [ITypeKind.RenderPropsType]: selectComponentUiProperties,
  [ITypeKind.ElementType]: elementTypeUiProperties,
  [ITypeKind.CodeMirrorType]: codeMirrorTypeUiProperties,
  [ITypeKind.PrimitiveType]: primitiveTypeUiProperties,
  [ITypeKind.LambdaType]: lambdaTypeUiProperties,
  [ITypeKind.AppType]: appTypeUiProperties,
  [ITypeKind.ActionType]: actionTypeUiProperties,
  [ITypeKind.PageType]: pageTypeUiProperties,
}

export const getUiProperties = (
  type: IAnyType,
  context?: UiPropertiesContext,
) => {
  const fn: UiPropertiesFn | undefined = uiPropertiesContainer[type.kind] as
    | UiPropertiesFn
    | undefined

  if (!fn) {
    return {}
  }

  return fn(type, context)
}
