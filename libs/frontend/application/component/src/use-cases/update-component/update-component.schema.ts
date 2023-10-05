import type { IUpdateComponentData } from '@codelab/frontend/abstract/domain'
import { getSelectElementComponent } from '@codelab/frontend/application/type'
import {
  CodeMirrorField,
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import {
  CodeMirrorLanguage,
  ElementTypeKind,
} from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const updateComponentSchema: JSONSchemaType<IUpdateComponentData> = {
  properties: {
    ...idSchema(),
    childrenContainerElement: {
      label: '',
      properties: {
        ...idSchema(),
        id: {
          label: 'Container for component children',
          type: 'string',
          uniforms: {
            component: getSelectElementComponent(ElementTypeKind.AllElements),
          },
        },
      },
      required: ['id'],
      type: 'object',
    },
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
    keyGenerator: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: CodeMirrorField({
          language: CodeMirrorLanguage.Typescript,
        }),
      },
    },
  },
  required: ['name', 'childrenContainerElement'],
  title: 'Update Component Input',
  type: 'object',
}
