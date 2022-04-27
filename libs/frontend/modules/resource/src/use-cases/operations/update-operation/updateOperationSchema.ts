import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { HttpMethod, IUpdateOperationDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { keys } from 'lodash'
import { monacoGraphQLOptions, monacoJSONOptions } from '../create-operation'

export const updateOperationSchema: JSONSchemaType<IUpdateOperationDTO> = {
  title: 'Update Operation Input',
  type: 'object',
  properties: {
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
