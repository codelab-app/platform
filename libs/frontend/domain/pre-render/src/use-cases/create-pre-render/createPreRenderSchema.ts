import { ICreatePreRenderDTO } from '@codelab/frontend/abstract/core'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IPreRenderType } from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const createPreRenderSchema: JSONSchemaType<ICreatePreRenderDTO> = {
  title: 'Create Pre Render Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    name: {
      type: 'string',
    },
    pageId: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    type: {
      type: 'string',
      enum: Object.values(IPreRenderType),
      showSearch: true,
    },
    code: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: CodeMirrorField({ language: CodeMirrorLanguage.Typescript }),
      },
    },
  },
  required: ['type', 'code', 'pageId'],
}
