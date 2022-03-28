import { IAnyType } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'
import { appTypeUiProperties } from './appTypeUiProperties'
import { elementTypeUiProperties } from './elementTypeUiProperties'
import { lambdaTypeUiProperties } from './lambdaTypeUiProperties'
import { pageTypeUiProperties } from './pageTypeUiProperties'
import { selectComponentUiProperties } from './selectComponentUiProperties'
import { unionTypeUiProperties } from './unionTypeUiProperties'
import { IType, TypeKind } from '@codelab/shared/abstract/core'
import { monacoTypeUiProperties } from './monacoTypeUiProperties'

type UniformsPropertiesContainer = Partial<{
  [TKind in TypeKind]: UiPropertiesFn<IType<TKind>>
}>

// Handles all 'ui' json schema properties that should be added for specific types
// We don't set them in the json schema, because they are needed only when rendering a form with Uniforms
// Register ui properties for new types here
const uiPropertiesContainer: UniformsPropertiesContainer = {
  [TypeKind.MonacoType]: monacoTypeUiProperties,
  [TypeKind.UnionType]: unionTypeUiProperties,

  [TypeKind.ReactNodeType]: selectComponentUiProperties,
  [TypeKind.RenderPropsType]: selectComponentUiProperties,
  [TypeKind.ElementType]: elementTypeUiProperties,

  [TypeKind.LambdaType]: lambdaTypeUiProperties,
  [TypeKind.AppType]: appTypeUiProperties,
  [TypeKind.PageType]: pageTypeUiProperties,
}

export const getUiProperties = (type: IAnyType) => {
  const fn: UiPropertiesFn | undefined = uiPropertiesContainer[
    type.typeKind
  ] as any

  if (!fn) {
    return {}
  }

  return fn(type)
}
