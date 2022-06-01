import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { HttpMethod, ICreateActionDTO } from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { keys } from 'lodash'

export const monacoTypescriptOptions = {
  editorOptions: { language: MonacoLanguage.graphqlDev },
  containerProps: { style: { height: '100px' } },
}

export const monacoGraphQLOptions = {
  editorOptions: { language: MonacoLanguage.graphqlDev },
  containerProps: { style: { height: '100px' } },
}

export const monacoJSONOptions = {
  editorOptions: { language: MonacoLanguage.json },
  containerProps: { style: { height: '100px' } },
}

export const createActionSchema: JSONSchemaType<ICreateActionDTO> = {
  title: 'Create Action',
  type: 'object',
  properties: {
    storeId: {
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
    resourceId: {
      type: 'string',
      nullable: true,
      label: 'Resource',
    },
    config: {
      type: 'object',
      label: '',
      nullable: true,
      properties: {
        /**
         *
         * Graphql Operation fields
         *
         */
        query: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoGraphQLOptions) },
        },
        variables: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
        /**
         *
         * Rest Operation fields
         *
         */
        body: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
        method: {
          type: 'string',
          enum: keys(HttpMethod) as Array<HttpMethod>,
          showSearch: true,
        },
        queryParams: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
      },
      required: [],
    },
    body: {
      type: 'string',
      nullable: true,
      uniforms: { component: monacoFieldFactory(monacoTypescriptOptions) },
    },
  },
  required: ['name', 'storeId'],
} as const
