import type { JSONSchemaType } from 'ajv'

export interface CreateLambdaData {
  name: string
  body: string
}

export const createLambdaSchema: JSONSchemaType<CreateLambdaData> = {
  title: 'Create Lambda Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
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
  },
  required: ['name', 'body'],
}
