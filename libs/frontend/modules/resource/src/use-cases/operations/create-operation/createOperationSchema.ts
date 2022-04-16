import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { HttpMethod, ICreateOperationDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { keys } from 'lodash'

const monacoGraphQLOptions = {
  editorOptions: { language: MonacoLanguage.graphqlDev },
  containerProps: { style: { height: '240px' } },
}

const monacoJSONOptions = {
  editorOptions: { language: MonacoLanguage.json },
  containerProps: { style: { height: '240px' } },
}

export const createOperationSchema: JSONSchemaType<ICreateOperationDTO> = {
  title: 'Create Operation',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    config: {
      type: 'object',
      properties: {
        /**
         *
         * Graphql Operation fields
         *
         */
        query: {
          type: 'string',
          uniforms: { component: monacoFieldFactory(monacoGraphQLOptions) },
        },

        variables: {
          type: 'string',
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },

        /**
         *
         * Rest Operation fields
         *
         */

        body: {
          type: 'string',
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
        method: {
          type: 'string',
          enum: keys(HttpMethod) as Array<HttpMethod>,
          showSearch: true,
        },

        queryParams: {
          type: 'string',
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
      },
      required: [],
    },
  },
  required: ['name', 'config'],
} as const
