import type { IUpdatePageData } from '@codelab/frontend/abstract/core'
import { getSelectElementComponent } from '@codelab/frontend/domain/type'
import { idSchema } from '@codelab/frontend/shared/domain'
import { showFieldOnDev } from '@codelab/frontend/shared/utils'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import {
  CodeMirrorLanguage,
  ElementTypeKind,
} from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

// pageContainerElementId is not required in interface, but is required for _app page
export const schema = (kind: IPageKind): JSONSchemaType<IUpdatePageData> =>
  ({
    properties: {
      ...idSchema,
      app: {
        properties: {
          id: {
            type: 'string',
          },
        },
        type: 'object',
        ...showFieldOnDev(),
        disabled: true,
        required: ['id'],
      },
      getServerSideProps: {
        nullable: true,
        type: 'string',
        uniforms: {
          component: CodeMirrorField({
            language: CodeMirrorLanguage.Typescript,
          }),
        },
      },
      name: { disabled: kind !== IPageKind.Regular, type: 'string' },
      pageContentContainer: {
        nullable: true,
        properties: {
          id: {
            type: 'string',
            uniforms: {
              component: getSelectElementComponent(ElementTypeKind.AllElements),
            },
          },
        },
        required: ['id'],
        type: 'object',
      },
    },
    required: ['name', 'app'],
    type: 'object',
  } as const)
