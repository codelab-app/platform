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
    type: 'object',
    properties: {
      ...idSchema,
      app: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
        ...showFieldOnDev(),
        disabled: true,
        required: ['id'],
      },
      name: { type: 'string', disabled: kind !== IPageKind.Regular },
      getServerSideProps: {
        type: 'string',
        nullable: true,
        uniforms: {
          component: CodeMirrorField({
            language: CodeMirrorLanguage.Typescript,
          }),
        },
      },
      pageContentContainer: {
        type: 'object',
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
      },
    },
    required: ['name', 'app'],
  } as const)
