import type { IType, ITypeOf } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { UiPropertiesContext, UiPropertiesFn } from '../types'
import { actionTypeUiProperties } from './action-type-ui-properties'
import { appTypeUiProperties } from './app-type-ui-properties'
import { arrayTypeUiProperties } from './array-type-ui-properties'
import { codeMirrorTypeUiProperties } from './code-mirror-type-ui-properties'
import { elementTypeUiProperties } from './element-type-ui-properties'
import { enumTypeUiProperties } from './enum-type-ui-properties'
import { lambdaTypeUiProperties } from './lambda-type-ui-properties'
import { pageTypeUiProperties } from './page-type-ui-properties'
import { primitiveTypeUiProperties } from './primative-ui-properties'
import { selectComponentUiProperties } from './select-component-ui-properties'
import { unionTypeUiProperties } from './union-type-ui-properties'

type UniformsPropertiesContainer = Partial<{
  [TKind in ITypeKind]: UiPropertiesFn<ITypeOf<TKind>>
}>

// Handles all 'ui' json schema properties that should be added for specific types
// We don't set them in the json schema, because they are needed only when rendering a form with Uniforms
// Register ui properties for new types here
const uiPropertiesContainer: UniformsPropertiesContainer = {
  [ITypeKind.UnionType]: unionTypeUiProperties,
  [ITypeKind.ReactNodeType]: selectComponentUiProperties,
  [ITypeKind.RenderPropType]: selectComponentUiProperties,
  [ITypeKind.ElementType]: elementTypeUiProperties,
  [ITypeKind.CodeMirrorType]: codeMirrorTypeUiProperties,
  [ITypeKind.PrimitiveType]: primitiveTypeUiProperties,
  [ITypeKind.LambdaType]: lambdaTypeUiProperties,
  [ITypeKind.AppType]: appTypeUiProperties,
  [ITypeKind.ActionType]: actionTypeUiProperties,
  [ITypeKind.PageType]: pageTypeUiProperties,
  [ITypeKind.EnumType]: enumTypeUiProperties,
  [ITypeKind.ArrayType]: arrayTypeUiProperties,
}

export const getUiProperties = (type: IType, context?: UiPropertiesContext) => {
  const fn: UiPropertiesFn | undefined = uiPropertiesContainer[type.kind] as
    | UiPropertiesFn
    | undefined

  if (!fn) {
    return {}
  }

  return fn(type, context)
}
