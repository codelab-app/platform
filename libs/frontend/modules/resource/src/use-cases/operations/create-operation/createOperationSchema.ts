import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { HttpMethod, ICreateOperationDTO } from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { keys } from 'lodash'

export const monacoGraphQLOptions = {
  editorOptions: { language: MonacoLanguage.graphqlDev },
  containerProps: { style: { height: '240px' } },
}

export const monacoJSONOptions = {
  editorOptions: { language: MonacoLanguage.json },
  containerProps: { style: { height: '240px' } },
}

export const createOperationSchema: JSONSchemaType<ICreateOperationDTO> = {
  title: 'Create Operation',
  type: 'object',
  properties: {
    resource: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    runOnInit: {
      type: 'boolean',
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
