import type { IRuntimeContext } from '@codelab/frontend-abstract-application'
import type {
  ITypeModel,
  ITypeTransformContext,
} from '@codelab/frontend-abstract-domain'

import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import { ITypeKind } from '@codelab/shared-abstract-core'

import { actionTypeUniformSchema } from './action-type-uniform.schema'
import { appTypeUniformSchema } from './app-type-uniform.schema'
import { arrayTypeUniformSchema } from './array-type-uniform.schema'
import { codeMirrorTypeUniformSchema } from './code-mirror-type-uniform.schema'
import { elementTypeUniformSchema } from './element-type-uniform.schema'
import { enumTypeUniformSchema } from './enum-type-ui-uniform.schema'
import { lambdaTypeUniformSchema } from './lambda-type-uniform.schema'
import { pageTypeUniformSchema } from './page-type-uniform.schema'
import { primitiveTypeUniformSchema } from './primitive-uniform.schema'
import { richTextTypeUniformSchema } from './rich-text-type-uniform.schema'
import { componentUniformSchema } from './select-component-uniform.schema'
import { unionTypeUniformSchema } from './union-type-uniform.schema'

export type InterfaceFormContext = ITypeTransformContext & {
  autocomplete?: IRuntimeContext
}

// Handles all 'ui' json schema properties that should be added for specific types
// We don't set them in the json schema, because they are needed only when rendering a form with Uniforms
// Register ui properties for new types here
export const uniformSchemaFactory = (
  type: ITypeModel,
  runtimeContext?: IRuntimeContext,
) => {
  const autocomplete = createAutoCompleteOptions(runtimeContext)

  switch (type.kind) {
    case ITypeKind.ActionType:
      return actionTypeUniformSchema(type, autocomplete)
    case ITypeKind.AppType:
      return appTypeUniformSchema(type, autocomplete)
    case ITypeKind.ArrayType:
      return arrayTypeUniformSchema(type, autocomplete)
    case ITypeKind.CodeMirrorType:
      return codeMirrorTypeUniformSchema(type, autocomplete)
    case ITypeKind.ElementType:
      return elementTypeUniformSchema(type, autocomplete)
    case ITypeKind.EnumType:
      return enumTypeUniformSchema(type, autocomplete)
    case ITypeKind.LambdaType:
      return lambdaTypeUniformSchema(type, autocomplete)
    case ITypeKind.PageType:
      return pageTypeUniformSchema(type, autocomplete)
    case ITypeKind.PrimitiveType:
      return primitiveTypeUniformSchema(type, autocomplete)
    case ITypeKind.ReactNodeType:
      return componentUniformSchema(type, autocomplete)
    case ITypeKind.RenderPropType:
      return componentUniformSchema(type, autocomplete)
    case ITypeKind.RichTextType:
      return richTextTypeUniformSchema(type, autocomplete)
    case ITypeKind.UnionType:
      return unionTypeUniformSchema(type, autocomplete)
    default:
      throw Error(`Unknown type kind ${type.kind}`)
  }
}
