import { monacoFieldFactory } from '@codelab/frontend/view/components'
import {
  IElementType,
  IJsonSchemaOptions,
  languageMap,
  TypeKind,
} from '@codelab/shared/abstract/core'
import {
  getSelectElementComponent,
  SelectComponent,
  SelectLambda,
  SelectPage,
} from './fields'

export const uniformsFactory: IJsonSchemaOptions['jsonPropertiesMapper'] = (
  type,
) => {
  switch (type.typeKind) {
    case TypeKind.ReactNodeType:
    case TypeKind.RenderPropsType:
      return {
        uniforms: {
          component: SelectComponent,
        },
      }

    case TypeKind.LambdaType:
      return {
        uniforms: {
          component: SelectLambda,
        },
      }

    case TypeKind.PageType:
      return {
        uniforms: {
          component: SelectPage,
        },
      }

    case TypeKind.AppType:
      return {
        uniforms: {
          component: () => null,
        },
      }

    case TypeKind.MonacoType:
      return {
        uniforms: {
          component: monacoFieldFactory({
            editorOptions: {
              language: languageMap(type.language),
              lineNumbers: 'off',
            },
            containerProps: { style: { height: '15rem' } },
          }),
        },
      }

    case TypeKind.ElementType:
      return {
        uniforms: {
          component: getSelectElementComponent(
            (type as IElementType).elementKind,
          ),
        },
      }
    case TypeKind.ComponentType:
      return {
        type: 'string',
        uniforms: {
          component: SelectComponent,
        },
      }
  }

  return {}
}
