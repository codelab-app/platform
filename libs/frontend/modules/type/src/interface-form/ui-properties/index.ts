import { IAnyType, ITypeKind, ITypeOf } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'
import { appTypeUiProperties } from './appTypeUiProperties'
import { elementTypeUiProperties } from './elementTypeUiProperties'
import { lambdaTypeUiProperties } from './lambdaTypeUiProperties'
import { monacoTypeUiProperties } from './monacoTypeUiProperties'
import { pageTypeUiProperties } from './pageTypeUiProperties'
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
  [ITypeKind.MonacoType]: monacoTypeUiProperties,
  [ITypeKind.LambdaType]: lambdaTypeUiProperties,
  [ITypeKind.AppType]: appTypeUiProperties,
  [ITypeKind.PageType]: pageTypeUiProperties,
}

export const getUiProperties = (type: IAnyType) => {
  const fn: UiPropertiesFn | undefined = uiPropertiesContainer[type.kind] as any

  if (!fn) {
    return {}
  }

  return fn(type)
}
