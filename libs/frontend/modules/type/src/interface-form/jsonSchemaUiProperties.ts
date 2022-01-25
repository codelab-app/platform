import { IType, SpecificIType, TypeKind } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from './types'
import { appTypeUiProperties } from './ui-properties/appTypeUiProperties'
import { elementTypeUiProperties } from './ui-properties/elementTypeUiProperties'
import { lambdaTypeUiProperties } from './ui-properties/lambdaTypeUiProperties'
import { pageTypeUiProperties } from './ui-properties/pageTypeUiProperties'
import { selectComponentUiProperties } from './ui-properties/selectComponentUiProperties'
import { unionTypeUiProperties } from './ui-properties/unionTypeUiProperties'

type UniformsPropertiesContainer = Partial<{
  [TKind in TypeKind]: UiPropertiesFn<SpecificIType<TKind>>
}>

// Handles all 'ui' json schema properties that should be added for specific types
// We don't set them in the json schema, because they are needed only when rendering a form with Uniforms
// Register ui properties for new types here
const uiPropertiesContainer: UniformsPropertiesContainer = {
  [TypeKind.UnionType]: unionTypeUiProperties,

  [TypeKind.ReactNodeType]: selectComponentUiProperties,
  [TypeKind.RenderPropsType]: selectComponentUiProperties,
  [TypeKind.ElementType]: elementTypeUiProperties,

  [TypeKind.LambdaType]: lambdaTypeUiProperties,
  [TypeKind.AppType]: appTypeUiProperties,
  [TypeKind.PageType]: pageTypeUiProperties,
}

export const getUiProperties = (type: IType) => {
  const fn: UiPropertiesFn | undefined = uiPropertiesContainer[
    type.typeKind
  ] as any

  if (!fn) {
    return {}
  }

  return fn(type)
}
