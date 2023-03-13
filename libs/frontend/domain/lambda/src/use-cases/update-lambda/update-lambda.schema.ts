import { nonEmptyString } from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export interface UpdateLambdaData {
  body: string
  id: string
  name: string
}

export const updateLambdaSchema: JSONSchemaType<UpdateLambdaData> = {
  properties: {
    body: {
      type: 'string',
      uniforms: {
        component: () => null,
        // component: monacoFieldFactory({
        //   editorOptions: {
        //     language: 'javascript',
        //   },
        //   containerProps: {
        //     style: {
        //       height: '240px',
        //     },
        //   },
        // }),
      },
    },
    id: {
      autoFocus: true,
      disabled: true,
      type: 'string',
    },
    name: {
      ...nonEmptyString,
    },
  },
  required: ['id', 'name', 'body'],
  title: 'Update Lambda Input',
  type: 'object',
}
